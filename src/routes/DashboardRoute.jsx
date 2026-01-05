import React from 'react';
import DashboardPanitia from '../pages/panitia/DashboardPanitia.jsx';
import DashboardAdminTim from '../pages/admin_tim/DashboardAdminTim.jsx';
import DashboardMember from '../pages/member/DashboardMember.jsx';
import NotFoundPage from '../pages/others/NotFoundPage.jsx';

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
