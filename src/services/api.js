import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    if (config.authType === 'registration') {
        const token = localStorage.getItem('registration_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } else {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Cek jika error 401 dan belum pernah diretry
        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/auth/login')
        ) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');

                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                // Gunakan axios instance murni (bukan 'api') untuk refresh token
                // agar tidak terkena interceptor ini lagi (menghindari infinite loop)
                const response = await axios.post(
                    `${API_BASE_URL}/auth/refresh`,
                    {
                        refresh_token: refreshToken,
                    }
                );

                const {
                    access_token,
                    refresh_token: newRefreshToken,
                    expires_in,
                } = response.data;

                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', newRefreshToken);
                localStorage.setItem('expires_in', expires_in);

                originalRequest.headers.Authorization = `Bearer ${access_token}`;
                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('user');
                localStorage.removeItem('expires_in');
                window.dispatchEvent(new Event('session-expired'));
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
