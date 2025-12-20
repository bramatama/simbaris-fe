import React, { useState } from 'react';
import { Lock, Eye, EyeOff, XCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import authService from '../../services/auth_service';

export default function RestorePassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Ambil token dari query param atau hash fragment (Supabase redirect)
    let token = searchParams.get('token');
    if (!token && window.location.hash) {
        const hashParams = new URLSearchParams(
            window.location.hash.substring(1)
        );
        token = hashParams.get('access_token');
    }

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setStatus({
                type: 'error',
                message: 'Konfirmasi password tidak cocok.',
            });
            return;
        }

        if (password.length < 6) {
            setStatus({
                type: 'error',
                message: 'Password minimal 6 karakter.',
            });
            return;
        }

        setIsLoading(true);
        setStatus({ type: '', message: '' });

        try {
            await authService.resetPasswordConfirm(password, token);
            setStatus({
                type: 'success',
                message:
                    'Password berhasil diubah. Mengalihkan ke halaman login...',
            });
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setStatus({
                type: 'error',
                message:
                    err.response?.data?.message ||
                    'Gagal mereset password. Token mungkin sudah kadaluarsa.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-md text-center">
                    <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                        Link Tidak Valid
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Token reset password tidak ditemukan.
                    </p>
                    <button
                        onClick={() => navigate('/login')}
                        className="text-simbaris-primary hover:underline"
                    >
                        Kembali ke Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: "url('/images/gedungitk.png')",
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
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

                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Reset Password
                    </h2>
                    <p className="text-gray-600 text-center mb-6 text-sm">
                        Silakan masukkan password baru Anda.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 w-full"
                    >
                        {/* New Password */}
                        <div className="relative">
                            <Lock
                                className="absolute left-3 top-3 text-gray-500"
                                size={18}
                            />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password Baru"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-simbaris-primary"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <Lock
                                className="absolute left-3 top-3 text-gray-500"
                                size={18}
                            />
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Konfirmasi Password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-simbaris-primary"
                                required
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>

                        {status.message && (
                            <div
                                className={`flex items-center gap-3 p-3 rounded-lg text-sm ${
                                    status.type === 'success'
                                        ? 'bg-green-50 text-green-700 border border-green-200'
                                        : 'bg-red-50 text-red-700 border border-red-200'
                                }`}
                            >
                                {status.type === 'success' ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-700 border-t-transparent"></div>
                                ) : (
                                    <XCircle size={18} />
                                )}
                                <p>{status.message}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-simbaris-primary text-white font-medium py-2 rounded-md hover:bg-simbaris-primary-dark transition-colors disabled:opacity-70"
                        >
                            {isLoading ? 'Menyimpan...' : 'Simpan Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
