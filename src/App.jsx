import React from 'react';
import './App.css';
import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Sidebar from './components/sidebar/Sidebar';
import Header from './components/Header';

import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import SampleWithDashboard from './pages/SampleWithDashboard';
import Sample from './pages/Sample';
import DashboardRoute from './routes/DashboardRoute';
import NotFoundPage from './pages/NotFoundPage';

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

    const excludedRoutes = [
        '/',
        '/login',
        '/pendaftaran',
        '/forgot-password',
        '/reset-password',
        '/sample',
    ];
    const showHeader = !excludedRoutes.includes(location.pathname);
    const showSidebar = !excludedRoutes.includes(location.pathname);

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
                <Route path="/login" element={<Sample />} />
                <Route path="/pendaftaran" element={<RegistrationPage />} />
                <Route
                    path="/dashboard/"
                    element={
                        <DashboardRoute
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
