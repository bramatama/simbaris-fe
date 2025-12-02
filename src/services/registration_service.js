import api from './api';

const registrationService = {
    // 1. Get Statistics
    // Endpoint: GET /api/registration/statistics
    getStats: async () => {
        try {
            const response = await api.get('/registration/statistics');
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // 2. Get Fastest Registrants
    // Endpoint: GET /api/registration/fastest-registrants
    getFastestRegistrants: async () => {
        try {
            const response = await api.get('/registration/fastest-registrants');
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // 3. Get Registration Detail by ID
    // Endpoint: GET /api/registration/{uuid}
    getRegistrationById: async (registrationId) => {
        try {
            const response = await api.get(`/registration/${registrationId}`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // 4. Update Registration Status (Verify/Reject)
    // Endpoint: PATCH /api/registration/{uuid}
    // Body: { "status": "verified" | "rejected" | "pending" }
    updateStatus: async (registrationId, status) => {
        try {
            const response = await api.patch(
                `/registration/${registrationId}`,
                {
                    status: status, // Sesuai schema ChangeStatus di backend
                }
            );
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // 5. Delete Registration
    // Endpoint: DELETE /api/registration/{uuid}
    deleteRegistration: async (registrationId) => {
        try {
            const response = await api.delete(
                `/registration/${registrationId}`
            );
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },
};

export default registrationService;
