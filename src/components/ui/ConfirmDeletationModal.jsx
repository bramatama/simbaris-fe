import { useState, useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import Button from './Button';

const ConfirmDeletationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Konfirmasi Hapus',
    message,
    isLoading = false,
    loadingText = 'Menghapus...',
}) => {
    if (!isOpen) return null;

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let interval;
        if (isLoading) {
            setProgress(0);
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 90) return 90;
                    return prev + 15;
                });
            }, 300);
        } else {
            setProgress(0);
        }
        return () => clearInterval(interval);
    }, [isLoading]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="p-3 bg-red-100 rounded-full">
                        <AlertTriangle className="text-red-600" size={32} />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                            {title}
                        </h3>
                        <p className="text-gray-600">
                            {message ||
                                'Apakah Anda yakin ingin menghapus item ini? Tindakan ini tidak dapat dibatalkan.'}
                        </p>
                    </div>

                    {isLoading && (
                        <div className="w-full px-4 mt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                <div 
                                    className="bg-red-500 h-2 rounded-full transition-all duration-300 ease-out" 
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    <div className="flex w-full gap-3 mt-4">
                        <div className="w-1/2">
                            <Button
                                text="Batal"
                                size="long"
                                type="secondary"
                                color="secondary"
                                onClick={onClose}
                                disabled={isLoading}
                                className="w-full"
                            />
                        </div>
                        <div className="w-1/2">
                            <Button
                                text={isLoading ? loadingText : 'Hapus'}
                                size="long"
                                type="primary"
                                color="hazard"
                                onClick={onConfirm}
                                disabled={isLoading}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeletationModal;
