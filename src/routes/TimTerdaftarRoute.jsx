import React from 'react';
// import TimTerdaftarPanitia from '../pages/TimTerdaftarPanitia';
import TimTerdaftarMember from '../pages/Member/TimTerdaftarMember';
import NotFoundPage from '../pages/NotFoundPage';

const TimTerdaftarRoute = ({ userRole, isSidebarOpen }) => {
    const components = {
        // panitia: <TimTerdaftarPanitia isSidebarOpen={isSidebarOpen} />,
        member: <TimTerdaftarMember isSidebarOpen={isSidebarOpen} />,
    };

    // Pilih komponen berdasarkan userRole, atau tampilkan halaman NotFound jika tidak ada
    const TimTerdaftarComponent= components[userRole] || (
    <NotFoundPage />
    );

    return TimTerdaftarComponent;
};

export default TimTerdaftarRoute;