const data = {
    member_id: 'm-001',
    member_name: 'Tri Setiawan Budiono',
    member_grade: '7',
    nisn: '1234567890',
    gender: 'Laki-Laki',
    email: 'tri@gmail.com',
    team: {
        team_name: 'Specta Squad',
        school: {
            school_name: 'SMP Negeri 18 Balikpapan',
            school_level: 'SMP/MTs Sederajat',
        },
    },
};

const myPhoto = {
    photo_id: 'p-001',
    team_id: 'team-001',
    member_id: 'm-001',
    photo_url: 'https://picsum.photos/id/1011/400/400',
};

const myData = {
    member_name : data.member_name,
    member_grade : data.member_grade,
    nisn : data.nisn,
    gender : data.gender,
    email : data.email,
    team_name : data.team.team_name,
    school_name : data.team.school.school_name,
    school_level : data.team.school.school_level,
    photo_url : myPhoto.photo_url,
}

export default myData;