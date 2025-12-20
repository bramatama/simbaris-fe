import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';import authService from '../../services/auth_service';
export default function ConfirmEmail() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();        if (!email) return;

        setIsLoading(true);
        setStatus({ type: '', message: '' });

        try {
            // Mengarahkan ke halaman RestorePassword setelah user klik link di email
            // Backend diharapkan menambahkan token ke URL ini (misal: ?token=...)
            const redirectUrl = `${window.location.origin}/restore-password`;
            
            await authService.forgetPassword(email, redirectUrl);
            
            setStatus({
                type: 'success',
                message: 'Link reset password telah dikirim ke email Anda. Silakan cek inbox atau folder spam.'
            });
        } catch (err) {
            setStatus({
                type: 'error',
                message: err.response?.data?.message || 'Gagal mengirim email. Pastikan email terdaftar.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: "url('/images/gedungitk.png')",
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
            }}
        >
            <div className="absolute inset-0 bg-white/50"></div>
            <div className="absolute inset-0 bg-black/5"></div>

            <div className="relative z-10 flex items-center justify-center p-4">
                <div className="bg-white shadow-lg rounded-xl flex flex-col items-center justify-center py-11 px-14 md:w-[500px]">
                    <img
                        src="/images/logo_simbaris_lined.png"
                        alt="Logo SIMBARIS"
                        className="mb-6"
                    />
                    
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Lupa Password?</h2>
                    <p className="text-gray-600 text-center mb-6 text-sm">
                        Masukkan email yang terdaftar untuk menerima link reset password.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-simbaris-primary"
                                required
                            />
                        </div>

                        {status.message && (
                            <div className={`flex items-center gap-3 p-3 rounded-lg text-sm ${
                                status.type === 'success' 
                                    ? 'bg-green-50 text-green-700 border border-green-200' 
                                    : 'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                                {status.type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
                                <p>{status.message}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-simbaris-primary text-white font-medium py-2 rounded-md hover:bg-simbaris-primary-dark transition-colors disabled:opacity-70"
                        >
                            {isLoading ? 'Mengirim...' : 'Kirim Link Reset'}
                        </button>

                        <Link 
                            to="/login" 
                            className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900 mt-2"
                       >
                           <ArrowLeft size={16} />
                           Kembali ke Login
                       </Link>
                   </form>
               </div>
           </div>
       </div>
    );
}
