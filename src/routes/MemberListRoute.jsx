import AnggotaTimMember from '../pages/member/AnggotaTimMember';
import NotFoundPage from '../pages/others/NotFoundPage';
import AnggotaTimAdminTim from '../pages/admin_tim/TimSayaAnggota';

const MemberListRoute = ({ userRole, isSidebarOpen }) => {
    const components = {
        team_admin: <AnggotaTimAdminTim isSidebarOpen={isSidebarOpen} />,
        member: <AnggotaTimMember isSidebarOpen={isSidebarOpen} />,
    };

    const MemberListComponent = components[userRole] || <NotFoundPage />;

    return MemberListComponent;
};

export default MemberListRoute;
