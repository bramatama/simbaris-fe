// src/components/LoginCard.jsx
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginCard() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(true);
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
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-simbaris-primary"
                            required
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

                    {/* Error Message */}
                    {error && (
                        <p className="text-sm text-simbaris-hazard text-left">
                            Email atau Password tidak ditemukan
                        </p>
                    )}

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-simbaris-primary text-white font-medium py-2 rounded-md hover:bg-simbaris-primary-dark transition-colors"
                    >
                        Log In
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
