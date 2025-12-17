import api from './api';

// 1. Get Gender Counts
// Endpoint: GET /api/members/gender_counts
const getGenderCounts = async () => {
    try {
        const response = await api.get('/members/gender_counts');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 2. Get My Data
// Endpoint: GET /api/members/my_data
const getMyData = async () => {
    try {
        const response = await api.get('/members/my_data');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 3. Get All My Members (Team Members)
// Endpoint: GET /api/members/
const getAllMyMembers = async () => {
    try {
        const response = await api.get('/members/');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 4. Signup Bulk Members
// Endpoint: POST /api/members/
// Auth: Registration Token
const signupBulkMembers = async (membersData) => {
    try {
        const response = await api.post('/members/', membersData, {
            authType: 'registration'
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 5. Replace Members
// Endpoint: PUT /api/members/
const replaceMembers = async (membersData) => {
    try {
        const response = await api.put('/members/', membersData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 6. Get Member Detail
// Endpoint: GET /api/members/{member_id}
const getMemberDetail = async (memberId) => {
    try {
        const response = await api.get(`/members/${memberId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 7. Edit Member
// Endpoint: PATCH /api/members/{member_id}
const editMember = async (memberId, payload) => {
    try {
        const response = await api.patch(`/members/${memberId}`, payload);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

const memberService = {
    getGenderCounts,
    getMyData,
    getAllMyMembers,
    signupBulkMembers,
    replaceMembers,
    getMemberDetail,
    editMember,
};

export default memberService;
