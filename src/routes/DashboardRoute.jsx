import React from 'react';
import DashboardPanitia from '../pages/DashboardPanitia';
import DashboardAdminTim from '../pages/DashboardAdminTim';
import DashboardMember from '../pages/Member/DashboardMember';
import NotFoundPage from '../pages/NotFoundPage';

const DashboardRoute = ({ userRole, isSidebarOpen}) => {
    // Gunakan object mapping untuk pendekatan yang lebih modern dan skalabel
    const dashboardComponents = {
        panitia: <DashboardPanitia isSidebarOpen={isSidebarOpen} />,
        admin_tim: <DashboardAdminTim isSidebarOpen={isSidebarOpen} />,
        member: <DashboardMember isSidebarOpen={isSidebarOpen} />,
    };

    // Pilih komponen berdasarkan userRole, atau tampilkan halaman NotFound jika tidak ada
    const DashboardComponent = dashboardComponents[userRole] || (
        <NotFoundPage />
    );

    return DashboardComponent;
};

export default DashboardRoute;
