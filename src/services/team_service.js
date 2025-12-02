import api from './api';

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
        // Backend mengembalikan { success, count, messages, data: {...} }
        // Kita hanya butuh isi dari properti 'data'.
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

const teamService = {
    getMyTeamDetails,
    getLevelCounts,
    getAllTeams,
};

export default teamService;