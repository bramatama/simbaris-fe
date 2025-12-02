import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import {
    Routes,
    Route,
    useLocation,
    useNavigate,
    Navigate,
} from 'react-router-dom';

import authService from './services/auth_service';

import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';

import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import SampleWithDashboard from './pages/SampleWithDashboard';
import Sample from './pages/Sample';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import DetailPendaftaran from './pages/AdminTim/DetailPendaftaran';
import ComponentsCheck from './pages/ComponentsCheck';

import DashboardRoute from './routes/DashboardRoute';
import TimTerdaftarRoute from './routes/TimTerdaftarRoute';
import DetailTimRoute from './routes/DetailTimRoute';
import MemberListRoute from './routes/MemberListRoute';

function App() {
    const location = useLocation();
    const navigate = useNavigate(); // Butuh ini untuk redirect manual

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // 1. State currentUser defaultnya null (belum login)
    const [currentUser, setCurrentUser] = useState(null);

    // 2. State loading untuk menunggu proses pengecekan token selesai
    const [isLoading, setIsLoading] = useState(true);

    // Helper untuk mengembalikan fungsi 'initials' karena JSON.parse menghilangkan function
    const hydrateUser = (userData) => {
        return {
            ...userData,
            get initials() {
                // Pastikan parent ada untuk menghindari error split of undefined
                return this.parent
                    ? this.parent.split(' ')[0][0].toUpperCase()
                    : 'U';
            },
        };
    };

    // 3. EFFECT: Cek Token & User saat aplikasi dimuat
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('access_token');
            const savedUser = localStorage.getItem('user');

            if (token && savedUser) {
                try {
                    // Parse data user dari string JSON localstorage
                    const parsedUser = JSON.parse(savedUser);
                    if (!parsedUser) throw new Error('User data invalid');

                    // Kembalikan getter/function yang hilang saat stringify
                    const userWithMethods = hydrateUser(parsedUser);

                    setCurrentUser(userWithMethods);

                    // LOGIC REDIRECT:
                    // Jika user akses halaman Login/Landing padahal sudah punya token,
                    // lempar ke dashboard.
                    if (
                        location.pathname === '/login' ||
                        location.pathname === '/'
                    ) {
                        navigate('/dashboard', { replace: true });
                    }
                } catch (error) {
                    console.error(
                        '❌ Gagal restore session (JSON Error):',
                        error
                    );
                    console.log('Raw savedUser:', savedUser); // Bersihkan storage jika data korup
                }
            } else {
                // Jika tidak ada token, dan mencoba akses halaman yang butuh login
                // (Kamu bisa tambahkan logika protected route yang lebih ketat di sini)
                console.log(
                    '4. Token atau User tidak ditemukan di LocalStorage'
                );
            }

            setIsLoading(false); // Selesai loading
        };

        checkAuth();
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const getInitials = (name) => {
        return name.split(' ')[0][0].toUpperCase();
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
        '/tim-saya/detail',
        '/tim-saya/anggota',
        '/detail-pendaftaran',
        '/tim-terdaftar',
        '/tim-terdaftar/:uuid',
        '/componentscheck',
    ];

    const isNotFoundPage = !availableRoutes.some(
        (route) =>
            route === location.pathname ||
            location.pathname.startsWith('/dashboard/')
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

    // --- HELPER UNTUK PROTECTED ROUTE ---
    const Protected = ({ children }) => {
        // Logika: Loading sudah selesai (false), tapi currentUser masih null? Berarti tidak login.
        if (!currentUser) {
            return <Navigate to="/login" replace />;
        }
        return children;
    };

    return (
        <div className="App">
            {currentUser && showSidebar && (
                <Sidebar
                    toggleSidebar={toggleSidebar}
                    isOpen={isSidebarOpen}
                    user={currentUser}
                    activePath={location.pathname}
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
                <Route path="/pendaftaran" element={<RegistrationPage />} />
                <Route
                    path="/dashboard/*"
                    element={
                        currentUser ? (
                            // Kirim role ke DashboardRoute
                            <DashboardRoute
                                isSidebarOpen={isSidebarOpen}
                                userRole={currentUser?.role}
                            />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/tim-saya/detail"
                    element={
                        currentUser ? (
                            <DetailTimRoute userRole={currentUser?.role} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                <Route
                    path="/tim-saya/anggota"
                    element={
                        currentUser ? (
                            <MemberListRoute
                                userRole={currentUser?.role}
                                isSidebarOpen={isSidebarOpen}
                            />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                <Route
                    path="/detail-pendaftaran"
                    element={
                        currentUser ? (
                            <DetailPendaftaran isSidebarOpen={isSidebarOpen} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                <Route
                    path="/tim-terdaftar"
                    element={
                        currentUser ? (
                            <TimTerdaftarRoute
                                isSidebarOpen={isSidebarOpen}
                                userRole={currentUser?.role}
                            />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/sample-dashboard"
                    element={
                        <SampleWithDashboard isSidebarOpen={isSidebarOpen} />
                    }
                />
                <Route path="/sample" element={<Sample />} />
                <Route path="/componentscheck" element={<ComponentsCheck />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default App;
