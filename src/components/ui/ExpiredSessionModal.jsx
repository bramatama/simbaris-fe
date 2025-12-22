import React from 'react';

const ExpiredSessionModal = ({ isOpen, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center animate-in fade-in zoom-in duration-200">
                <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-red-100 rounded-full text-red-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                    Sesi Berakhir
                </h2>
                <p className="text-gray-600 mb-6">
                    Masa berlaku sesi Anda telah habis. Silakan login kembali
                    untuk melanjutkan.
                </p>
                <button
                    onClick={onConfirm}
                    className="w-full bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors duration-200"
                >
                    OK, Login Kembali
                </button>
            </div>
        </div>
    );
};

export default ExpiredSessionModal;
