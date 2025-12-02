import DetailTimMember from '../pages/Member/DetailTimMember';
import TimSayaDetail from '../pages/TimSayaDetail';
import NotFoundPage from '../pages/NotFoundPage';

const DetailTimRoute = ({ userRole, isSidebarOpen }) => {
    const components = {
        admin_tim: <TimSayaDetail isSidebarOpen={isSidebarOpen} />,
        member: <DetailTimMember isSidebarOpen={isSidebarOpen} />,
    };

    const DetailTimComponent = components[userRole] || <NotFoundPage />;

    return DetailTimComponent;
};

export default DetailTimRoute;
