import api from './api';

// 1. Get Statistics
// Endpoint: GET /api/registration/statistics
const getStats = async () => {
    try {
        const response = await api.get('/registration/statistics');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 2. Get Fastest Registrants
// Endpoint: GET /api/registration/fastest-registrants
const getFastestRegistrants = async () => {
    try {
        const response = await api.get('/registration/fastest-registrants');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 3. Get All Registrations
// Endpoint: GET /api/registration/
const getAllRegistrations = async () => {
    try {
        const response = await api.get('/registration/');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 4. Get My Registration
// Endpoint: GET /api/registration/my_registration
const getMyRegistration = async () => {
    try {
        const response = await api.get('/registration/my_registration');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 5. Cancel Registration
// Endpoint: DELETE /api/registration/cancel
const cancelRegistration = async () => {
    try {
        const response = await api.delete('/registration/cancel',{
            authType: 'registration'
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 6. Upload Payment Proof
// Endpoint: POST /api/registration/payment_proof
const uploadPaymentProof = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await api.post(
            '/registration/payment_proof',
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
                authType: 'registration',
            }
        );
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    } finally {
        localStorage.removeItem('registration_token');
    }
};

// 7. Update Payment Proof
// Endpoint: PATCH /api/registration/payment_proof
const updatePaymentProof = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await api.patch('/registration/payment_proof', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 8. Upload Raw Photo
// Endpoint: POST /api/registration/photos/raw
const uploadRawPhoto = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await api.post('/registration/photos/raw', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            authType: 'registration'
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 9. Get Photo Results
// Endpoint: GET /api/registration/photos/results
const getPhotoResults = async () => {
    try {
        const response = await api.get('/registration/photos/results', {
            authType: 'registration'
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 10. Audit Photos
// Endpoint: POST /api/registration/photos/audit
const auditPhotos = async (payload) => {
    try {
        const response = await api.post('/registration/photos/audit', payload, {
            authType: 'registration'
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 11. Get Registration Detail by ID
// Endpoint: GET /api/registration/{uuid}
const getRegistrationById = async (registrationId) => {
    try {
        const response = await api.get(`/registration/${registrationId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 12. Update Registration Status (Verify/Reject)
// Endpoint: PATCH /api/registration/{uuid}
// Body: { "status": "verified" | "rejected" | "pending" }
const updateStatus = async (registrationId, status) => {
    try {
        const response = await api.patch(`/registration/${registrationId}`, {
            status: status, // Sesuai schema ChangeStatus di backend
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 13. Delete Registration
// Endpoint: DELETE /api/registration/{uuid}
const deleteRegistration = async (registrationId) => {
    try {
        const response = await api.delete(`/registration/${registrationId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

const registrationService = {
    getStats,
    getFastestRegistrants,
    getAllRegistrations,
    getMyRegistration,
    cancelRegistration,
    uploadPaymentProof,
    updatePaymentProof,
    uploadRawPhoto,
    getPhotoResults,
    auditPhotos,
    getRegistrationById,
    updateStatus,
    deleteRegistration,
};

export default registrationService;
