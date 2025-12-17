import api from './api';

// 1. Get Level Counts
// Endpoint: GET /api/schools/level_counts
const getLevelCounts = async () => {
    try {
        const response = await api.get('/schools/level_counts');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 2. Get Schools
// Endpoint: GET /api/schools/
const getSchools = async () => {
    try {
        const response = await api.get('/schools/', {
            authType: 'registration',
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 3. Create School
// Endpoint: POST /api/schools/
const createSchool = async (schoolData) => {
    try {
        const response = await api.post('/schools/', schoolData, {
            authType: 'registration',
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 4. Get School Detail
// Endpoint: GET /api/schools/{school_id}
const getSchoolDetail = async (schoolId) => {
    try {
        const response = await api.get(`/schools/${schoolId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

const schoolService = {
    getLevelCounts,
    getSchools,
    createSchool,
    getSchoolDetail,
};

export default schoolService;
