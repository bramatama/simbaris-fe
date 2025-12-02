// src/services/authService.js
import api from './api';

const authService = {
    // 1. Login
    // Endpoint: /api/auth/login
    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });

            // Asumsi backend mengembalikan { access_token, refresh_token, user: {...} }
            if (response.data.access_token) {
                localStorage.setItem(
                    'access_token',
                    response.data.access_token
                );
                localStorage.setItem(
                    'refresh_token',
                    response.data.refresh_token
                );
                // Simpan data user jika ada, opsional
                localStorage.setItem(
                    'user',
                    JSON.stringify(response.data.user)
                );
            }
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // 2. Register Team Leader
    // Endpoint: /api/auth/register/team-leader
    registerTeamLeader: async (userData) => {
        // userData harus sesuai schema UserCreate (email, password, dll)
        try {
            const response = await api.post(
                '/auth/register/team-leader',
                userData
            );
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // 3. Logout
    // Endpoint: /api/auth/logout
    logout: async () => {
        try {
            // Backend butuh token (diurus interceptor)
            // Kalau butuh body token string manual, sesuaikan di sini
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout error', error);
        } finally {
            // Selalu hapus data di local storage di sisi client
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
        }
    },

    // 4. Update Password
    // Endpoint: /api/auth/update-password
    updatePassword: async (newPassword) => {
        try {
            const response = await api.post('/auth/update-password', {
                new_password: newPassword,
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // Helper untuk cek apakah user sedang login
    isAuthenticated: () => {
        return !!localStorage.getItem('access_token');
    },
};

export default authService;