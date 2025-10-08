import React from 'react';
import Button from '../components/Button';

const LandingPage = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-start text-black overflow-hidden">
            {/* Background Image (tetap di paling bawah) */}
            <img
                src="/images/gedungitk.png"
                alt="Gedung Institut Teknologi Kalimantan"
                className="absolute inset-0 w-full h-full object-cover opacity-100"
            />
            <div className="absolute inset-0 bg-white opacity-50"></div>

            <div className="absolute inset-0 bg-black opacity-5"></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-12 md:pl-16 lg:pl-24">
                <div className="max-w-2xl">
                    {/* Logo SIMBARIS */}
                    <img
                        src="/images/logosimbarisfull.png"
                        alt="Logo SIMBARIS"
                        className="w-64 md:w-72 h-auto mb-6 sm:mb-8"
                    />

                    {/* Teks Deskripsi Acara */}
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

                    {/* Tombol Aksi (dengan perbaikan props) */}
                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <Button
                            text="Daftar Sekarang!"
                            size="long"
                            round="half"
                            color="primary"
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
    );
};

export default LandingPage;
