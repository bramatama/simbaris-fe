// src/services/auth_service.js
import api from './api';

// 1. Login
// Endpoint: POST /api/auth/login
// Body: userLogin (Object containing { email, password })
const login = async (userLogin) => {
    try {
        const response = await api.post('/auth/login', userLogin);

        if (response.data.access_token) {
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            localStorage.setItem('expires_in', response.data.expires_in);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 2. Register Team Admin
// Endpoint: POST /api/auth/registration
// Body: userCreate (Object containing registration details)
const registerTeamAdmin = async (userCreate) => {
    try {
        const response = await api.post('/auth/registration', userCreate);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 3. Logout
// Endpoint: POST /api/auth/logout
const logout = async () => {
    try {
        await api.post('/auth/logout');
    } catch (error) {
        console.error('Logout error', error);
    } finally {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        localStorage.removeItem('expires_in');
    }
};

// 4. Request Reset Password
// Endpoint: POST /api/auth/reset-password
const requestResetPassword = async () => {
    try {
        const response = await api.post('/auth/reset-password');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 5. Update Password
// Endpoint: POST /api/auth/update-password
// Body: { old_password, new_password }
const updatePassword = async (oldPassword, newPassword) => {
    try {
        const response = await api.post('/auth/update-password', {
            old_password: oldPassword,
            new_password: newPassword,
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 6. Forget Password
// Endpoint: POST /api/auth/forget-password
// Body: { email, redirect_url }
const forgetPassword = async (email, redirectUrl) => {
    try {
        const response = await api.post('/auth/forget-password', {
            email,
            redirect_url: redirectUrl,
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 7. Reset Password Confirm
// Endpoint: POST /api/auth/reset-password-confirm
// Body: { new_password }
const resetPasswordConfirm = async (newPassword, token) => {
    try {
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        const response = await api.post('/auth/reset-password-confirm', {
            new_password: newPassword,
        }, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 8. Get Current User
// Endpoint: GET /api/auth/me
const getCurrentUser = async () => {
    try {
        const response = await api.get('/users/me');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

const isAuthenticated = () => {
    return !!localStorage.getItem('access_token');
};

const authService = {
    login,
    logout,
    registerTeamAdmin,
    requestResetPassword,
    updatePassword,
    forgetPassword,
    resetPasswordConfirm,
    isAuthenticated,
    getCurrentUser,
};

export default authService;