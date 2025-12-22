import DetailTimMember from '../pages/member/DetailTimMember';
import NotFoundPage from '../pages/others/NotFoundPage';
import DetailTimAdminTim from '../pages/admin_tim/DetailTimAdminTim';

const DetailTimRoute = ({ userRole, isSidebarOpen }) => {
    const components = {
        team_admin: <DetailTimAdminTim isSidebarOpen={isSidebarOpen} />,
        member: <DetailTimMember isSidebarOpen={isSidebarOpen} />,
    };

    const DetailTimComponent = components[userRole] || <NotFoundPage />;

    return DetailTimComponent;
};

export default DetailTimRoute;
