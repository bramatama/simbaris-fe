import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    if (config.authType === 'registration') {   
        const token = localStorage.getItem('registration_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } else {
        if (!config.headers.Authorization) {
            const token = localStorage.getItem('access_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
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

        // Cek jika error 401
        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest.url.includes('/auth/login')
        ) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
            localStorage.removeItem('expires_in');
            window.dispatchEvent(new Event('session-expired'));
        }
        return Promise.reject(error);
    }
);

export default api;
