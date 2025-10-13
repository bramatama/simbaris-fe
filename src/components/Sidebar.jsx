import React, { useState } from 'react';
import ProfileDropdown from './ProfileDropdown';
import { Navigate, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

// --- Helper Component: Tautan Sidebar Biasa ---
const SidebarLink = ({ icon, label, isActive, href = '#' }) => (
    <a
        href={href}
        className={`flex items-center w-full px-4 py-3 text-sm font-semibold transition-colors duration-200
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
            {isOpen && <div className="pl-8">{children}</div>}
        </div>
    );
};

// --- Komponen Utama Sidebar ---
const Sidebar = ({ user, activePath, isOpen, toggleSidebar }) => {
    // Definisikan struktur navigasi untuk setiap peran
    const navigator = useNavigate();
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
        admin: [
            {
                type: 'link',
                path: '/dashboard',
                label: 'Dashboard',
            },
            {
                type: 'link',
                path: '/detail-pembayaran',
                label: 'Detail Pembayaran',
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

    const userNav = navConfig[user.role] || []; // Pilih navigasi berdasarkan peran user

    return (
        <div className="flex">
            <div
                className={`fixed flex flex-col h-full bg-white text-simbaris-text w-64 z-10 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="m-4">
                    <ProfileDropdown
                        user={user}
                        onLogout={() => navigator('/')}
                        onPreferences={() => console.log('Preferences')}
                    />
                </div>
                <div className='border-b-2 border-gray-400 mx-4'></div>
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
                                />
                            );
                        }
                        if (item.type === 'dropdown') {
                            // Cek apakah ada anak dari dropdown yang aktif
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
