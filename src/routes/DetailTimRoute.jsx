import DetailTimMember from '../pages/Member/DetailTimMember';
import TimSayaDetail from '../pages/AdminTim/TimSayaDetail';
import NotFoundPage from '../pages/NotFoundPage';

const DetailTimRoute = ({ userRole, isSidebarOpen }) => {
    const components = {
        team_admin: <TimSayaDetail isSidebarOpen={isSidebarOpen} />,
        member: <DetailTimMember isSidebarOpen={isSidebarOpen} />,
    };

    const DetailTimComponent = components[userRole] || <NotFoundPage />;

    return DetailTimComponent;
};

export default DetailTimRoute;
