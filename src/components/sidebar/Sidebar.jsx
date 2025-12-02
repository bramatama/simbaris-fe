import React, { useState,useEffect } from 'react';
import ProfileDropdown from './ProfileDropdown';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import authService from '../../services/auth_service';

// --- Helper Component: Tautan Sidebar Biasa ---
const SidebarLink = ({ icon, label, isActive, isChildren, href = '#' }) => (
    <a
        href={href}
        className={`flex items-center w-full ${isChildren ? 'px-8' : 'px-4'} py-3 text-sm font-semibold transition-colors duration-200
            ${
                isActive
                    ? 'bg-simbaris-primary-lightest text-simbaris-primary border-r-4 border-simbaris-primary'
                    : 'text-gray-600 hover:bg-gray-100'
            }
        `}
    >
        {icon}
        <span className="ml-3">{label}</span>
    </a>
);

// --- Helper Component: Tautan Sidebar dengan Dropdown ---
const SidebarDropdown = ({ label, children, isActive }) => {
    const [isOpen, setIsOpen] = useState(isActive);
    useEffect(() => {
        if (isActive) {
            setIsOpen(true);
        }
    }, [isActive]);

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center w-full px-4 py-3 text-sm font-semibold transition-colors duration-200
                    ${
                        isActive
                            ? 'bg-simbaris-primary-lightest text-simbaris-primary border-r-4 border-simbaris-primary'
                            : 'text-gray-600 hover:bg-gray-100'
                    }
                `}
            >
                <span className="ml-3">{label}</span>
                <div className="ml-auto">
                    {isOpen ? (
                        <ChevronUp size={18} />
                    ) : (
                        <ChevronDown size={18} />
                    )}
                </div>
            </button>
            {isOpen && <div>{children}</div>}
        </div>
    );
};

// --- Komponen Utama Sidebar ---
const Sidebar = ({ user, activePath, isOpen, toggleSidebar }) => {
    // Definisikan struktur navigasi untuk setiap peran
    const navigator = useNavigate();
    const handleLogout = async ()=>{
        try{
            await authService.logout()
            navigator("/")
        }
        catch(err){
            console.log("Logout gagal", err)
        }
    };

    const navConfig = {
        panitia: [
            {
                type: 'link',
                path: '/dashboard',
                label: 'Dashboard',
            },
            {
                type: 'link',
                path: '/tim-terdaftar',
                label: 'Tim Terdaftar',
            },
        ],
        admin_tim: [
            {
                type: 'link',
                path: '/dashboard',
                label: 'Dashboard',
            },
            {
                type: 'link',
                path: '/detail-pendaftaran',
                label: 'Detail Pendaftaran',
            },
            {
                type: 'dropdown',
                label: 'Tim Saya',
                children: [
                    { path: '/tim-saya/detail', label: 'Detail Tim' },
                    { path: '/tim-saya/anggota', label: 'Daftar Anggota Tim' },
                ],
            },
        ],
        member: [
            {
                type: 'link',
                path: '/dashboard',
                label: 'Dashboard',
            },
            {
                type: 'dropdown',
                label: 'Tim Saya',
                children: [
                    { path: '/tim-saya/detail', label: 'Detail Tim' },
                    { path: '/tim-saya/anggota', label: 'Daftar Anggota Tim' },
                ],
            },
            {
                type: 'link',
                path: '/tim-terdaftar',
                label: 'Tim Terdaftar',
            },
        ],
    };

    const userNav = navConfig[user] || [];

    return (
        <div className="flex">
            <div
                className={`fixed flex flex-col h-full bg-white text-simbaris-text w-64 z-20 border-r-2 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="">
                    <ProfileDropdown
                        user={user}
                        onLogout={handleLogout}
                        onPreferences={() => console.log('Preferences')}
                    />
                </div>
                <nav className="flex-1 py-4">
                    {userNav.map((item) => {
                        if (item.type === 'link') {
                            return (
                                <SidebarLink
                                    key={item.path}
                                    href={item.path}
                                    icon={item.icon}
                                    label={item.label}
                                    isActive={activePath === item.path}
                                    isChildren={false}
                                />
                            );
                        }
                        if (item.type === 'dropdown') {
                            const isChildActive = item.children.some(
                                (child) => child.path === activePath
                            );
                            return (
                                <SidebarDropdown
                                    key={item.label}
                                    label={item.label}
                                    isActive={isChildActive}
                                >
                                    {item.children.map((child) => (
                                        <SidebarLink
                                            key={child.path}
                                            href={child.path}
                                            label={child.label}
                                            isActive={activePath === child.path}
                                            isChildren={true}
                                        />
                                    ))}
                                </SidebarDropdown>
                            );
                        }
                        return null;
                    })}
                </nav>
            </div>
            <div
                onClick={toggleSidebar}
                className={`${isOpen ? 'fixed' : 'hidden'} md:hidden ml-64 h-full w-full z-15 text-white`}
            ></div>
        </div>
    );
};

export default Sidebar;
