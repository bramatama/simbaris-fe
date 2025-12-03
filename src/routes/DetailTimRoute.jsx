import DetailTimMember from '../pages/Member/DetailTimMember';
import NotFoundPage from '../pages/NotFoundPage';
import DetailTimAdminTim from '../pages/AdminTim/TimSayaDetail';

const DetailTimRoute = ({ userRole, isSidebarOpen }) => {
    const components = {
        team_admin: <DetailTimAdminTim isSidebarOpen={isSidebarOpen} />,
        member: <DetailTimMember isSidebarOpen={isSidebarOpen} />,
    };

    const DetailTimComponent = components[userRole] || <NotFoundPage />;

    return DetailTimComponent;
};

export default DetailTimRoute;
