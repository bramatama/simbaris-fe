import AnggotaTimMember from '../pages/Member/AnggotaTimMember';
import TimSayaAnggota from '../pages/AdminTim/TimSayaAnggota';
import NotFoundPage from '../pages/NotFoundPage';

const MemberListRoute = ({ userRole, isSidebarOpen }) => {
    const components = {
        team_admin: <TimSayaAnggota isSidebarOpen={isSidebarOpen} />,
        member: <AnggotaTimMember isSidebarOpen={isSidebarOpen} />,
    };

    const MemberListComponent = components[userRole] || <NotFoundPage />;

    return MemberListComponent;
};

export default MemberListRoute;
