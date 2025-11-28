const data = {
    team_name: 'Specta Squad',
    coach: 'Mariposa',
    supervisor: 'Roman Reigns',
    contact: '+62 812 3456 7890',
    email: 'pelatih/pembina@gmail.com',
    logoUrl: '/images/logo_transparant.png', // Ganti dengan URL logo asli jika ada
    school: {
        school_name: 'SMP Negeri 18 Balikpapan',
        level: 'SMP/MTs Sederajat',
        province: 'Kalimantan Timur',
        city: 'Balikpapan',
        district: 'Balikpapan Selatan',
    },
};

const teamData = {
    ...data,
    ...data.school,
};

export default teamData;