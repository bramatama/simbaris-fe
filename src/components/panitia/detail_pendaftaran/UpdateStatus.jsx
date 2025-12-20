import { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import Button from '../../ui/Button';
import Dropdown from '../../ui/Dropdown';
import registrationService from '../../../services/registration_service';

const UpdateStatus = ({ isOpen, onClose, registrationId, onSuccess }) => {
    const [status, setStatus] = useState('pending');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleUpdate = async () => {
        setIsLoading(true);
        setError(null);
        try {
            await registrationService.updateStatus(registrationId, {
                status: status,
                verification_message: message,
            });
            if (onSuccess) {
                onSuccess(status);
            }
            onClose();
        } catch (err) {
            console.error(err);
            setError(
                err.message || 'Gagal memperbarui status. Silakan coba lagi.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const statusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'verified', label: 'Verifikasi' },
        { value: 'rejected', label: 'Tolak' },
    ];

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

                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Perbarui Status
                </h3>

                <div className="flex flex-col gap-6">
                    <Dropdown
                        label="Status Pendaftaran"
                        options={statusOptions}
                        value={status}
                        onChange={(val) => setStatus(val)}
                        disabled={isLoading}
                    />

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Catatan
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-simbaris-primary/50 focus:border-simbaris-primary transition-all bg-white min-h-[100px] resize-y"
                            placeholder="Tambahkan catatan atau alasan perubahan status..."
                            disabled={isLoading}
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-start gap-2">
                            <AlertCircle
                                size={18}
                                className="shrink-0 mt-0.5"
                            />
                            {error}
                        </div>
                    )}

                    <div className="flex w-full gap-3">
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
                                text={isLoading ? 'Menyimpan...' : 'Simpan'}
                                size="long"
                                type="primary"
                                color="primary"
                                onClick={handleUpdate}
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

export default UpdateStatus;
