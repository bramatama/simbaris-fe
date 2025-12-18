import { X, AlertTriangle } from 'lucide-react';
import Button from './Button';

const ConfirmDeletationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Konfirmasi Hapus',
    message,
    isLoading = false,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative animate-in fade-in zoom-in duration-200">
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
                                text={isLoading ? 'Menghapus...' : 'Hapus'}
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
