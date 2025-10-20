import React from 'react';
import './App.css';
import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Header from './components/Header';

import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import SampleWithDashboard from './pages/SampleWithDashboard';
import Sample from './pages/Sample';

function App() {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const getInitials = (name) => {
        return name.split(' ')[0][0].toUpperCase();
    };

    const user = {
        role: 'admin', // table user -> role
        parent: `User`, // panitia -> name, admin -> team_name, member -> name
        children: 'admin', // panitia -> position, admin -> school_name, member -> team_name
        imageUrl: '', // panitia -> photo_url, admin -> logo_url, member -> photo_url
        get initials() {
            return getInitials(this.parent);
        },
    };

    const excludedRoutes = [
        '/',
        '/login',
        '/register',
        '/forgot-password',
        '/reset-password',
        '/sample',
    ];
    const showHeader = !excludedRoutes.includes(location.pathname);
    const showSidebar = !excludedRoutes.includes(location.pathname);

    return (
        <div className="App">
            {user && showSidebar && (
                <Sidebar
                    toggleSidebar={toggleSidebar}
                    isOpen={isSidebarOpen}
                    user={user}
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
                <Route path="/register" element={<RegistrationPage />} />
                <Route
                    path="/sample-dashboard"
                    element={
                        <SampleWithDashboard isSidebarOpen={isSidebarOpen} />
                    }
                />
                <Route path="/sample" element={<Sample />} />
            </Routes>
        </div>
    );
}

export default App;
