import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const LandingPage = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // --- SIMULASI DATA PENGGUNA ---
    // Ganti nilai 'type' untuk tes: 'panitia', 'admin', atau 'member'
    const [currentUser] = useState({
        name: 'Tom Green',
        role: 'Panitia',
        type: 'panitia',
        avatarUrl: null, // Ganti dengan path gambar jika ada, atau null untuk inisial
    });

    const handleRegisterClick = () => navigate('/register');
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="relative bg-gray-50">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setSidebarOpen(false)}
                user={currentUser}
            />
            <Navbar
                onMenuClick={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
            />
            <main className={`transition-all duration-300 ${isSidebarOpen ? 'lg:pl-72' : 'lg:pl-0'}`}>
                <div className="relative min-h-screen flex items-center justify-start text-black overflow-hidden">
                    <img
                        src="/images/gedungitk.png"
                        alt="Gedung Institut Teknologi Kalimantan"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-white opacity-50"></div>
                    <div className="absolute inset-0 bg-black opacity-5"></div>

                    <div className="relative z-10 w-full mx-auto px-8 md:px-24 lg:px-48">
                        <div className="max-w-2xl">
                            <img
                                src="/images/logosimbarisfull.png"
                                alt="Logo SIMBARIS"
                                className="w-64 md:w-72 h-auto mb-6 sm:mb-8"
                            />
                            <h2 className="text-xl md:text-2xl font-semibold text-black mb-1 drop-shadow-md">
                                LKBB SPECTA
                            </h2>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-wide mb-2 text-black drop-shadow-lg">
                                LOMBA KETERAMPILAN
                                <br className="inline" />
                                BARIS-BERBARIS
                            </h1>
                            <p className="text-lg md:text-xl font-medium text-black mb-3 drop-shadow-md">
                                Institut Teknologi Kalimantan
                            </p>
                            <p className="text-sm sm:text-base md:text-lg text-black mt-2 drop-shadow-md">
                                Tingkat SD/MI - SMP/Mts - SMA/SMK/MA
                                <br />
                                <span className="font-bold">Kalimantan Open</span>
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row gap-4">
                                <Button
                                    text="Daftar Sekarang!"
                                    size="long"
                                    round="half"
                                    color="primary"
                                    onClick={handleRegisterClick}
                                ></Button>
                                <Button
                                    text="Login"
                                    size="long"
                                    round="half"
                                    color="accent"
                                ></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;