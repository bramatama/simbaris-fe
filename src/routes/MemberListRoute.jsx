import AnggotaTimMember from '../pages/Member/AnggotaTimMember';
import TimSayaAnggota from '../pages/TimSayaAnggota'
import NotFoundPage from '../pages/NotFoundPage';

const MemberListRoute = ({ userRole, isSidebarOpen }) => {
    const components = {
        admin_tim: <TimSayaAnggota isSidebarOpen={isSidebarOpen} />,
        member: <AnggotaTimMember isSidebarOpen={isSidebarOpen} />,
    };

    const MemberListComponent = components[userRole] || <NotFoundPage />;

    return MemberListComponent;
};

export default MemberListRoute;
