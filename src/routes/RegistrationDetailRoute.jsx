import DetailPendaftaranPanitia from '../pages/panitia/DetailPendaftaranPanitia.jsx';
import DetailPendaftaranAdminTim from '../pages/admin_tim/DetailPendaftaranAdminTim.jsx';
import NotFoundPage from '../pages/others/NotFoundPage';

const RegistrationDetailRoute = ({ userRole, isSidebarOpen }) => {
    const components = {
        team_admin: <DetailPendaftaranAdminTim isSidebarOpen={isSidebarOpen} />,
        committee: <DetailPendaftaranPanitia isSidebarOpen={isSidebarOpen} />,
    };

    const RegistrationDetailComponent = components[userRole] || <NotFoundPage />;

    return RegistrationDetailComponent;
};

export default RegistrationDetailRoute;
