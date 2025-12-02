import React from 'react';
import DashboardPanitia from '../pages/Panitia/DashboardPanitia';
import DashboardAdminTim from '../pages/AdminTim/DashboardAdminTim';
import DashboardMember from '../pages/Member/DashboardMember';
import NotFoundPage from '../pages/NotFoundPage';

const DashboardRoute = ({ userRole, isSidebarOpen }) => {
    // Gunakan object mapping untuk pendekatan yang lebih modern dan skalabel
    const dashboardComponents = {
        committee: <DashboardPanitia isSidebarOpen={isSidebarOpen} />,
        team_admin: <DashboardAdminTim isSidebarOpen={isSidebarOpen} />,
        member: <DashboardMember isSidebarOpen={isSidebarOpen} />,
    };

    // Pilih komponen berdasarkan userRole, atau tampilkan halaman NotFound jika tidak ada
    const DashboardComponent = dashboardComponents[userRole] || (
        <NotFoundPage />
    );

    return DashboardComponent;
};

export default DashboardRoute;
