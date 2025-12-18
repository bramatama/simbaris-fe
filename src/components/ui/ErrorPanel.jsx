import React from 'react';
import { RefreshCw, LogOut, Mail, TriangleAlert } from 'lucide-react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const ErrorPanel = ({ message, onRetry, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        } else {
            // Default logout behavior
            localStorage.clear();
            navigate('/login');
        }
    };

    const handleContact = () => {
        // Ganti email sesuai kebutuhan
        window.open('mailto:11221046@student.itk.ac.id?subject=Laporan Error Aplikasi', '_blank');
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px] bg-white rounded-lg shadow-sm border border-red-100 p-8 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-56 h-56 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <TriangleAlert size={80} color='red'/>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
                Terjadi Kesalahan
            </h3>

            <p className="text-gray-500 mb-8 max-w-md leading-relaxed">
                {message ||
                    'Maaf, kami mengalami kendala saat memuat data. Silakan coba muat ulang halaman atau hubungi pengembang jika masalah berlanjut.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full  justify-center">
                <Button
                    text="Muat Ulang"
                    onClick={onRetry || (() => window.location.reload())}
                    leftIcon={<RefreshCw size={18} />}
                    type="primary"
                    color="accent"
                    size="long"
                />
                <Button
                    text="Logout"
                    onClick={handleLogout}
                    leftIcon={<LogOut size={18} />}
                    type="primary"
                    color="hazard"
                    size="long"
                />
                <Button
                    text="Lapor Developer"
                    onClick={handleContact}
                    leftIcon={<Mail size={18} />}
                    type="primary"
                    color="secondary"
                    size="long"
                />
            </div>
        </div>
    );
};

export default ErrorPanel;
