import { ExternalLink } from 'lucide-react';
import Button from './Button';

const RedirectModal = ({ isOpen, onClose, url, title, message, onConfirm }) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        } else if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col items-center text-center animate-in fade-in zoom-in duration-200">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <ExternalLink className="w-8 h-8 text-blue-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {title || 'Buka Tautan Eksternal'}
                </h3>

                <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                    {message ||
                        'Anda akan diarahkan ke halaman baru. Apakah Anda ingin melanjutkan?'}
                </p>

                <div className="flex w-full gap-3">
                    <Button
                        text="Batal"
                        size="long"
                        type="primary"
                        color="secondary"
                        onClick={onClose}
                    />
                    <Button
                        text="Lanjutkan"
                        size="long"
                        type="primary"
                        color="accent"
                        onClick={handleConfirm}
                    />
                </div>
            </div>
        </div>
    );
};

export default RedirectModal;
