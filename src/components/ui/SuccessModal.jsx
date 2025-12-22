import { CheckCircle } from 'lucide-react';
import Button from './Button';

const SuccessModal = ({ isOpen, onClose = null, type, message, title }) => {
    if (!isOpen) return null;

    // Konfigurasi konten default berdasarkan tipe aksi
    const contentConfig = {
        delete: {
            title: 'Berhasil Hapus',
            message: 'Data telah berhasil dihapus dari sistem.',
        },
        add: {
            title: 'Berhasil Menambahkan',
            message: 'Data baru telah berhasil ditambahkan.',
        },
        update: {
            title: 'Berhasil Memperbarui',
            message: 'Data telah berhasil diperbarui.',
        },
        reupload_payment: {
            title: 'Berhasil Upload Ulang',
            message: 'Bukti pembayaran telah berhasil diunggah ulang.',
        },
        default: {
            title: 'Berhasil',
            message: 'Operasi berhasil dilakukan.',
        },
    };

    const config = contentConfig[type] || contentConfig.default;
    const displayTitle = title || config.title;
    const displayMessage = message || config.message;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col items-center text-center animate-in fade-in zoom-in duration-200">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {displayTitle}
                </h3>

                <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                    {displayMessage}
                </p>

                <div className="w-full">
                    <Button
                        text="Tutup"
                        size="long"
                        type="primary"
                        color="accent"
                        onClick={onClose}
                    />
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
