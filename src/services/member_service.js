import api from './api';


/**
 * Mengambil data detail dari member yang sedang login.
 * @returns {Promise<object>} Data detail member.
 */
const getMe = async () => {
    try {
        const response = await api.get('/members/me');

        // Asumsi struktur data dari API.
        // Anda bisa sesuaikan ini jika struktur dari backend berbeda.
        const data = response.data;

        return {
            team_id: data.team_id, // Tambahkan team_id
            member_name: data.member_name,
            member_grade: data.member_grade,
            nisn: data.nisn,
            gender: data.gender,
            email: data.email,
            team_name: data.team_name,
            school_name: data.school_name,
            level: data.school_level,
            city: data.city,
            photo_url: data.file_url, // Asumsi ada relasi photo
        };
    } catch (error) {
        console.error('Error fetching my member data:', error);
        throw error;
    }
};

/**
 * Mengambil daftar semua anggota dalam satu tim.
 * @param {object} params - Objek parameter untuk query.
 * @param {string} params.team_id - ID tim (wajib).
 * @param {number} params.page - Halaman saat ini.
 * @param {number} params.limit - Jumlah item per halaman.
 * @param {string} params.search - Kata kunci pencarian.
 * @param {string} params.gender - Filter jenis kelamin.
 * @param {string} params.member_grade - Filter kelas.
 * @param {string} params.sortBy - Kolom untuk sorting.
 * @param {string} params.order - Arah sorting ('asc' atau 'desc').
 * @returns {Promise<Array<object>>} Daftar anggota.
 */
const getAllMembers = async (params) => {
    try {
        // Mengirimkan parameter sebagai query string
        const response = await api.get('/members/', { params });
        console.log("hasil: ", response)
        return response.data;
    } catch (error) {
        console.error('Error fetching all members:', error);
        throw error;
    }
};

const memberService = {
    getMe,
    getAllMembers,
};

export default memberService;