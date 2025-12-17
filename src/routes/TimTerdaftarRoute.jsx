import React from 'react';
import TimTerdaftarPanitia from '../pages/Panitia/TimTerdaftarPanitia';
import TimTerdaftarMember from '../pages/member/TimTerdaftarMember';
import NotFoundPage from '../pages/others/NotFoundPage';

const TimTerdaftarRoute = ({ userRole, isSidebarOpen }) => {
    // Gunakan object mapping untuk pendekatan yang lebih modern dan skalabel
    const components = {
        committee: <TimTerdaftarPanitia isSidebarOpen={isSidebarOpen} />,
        member: <TimTerdaftarMember isSidebarOpen={isSidebarOpen} />,
    };

    // Pilih komponen berdasarkan userRole, atau tampilkan halaman NotFound jika tidak ada
    const TimTerdaftarComponent = components[userRole] || <NotFoundPage />;

    return TimTerdaftarComponent;
};

export default TimTerdaftarRoute;
