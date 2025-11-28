import React from 'react';
import './App.css';
import { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';

import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import SampleWithDashboard from './pages/SampleWithDashboard';
import Sample from './pages/Sample';
import DashboardRoute from './routes/DashboardRoute';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import DaftarAnggotaView from './pages/Member/DaftarAnggotaView';
import TimTerdaftarRoute from './routes/TimTerdaftarRoute';
import DetailTimRoute from './routes/DetailTimRoute';

function App() {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [currentUser, setCurrentUser] = useState({
        role: 'panitia', // table user -> role
        parent: `User`, // panitia -> name, admin -> team_name, member -> name
        children: 'admin', // panitia -> position, admin -> school_name, member -> team_name
        imageUrl: '', // panitia -> photo_url, admin -> logo_url, member -> photo_url
        get initials() {
            return getInitials(this.parent);
        },
    });

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
        '/tim-terdaftar',
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
                    element={<Navigate to="/dashboard" replace />}
                />
                <Route
                    path="/dashboard"
                    element={
                        <DashboardRoute
                            isSidebarOpen={isSidebarOpen}
                            userRole={currentUser.role}
                        />
                    }
                />
                <Route
                    path="/tim-saya/detail"
                    element={<DetailTimRoute userRole={currentUser.role} />}
                />
                <Route
                    path="/tim-saya/anggota"
                    element={
                        <DaftarAnggotaView isSidebarOpen={isSidebarOpen} />
                    }
                />
                <Route
                    path="/tim-terdaftar"
                    element={
                        <TimTerdaftarRoute
                            isSidebarOpen={isSidebarOpen}
                            userRole={currentUser.role}
                        />
                    }
                />
                <Route
                    path="/sample-dashboard"
                    element={
                        <SampleWithDashboard isSidebarOpen={isSidebarOpen} />
                    }
                />
                <Route path="/sample" element={<Sample />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default App;
