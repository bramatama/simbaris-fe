import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const LandingPage = () => {
    return (
        <div className="relative bg-gray-50">
            <div className="relative min-h-screen flex items-center justify-start text-simbaris-text overflow-hidden">
                <img
                    src="/images/gedungitk.png"
                    alt="Gedung Institut Teknologi Kalimantan"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-white opacity-50"></div>
                <div className="absolute inset-0 bg-black opacity-5"></div>

                <div className="flex z-10 w-full mx-auto px-8 md:px-24 lg:px-48">
                    <div className="max-w-5xl">
                        <img
                            src="/images/logo_simbaris_default.png"
                            alt="Logo SIMBARIS"
                            className="w-64 md:w-[450px] h-auto mb-6 sm:mb-8"
                        />
                        <h2 className="text-xl md:text-2xl font-semibold text-simbaris-text mb-1 drop-shadow-md">
                            LKBB SPECTA
                        </h2>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-wide mb-2 text-simbaris-text drop-shadow-2xl">
                            LOMBA KETERAMPILAN
                            <br className="inline" />
                            BARIS-BERBARIS
                        </h1>
                        <p className="text-lg md:text-xl font-medium text-simbaris-text mb-3 drop-shadow-md">
                            Institut Teknologi Kalimantan
                        </p>
                        <p className="text-sm sm:text-base md:text-lg text-simbaris-text mt-2 drop-shadow-md">
                            Tingkat SD/MI - SMP/MTs - SMA/SMK/MA
                            <br />
                            <span className="font-bold">Kalimantan Open</span>
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <Link to={'/pendaftaran'}>
                                <Button
                                    text="Daftar Sekarang!"
                                    size="long"
                                    round="half"
                                    color="primary"
                                ></Button>
                            </Link>
                            <Link to={'/login'}>
                                <Button
                                    text="Login"
                                    size="long"
                                    round="half"
                                    color="accent"
                                ></Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
