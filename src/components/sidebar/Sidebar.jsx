import React, { useState, useEffect } from 'react';
import ProfileDropdown from './ProfileDropdown';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

// --- Helper Component: Tautan Sidebar Biasa ---
const SidebarLink = ({ icon, label, isActive, isChildren, href = '#' }) => (
    <Link
        to={href}
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
    </Link>
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

// --- Skeleton Loading Sidebar ---
const SidebarSkeleton = () => (
    <div className="flex flex-col h-full w-full animate-pulse">
        <div className="flex items-center p-4 h-16 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="ml-3 flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        <div className="flex-1 py-4 space-y-5 px-4">
            {[1, 2].map((i) => (
                <div key={i} className="h-10 bg-gray-200 rounded"></div>
            ))}
        </div>
    </div>
);

// --- Komponen Utama Sidebar ---
const Sidebar = ({
    user,
    activePath,
    isOpen,
    toggleSidebar,
    isLoading,
    onLogout,
}) => {
    // Definisikan struktur navigasi untuk setiap peran

    const navConfig = {
        committee: [
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
        team_admin: [
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

    const userNav = user ? navConfig[user.role] || [] : [];

    return (
        <div className="flex">
            <div
                className={`fixed flex flex-col h-full bg-white text-simbaris-text w-64 z-20 border-r-2 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {isLoading ? (
                    <SidebarSkeleton />
                ) : (
                    <>
                        <div className="">
                            <ProfileDropdown
                                user={user}
                                onLogout={onLogout}
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
                                                    isActive={
                                                        activePath ===
                                                        child.path
                                                    }
                                                    isChildren={true}
                                                />
                                            ))}
                                        </SidebarDropdown>
                                    );
                                }
                                return null;
                            })}
                        </nav>
                    </>
                )}
            </div>
            <div
                onClick={toggleSidebar}
                className={`${isOpen ? 'fixed' : 'hidden'} md:hidden ml-64 h-full w-full z-15 text-white`}
            ></div>
        </div>
    );
};

export default Sidebar;
