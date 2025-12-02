// src/components/LoginCard.jsx
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth_service';

export default function LoginCard() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Harap Mengisi Email dan Password');
        }

        setIsLoading(true);
        setError('');

        try {
            const data =  await authService.login(email, password);
            
            localStorage.setItem('authToken', data.access_token);
            console.log(data)
            console.log(data.user.role)
            navigate('/dashboard');
        } catch (err) {
            const errorMessages =
                err.response?.data?.message || 'Email atau password Salah';
            setError(errorMessages);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-transparent">
            {/* Card Section */}
            <div
                className="
          bg-white shadow-lg rounded-2xl
          flex flex-col items-center justify-center w-[500px] h-[450px]
        "
            >
                {/* Logo */}

                <img
                    src="/images/logo_simbaris_lined.png"
                    alt="Logo SIMBARIS"
                />

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 mt-4  justify-center"
                >
                    {/* Email Input */}
                    <div className="relative">
                        <Mail
                            className="absolute left-3 top-3 text-black"
                            size={18}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-simbaris-primary"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <Lock
                            className="absolute left-3 top-3 text-black"
                            size={18}
                        />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-simbaris-primary"
                            required
                            onChange={(e) => setPassword(e.target.value)}
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

                    {/* Error Message */}
                    {error && (
                        <div className="flex w-full items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mt-4">
                            <XCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-simbaris-primary text-white font-medium py-2 rounded-md hover:bg-simbaris-primary-dark transition-colors"
                        disabled={error}
                    >
                        {isLoading ? 'Loading..' : 'Login'}
                    </button>

                    {/* Forgot Password */}
                    <div className="flex justify-start mt-1">
                        <button
                            type="button"
                            className="text-sm text-black hover:underline"
                        >
                            Lupa Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
