// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onMenuClick, isSidebarOpen }) => {
    return (
        // Ubah z-index menjadi 50 agar berada di lapisan paling atas
        <nav className="absolute top-0 left-0 w-full bg-white bg-opacity-80 shadow-md z-50"> {/* <-- PERUBAHAN DI SINI */}
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <button
                            onClick={onMenuClick}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:bg-gray-200 focus:outline-none"
                            aria-label="Buka menu navigasi"
                        >
                            {isSidebarOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <img
                                src="/images/logosimbarisfull.png"
                                alt="Logo SIMBARIS"
                                className="h-12 w-auto"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;