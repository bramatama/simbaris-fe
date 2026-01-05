import AnggotaTimMember from '../pages/member/AnggotaTimMember.jsx';
import NotFoundPage from '../pages/others/NotFoundPage.jsx';
import AnggotaTimAdminTim from '../pages/admin_tim/AnggotaTimAdminTim.jsx';

const MemberListRoute = ({ userRole, isSidebarOpen }) => {
    const components = {
        team_admin: <AnggotaTimAdminTim isSidebarOpen={isSidebarOpen} />,
        member: <AnggotaTimMember isSidebarOpen={isSidebarOpen} />,
    };

    const MemberListComponent = components[userRole] || <NotFoundPage />;

    return MemberListComponent;
};

export default MemberListRoute;
