import AnggotaTimMember from '../pages/Member/AnggotaTimMember';
import NotFoundPage from '../pages/NotFoundPage';
import AnggotaTimAdminTim from '../pages/AdminTim/TimSayaAnggota';

const MemberListRoute = ({ userRole, isSidebarOpen }) => {
    const components = {
        team_admin: <AnggotaTimAdminTim isSidebarOpen={isSidebarOpen} />,
        member: <AnggotaTimMember isSidebarOpen={isSidebarOpen} />,
    };

    const MemberListComponent = components[userRole] || <NotFoundPage />;

    return MemberListComponent;
};

export default MemberListRoute;
