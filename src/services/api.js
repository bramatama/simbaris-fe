// src/services/api.js
import axios from 'axios';

// Sesuaikan port backend FastAPI kamu
const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// --- REQUEST INTERCEPTOR ---
// Sebelum request dikirim, cek apakah ada token di localStorage
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            // Pasang token ke header Authorization: Bearer <token>
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// --- RESPONSE INTERCEPTOR (Opsional tapi Penting) ---
// Menangani jika token expired (401), otomatis coba refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Jika error 401 (Unauthorized) dan belum pernah dicoba refresh
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');
                // Panggil endpoint refresh token di backend kamu
                const response = await axios.post(
                    `${API_BASE_URL}/auth/refresh`,
                    {
                        refresh_token: refreshToken,
                    }
                );

                const { access_token, refresh_token: newRefreshToken } =
                    response.data;

                // Simpan token baru
                localStorage.setItem('access_token', access_token);
                if (newRefreshToken) {
                    localStorage.setItem('refresh_token', newRefreshToken);
                }

                // Ulangi request yang tadi gagal dengan token baru
                api.defaults.headers.common['Authorization'] =
                    `Bearer ${access_token}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Jika refresh juga gagal, logout user
                console.error('Session expired', refreshError);
                localStorage.clear();
                window.location.href = '/login'; // Redirect ke login
            }
        }
        return Promise.reject(error);
    }
);

export default api;
