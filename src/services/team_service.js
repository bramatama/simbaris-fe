import api from './api';

const teamService = {
    // 1. List Teams (dengan filter/pagination)
    // Endpoint: GET /api/teams/
    // Params: level, status, page, limit, dll (sesuai TeamListQueryParams)
    getTeams: async (queryParams = {}) => {
        try {
            const response = await api.get('/teams/', {
                params: queryParams, // Axios otomatis ubah object jadi ?key=val
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // 2. Get Level Counts (Statistik jumlah tim per jenjang)
    // Endpoint: GET /api/teams/level_counts
    getLevelCounts: async () => {
        try {
            const response = await api.get('/teams/level_counts');
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // 3. Get My Team (Detail tim user yang sedang login)
    // Endpoint: GET /api/teams/me
    // Query Param: include_registration (bool)
    getMyTeam: async (includeRegistration = false) => {
        try {
            const response = await api.get('/teams/me', {
                params: { include_registration: includeRegistration },
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // 4. Get Team by ID (Admin/Committee view)
    // Endpoint: GET /api/teams/{team_id}
    // Query Param: include_registration (bool)
    getTeamById: async (teamId, includeRegistration = false) => {
        try {
            const response = await api.get(`/teams/${teamId}`, {
                params: { include_registration: includeRegistration },
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // 5. Update Team (Admin update specific team)
    // Endpoint: PUT /api/teams/{team_id}
    updateTeam: async (teamId, teamUpdateData) => {
        try {
            const response = await api.put(`/teams/${teamId}`, teamUpdateData);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // 6. Edit My Team (User update their own team)
    // Endpoint: PATCH /api/teams/myteam
    editMyTeam: async (payload) => {
        try {
            const response = await api.patch('/teams/myteam', payload);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },
};

export default teamService;
