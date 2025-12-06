import api from './api';

export const teamService = {
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

/**
 * Mengambil data detail dari tim yang terafiliasi dengan member yang sedang login.
 * @param {object} params - Parameter tambahan untuk query.
 * @param {boolean} params.include_registration - Apakah akan menyertakan data pendaftaran.
 * @returns {Promise<object>} Data detail tim.
 */
const getMyTeamDetails = async (params = {}) => {
    try {
        const response = await api.get('/teams/me', { params });
        // Backend mengembalikan { success, count, messages, data: {...} }
        // Kita hanya butuh isi dari properti 'data'.
        return response.data.data;
    } catch (error) {
        console.error('Error fetching my team details:', error);
        throw error;
    }
};

/**
 * Mengambil jumlah tim terdaftar berdasarkan jenjang.
 * @returns {Promise<object>} Objek berisi jumlah total, sd, smp, dan sma.
 */
const getLevelCounts = async () => {
    try {
        const response = await api.get('/teams/level_counts');
        console.log(response)
        return response.data.data;
    } catch (error) {
        console.error('Error fetching team level counts:', error);
        throw error;
    }
};

/**
 * Mengambil daftar semua tim dengan filter dan paginasi.
 * @param {object} params - Objek parameter untuk query.
 * @param {number} params.page - Halaman saat ini.
 * @param {number} params.limit - Jumlah item per halaman.
 * @param {string} params.search - Kata kunci pencarian.
 * @param {string} params.fields - Kolom spesifik yang ingin diambil, dipisahkan koma.
 * @param {string} params.level - Filter jenjang.
 * @param {string} params.status - Filter status pendaftaran.
 * @param {string} params.province - Filter provinsi.
 * @param {string} params.city - Filter kota.
 * @param {string} params.district - Filter kecamatan.
 * @param {string} params.sortBy - Kolom untuk sorting.
 * @param {string} params.order - Arah sorting ('asc' atau 'desc').
 * @returns {Promise<object>} Objek berisi `data` (array tim) dan `total` (jumlah total).
 */
const getAllTeams = async (params = {}) => {
    try {
        const response = await api.get('/teams', { params }); // response.data adalah { success, count, messages, data }
        // Ubah format response dari backend agar sesuai dengan yang diharapkan komponen
        return {
            data: response.data.data || [], // Ambil array dari properti 'data'
            total: response.data.count || 0, // Ambil jumlah total dari properti 'count'
        };
    } catch (error) {
        console.error('Error fetching all teams:', error);
        throw error;
    }
};

export const team_service = {
    getMyTeamDetails,
    getLevelCounts,
    getAllTeams,
};
