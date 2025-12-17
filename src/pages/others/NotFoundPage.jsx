import React from 'react';
import { Link } from 'react-router-dom'; // Asumsi Anda menggunakan react-router-dom
import { SearchX } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-simbaris-neutral-50 text-center p-6 bg-gray-100">
            <div className="max-w-md">
                <SearchX
                    className="mx-auto h-24 w-24 text-simbaris-primary-light mb-6"
                    strokeWidth={1.5}
                />
                <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-simbaris-primary to-simbaris-secondary">
                    404
                </h1>
                <h2 className="mt-4 text-3xl font-bold text-simbaris-text tracking-tight">
                    Halaman Tidak Ditemukan
                </h2>
                <p className="mt-4 text-base text-simbaris-neutral-500">
                    Maaf, kami tidak dapat menemukan halaman yang Anda cari.
                    Mungkin salah ketik atau halaman tersebut telah dipindahkan.
                </p>
                <Link
                    to="/" // Arahkan ke halaman utama/dashboard Anda
                    className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-simbaris-primary text-white font-semibold rounded-lg shadow-md hover:bg-simbaris-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-simbaris-primary transition-all duration-200"
                >
                    Kembali ke Halaman Utama
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
