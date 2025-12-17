import api from './api';

// 1. Create Team
// Endpoint: POST /api/teams/
const createTeam = async (payload) => {
    try {
        const response = await api.post('/teams/', payload, {
            authType: 'registration',
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 2. Upload Team Logo
// Endpoint: POST /api/teams/logo
const uploadTeamLogo = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await api.post('/teams/logo', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            authType: 'registration',
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 3. List Teams
// Endpoint: GET /api/teams/
const getTeams = async () => {
    try {
        const response = await api.get('/teams/');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 4. Get My Team
// Endpoint: GET /api/teams/my_team
const getMyTeam = async () => {
    try {
        const response = await api.get('/teams/my_team');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 5. Edit My Team
// Endpoint: PATCH /api/teams/myteam
const editMyTeam = async (payload) => {
    try {
        const response = await api.patch('/teams/myteam', payload);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// 6. Get Team Code
// Endpoint: GET /api/teams/team-code
const getTeamCode = async () => {
    try {
        const response = await api.get('/teams/team-code', {
            authType: 'registration',
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

const teamService = {
    createTeam,
    uploadTeamLogo,
    getTeams,
    getMyTeam,
    editMyTeam,
    getTeamCode,
};

export default teamService;
