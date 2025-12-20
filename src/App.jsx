import './App.css';
import { useState, useEffect, useRef } from 'react';
import {
    Routes,
    Route,
    useLocation,
    useNavigate,
    Navigate,
} from 'react-router-dom';

import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import ExpiredSessionModal from './components/ui/ExpiredSessionModal';

import LandingPage from './pages/landing_page/LandingPage';
import RegistrationPage from './pages/registration/RegistrationPage';
// import SampleWithDashboard from './pages/SampleWithDashboard';
// import Sample from './pages/Sample';
import NotFoundPage from './pages/others/NotFoundPage';
import LoginPage from './pages/Login/LoginPage';
import ConfirmEmail from './pages/forgot_password/ConfirmEmail';
import RestorePassword from './pages/forgot_password/RestorePassword';
import DetailPendaftaran from './pages/panitia/DetailPendaftaran';
import ComponentsCheck from './pages/others/ComponentsCheck';

import DashboardRoute from './routes/DashboardRoute';
import TimTerdaftarRoute from './routes/TimTerdaftarRoute';
import DetailTimRoute from './routes/DetailTimRoute';
import MemberListRoute from './routes/MemberListRoute';
import authService from './services/auth_service';

function App() {
    const location = useLocation();
    const navigate = useNavigate(); // Butuh ini untuk redirect manual

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // 1. Auth User (from Token/LocalStorage) - for Routing
    const [authUser, setAuthUser] = useState(null);

    // 2. Sidebar User (from API) - for Sidebar display
    const [sidebarUser, setSidebarUser] = useState(null);
    const [isSidebarLoading, setIsSidebarLoading] = useState(true);

    // 3. State loading untuk menunggu proses pengecekan token selesai
    const [isLoading, setIsLoading] = useState(true);

    // 4. State untuk modal expired session
    const [isSessionExpired, setIsSessionExpired] = useState(false);

    // Helper untuk mengembalikan fungsi 'initials' karena JSON.parse menghilangkan function
    const hydrateUser = (userData) => {
        const additional = userData.additional || {};
        let displayName = userData.email; // Default fallback
        let avatarUrl = null;

        // Tentukan display name berdasarkan role dan data additional
        if (userData.role === 'committee') {
            if (additional.committee_name)
                displayName = additional.committee_name;
            if (additional.committee_profile_url)
                avatarUrl = additional.committee_profile_url;
        } else if (userData.role === 'team_admin') {
            if (additional.team_name) displayName = additional.team_name;
            if (additional.team_logo_url) avatarUrl = additional.team_logo_url;
        } else if (userData.role === 'member') {
            if (additional.member_name) displayName = additional.member_name;
            if (additional.file_url) avatarUrl = additional.file_url;
        }

        return {
            ...userData,
            name: displayName, // Properti 'name' eksplisit untuk UI
            avatar_url: avatarUrl,
            get initials() {
                const nameStr = this.name || this.email || 'U';
                return nameStr.charAt(0).toUpperCase();
            },
        };
    };

    // 5. EFFECT: Cek Token & User saat aplikasi dimuat
    useEffect(() => {
        const checkAuth = async () => {
            // Helper untuk delay loading agar transisi lebih halus (mencegah glitch)
            const finishLoading = () => {
                setTimeout(() => setIsLoading(false), 500);
            };

            const token = localStorage.getItem('access_token');
            const savedUser = localStorage.getItem('user');

            if (token) {
                let isOptimistic = false;

                // A. Set Auth User for Routing (Immediate from LocalStorage)
                if (savedUser) {
                    try {
                        const parsedUser = JSON.parse(savedUser);
                        setAuthUser(hydrateUser(parsedUser));
                        isOptimistic = true;

                        // OPTIMISASI: Langsung stop loading jika ada cache (UI muncul instan)
                        finishLoading();

                        // Cek redirect segera
                        if (
                            location.pathname === '/login' ||
                            location.pathname === '/' ||
                            location.pathname === '/pendaftaran'
                        ) {
                            navigate('/dashboard', { replace: true });
                        }
                    } catch (e) {
                        console.error('Gagal membaca cache user:', e);
                    }
                }

                // B. Fetch Sidebar User (Fresh from API) - Berjalan di Background
                // Hanya fetch jika data sidebar belum ada, untuk efisiensi
                if (!sidebarUser) {
                    setIsSidebarLoading(true);
                    try {
                        const response = await authService.getCurrentUser();
                        const userData = response.data;

                        setSidebarUser(hydrateUser(userData));

                        // Update cache & authUser dengan data terbaru
                        localStorage.setItem('user', JSON.stringify(userData));
                        setAuthUser(hydrateUser(userData));
                    } catch (error) {
                        console.error('❌ Gagal sinkronisasi user:', error);
                    } finally {
                        setIsSidebarLoading(false);
                    }
                }

                // C. Fallback: Jika tidak ada cache, baru kita handle loading & redirect di sini
                if (!isOptimistic) {
                    if (
                        location.pathname === '/login' ||
                        location.pathname === '/' ||
                        location.pathname === '/pendaftaran'
                    ) {
                        navigate('/dashboard', { replace: true });
                    }
                    finishLoading();
                }
            } else {
                setAuthUser(null);
                setSidebarUser(null);
                finishLoading();
                setIsSidebarLoading(false);
            }
        };
        checkAuth();
    }, [location.pathname, navigate]);

    // 5. EFFECT: Listen event session-expired dari auth_service / api interceptor
    useEffect(() => {
        const handleSessionExpired = () => {
            setIsSessionExpired(true);
        };

        const handleLoginSuccess = () => {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                setAuthUser(hydrateUser(JSON.parse(savedUser)));
            }
        };

        window.addEventListener('session-expired', handleSessionExpired);
        window.addEventListener('login-success', handleLoginSuccess);
        return () => {
            window.removeEventListener('session-expired', handleSessionExpired);
            window.removeEventListener('login-success', handleLoginSuccess);
        };
    }, []);

    const handleExpiredLogout = async () => {
        await authService.logout();
        setIsSessionExpired(false);
        setAuthUser(null);
        setSidebarUser(null);
        navigate('/login', { replace: true });
    };

    const handleUserLogout = async () => {
        await authService.logout();
        setAuthUser(null);
        setSidebarUser(null);
        navigate('/');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const availableRoutes = [
        '/',
        '/login',
        '/pendaftaran',
        '/dashboard',
        '/sample-dashboard',
        '/sample',
        '/reset-password',
        '/forgot-password',
        '/confirm-email',
        '/restore-password',
        '/tim-saya/detail/*',
        '/tim-saya/anggota',
        '/detail-pendaftaran',
        '/tim-terdaftar',
        '/componentscheck',
    ];

    const isNotFoundPage = !availableRoutes.some(
        (route) =>
            route === location.pathname ||
            location.pathname.startsWith('/dashboard/') ||
            location.pathname.startsWith('/tim-terdaftar/')
    );

    const excludedRoutes = [
        '/',
        '/login',
        '/pendaftaran',
        '/forgot-password',
        '/reset-password',
        '/sample',
        '/reset-password',
        '/forgot-password',
        '/confirm-email',
        '/restore-password',
    ];
    const showHeader =
        !excludedRoutes.includes(location.pathname) && !isNotFoundPage;
    const showSidebar =
        !excludedRoutes.includes(location.pathname) && !isNotFoundPage;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="flex flex-col items-center gap-2">
                    {/* Spinner sederhana */}
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                    <p className="text-gray-500 text-sm">Memuat sesi...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="App">
            <ExpiredSessionModal
                isOpen={isSessionExpired}
                onConfirm={handleExpiredLogout}
            />
            {authUser && showSidebar && (
                <Sidebar
                    toggleSidebar={toggleSidebar}
                    isOpen={isSidebarOpen}
                    user={sidebarUser || authUser}
                    activePath={location.pathname}
                    isLoading={isSidebarLoading}
                    onLogout={handleUserLogout}
                />
            )}
            {showHeader && (
                <Header
                    toggleSidebar={toggleSidebar}
                    isSidebarOpen={isSidebarOpen}
                />
            )}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/confirm-email" element={<ConfirmEmail />} />
                <Route path="/restore-password" element={<RestorePassword />} />
                <Route path="/pendaftaran" element={<RegistrationPage />} />
                <Route
                    path="/dashboard/*"
                    element={
                        authUser ? (
                            // Kirim role ke DashboardRoute
                            <DashboardRoute
                                isSidebarOpen={isSidebarOpen}
                                userRole={authUser?.role}
                            />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/tim-saya/detail"
                    element={
                        authUser ? (
                            <DetailTimRoute userRole={authUser?.role} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                <Route
                    path="/tim-saya/anggota"
                    element={
                        authUser ? (
                            <MemberListRoute
                                userRole={authUser?.role}
                                isSidebarOpen={isSidebarOpen}
                            />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                <Route
                    path="/tim-terdaftar/detail/:registrationId"
                    element={
                        authUser ? (
                            <DetailPendaftaran isSidebarOpen={isSidebarOpen} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/tim-terdaftar"
                    element={
                        authUser ? (
                            <TimTerdaftarRoute
                                isSidebarOpen={isSidebarOpen}
                                userRole={authUser?.role}
                            />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                {/* <Route
                    path="/sample-dashboard"
                    element={
                        <SampleWithDashboard isSidebarOpen={isSidebarOpen} />
                    }
                />
                <Route path="/sample" element={<Sample />} /> */}
                <Route path="/componentscheck" element={<ComponentsCheck />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default App;
