import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import ProfileDropdown from './ProfileDropdown';

const menuConfig = {
    panitia: [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/tim-terdaftar', label: 'Tim Terdaftar' },
    ],
    admin: [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/pembayaran', label: 'Detail Pembayaran' },
        {
            label: 'Tim Saya',
            subLinks: [
                { href: '/tim/detail', label: 'Detail Tim' },
                { href: '/tim/anggota', label: 'Daftar Anggota Tim' },
            ]
        },
        { href: '/tim-terdaftar', label: 'Tim Terdaftar' },
    ],
    member: [
        { href: '/dashboard', label: 'Dashboard' },
        {
            label: 'Tim Saya',
            subLinks: [
                { href: '/tim/detail', label: 'Detail Tim' },
                { href: '/tim/anggota', label: 'Daftar Anggota Tim' },
            ]
        },
        { href: '/tim-terdaftar', label: 'Tim Terdaftar' },
    ],
};

const Sidebar = ({ isOpen, onClose, user }) => {
    const location = useLocation();
    const navLinks = menuConfig[user.type] || [];

    const NavLink = ({ href, label, isSubLink = false }) => {
        const isActive = location.pathname === href;
        return (
            <Link
                to={href}
                className={`block py-2 rounded-md transition-colors duration-200 ${isSubLink ? 'pl-10 pr-3' : 'px-4'} ${isActive ? 'bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={onClose}
            >
                {label}
            </Link>
        );
    };

    return (
        <>
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ease-in-out lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>
            <aside
                className={`fixed top-0 left-0 w-72 pt-24 h-full bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* <ProfileDropdown user={user} /> */}
                <nav className="p-4">
                    <ul className="space-y-2">
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                {link.subLinks ? (
                                    <div>
                                        <div className="px-4 py-2 text-gray-800 font-semibold cursor-default">
                                            {link.label}
                                        </div>
                                        <ul className="space-y-1">
                                            {link.subLinks.map((sub, subIndex) => (
                                                <li key={subIndex}>
                                                    <NavLink href={sub.href} label={sub.label} isSubLink={true} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <NavLink href={link.href} label={link.label} />
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;