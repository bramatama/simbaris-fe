import AnggotaTimMember from '../pages/Member/AnggotaTimMember';
// import AnggotaTimMemberTim from '../pages/AdminTim/AngotaTimAdminTim';
import NotFoundPage from '../pages/NotFoundPage';

const MemberListRoute = ({ userRole, isSidebarOpen }) => {
    const components = {
        // admin_tim: <AnggotaTimAdminTim isSidebarOpen={isSidebarOpen} />,
        member: <AnggotaTimMember isSidebarOpen={isSidebarOpen} />,
    };

    const MemberListComponent = components[userRole] || <NotFoundPage />;

    return MemberListComponent;
};

export default MemberListRoute;
