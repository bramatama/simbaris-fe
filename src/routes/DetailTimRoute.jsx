import DetailTimMember from '../pages/Member/DetailTimMember';
// import DetailTimAdminTim from '../pages/AdminTim/TeamDetailAdminTm';
import NotFoundPage from '../pages/NotFoundPage';

const DetailTimRoute = ({ userRole, isSidebarOpen }) => {
    const components = {
        // admin_tim: <DetailTimAdminTim isSidebarOpen={isSidebarOpen} />,
        member: <DetailTimMember isSidebarOpen={isSidebarOpen} />,
    };

    const DetailTimComponent = components[userRole] || <NotFoundPage />;

    return DetailTimComponent;
};

export default DetailTimRoute;
