import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import { Phone, Eye, Trash2Icon } from 'lucide-react';
import UpdateStatus from './UpdateStatus';
import ConfirmDeletationModal from '../../ui/ConfirmDeletationModal';
import SuccessModal from '../../ui/SuccessModal';
import RedirectModal from '../../ui/RedirectModal';
import registrationService from '../../../services/registration_service';

const CommitteeRegistrationPanel = ({
    registrationData,
    onViewImage,
    isLoading = false,
}) => {
    const navigate = useNavigate();
    const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
        useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [successType, setSuccessType] = useState('default');
    const [isRedirectModalOpen, setIsRedirectModalOpen] = useState(false);

    const valid_phone_number =
        registrationData?.contact[0] === '0'
            ? '62' + registrationData?.contact.slice(1)
            : registrationData?.contact;

    const handleUpdateSuccess = () => {
        window.location.reload();
    };

    const handleDeleteRegistration = async () => {
        try {
            await registrationService.deleteRegistration(
                registrationData.registration_id
            );

            setIsDeleteConfirmationOpen(false);
            setSuccessType('delete');
            setIsSuccessOpen(true);
        } catch (error) {
            console.error('Gagal menghapus pendaftaran:', error);
            alert('Terjadi kesalahan saat menghapus pendaftaran.');
        }
    };

    const getStatusBadgeClass = (status) => {
        const s = status?.toLowerCase();
        if (s === 'verified' || s === 'terverifikasi') {
            return 'text-simbaris-success bg-simbaris-success-lightest border-simbaris-success-light';
        }
        if (s === 'rejected' || s === 'ditolak') {
            return 'text-simbaris-accent bg-simbaris-accent-lightest border-simbaris-accent-light';
        }
        if (s === 'pending') {
            return 'text-simbaris-warning bg-simbaris-warning-lightest border-simbaris-warning-light';
        }
        if (s === 'draft') {
            return 'text-simbaris-hazard bg-simbaris-hazard-lightest border-simbaris-hazard-light';
        }
        return 'text-simbaris-secondary bg-simbaris-secondary-lightest border-simbaris-secondary-light';
    };

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-simbaris-text">
                Detail Pendaftaran
            </h2>
            {isLoading ? (
                <div className="flex flex-col w-full gap-4 animate-pulse">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={i}
                            className="flex justify-between items-center border-b border-gray-200 pb-2"
                        >
                            <div className="h-4 w-24 bg-gray-200 rounded"></div>
                            <div className="h-4 w-32 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={`flex flex-col w-full gap-4`}>
                    {/* Info Tim */}
                    <div className={`flex flex-col w-full gap-4`}>
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <span className="text-sm text-gray-600">
                                Jenjang
                            </span>
                            <span className="text-sm font-medium text-gray-900 text-right px-2 py-1">
                                {registrationData.school_level}
                            </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <span className="text-sm text-gray-600">
                                Jumlah Anggota
                            </span>
                            <span className="text-sm font-medium text-gray-900 text-right px-2 py-1">
                                {registrationData.member_count}
                            </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <span className="text-sm text-gray-600">Harga</span>
                            <span className="text-sm font-medium text-gray-900 text-right px-2 py-1">
                                {registrationData.price}
                            </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <span className="text-sm text-gray-600">
                                Bukti Pembayaran
                            </span>
                            <button
                                onClick={onViewImage}
                                disabled={!registrationData.payment_proof}
                                className="flex items-center gap-2 text-simbaris-accent font-medium bg-simbaris-accent-lightest px-2 py-1 rounded-md text-sm border border-simbaris-accent-light disabled:cursor-not-allowed"
                            >
                                <Eye />
                                Lihat Gambar
                            </button>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <span className="text-sm text-gray-600">
                                Waktu Pendaftaran
                            </span>
                            <span className="text-sm font-medium text-gray-900 text-right px-2 py-1">
                                {registrationData.submitted_at}
                            </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <span className="text-sm text-gray-600">
                                Terakhir di-Update
                            </span>
                            <span className="text-sm font-medium text-gray-900 text-right px-2 py-1">
                                {registrationData.last_updated}
                            </span>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-simbaris-text">
                    Detail Verifikasi
                </h2>
                {isLoading ? (
                    <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                    <div
                        className={`flex items-center gap-4 font-medium px-2 py-1 rounded-md text-md border ${getStatusBadgeClass(registrationData.status)}`}
                    >
                        {registrationData.status}
                    </div>
                )}
            </div>
            {isLoading ? (
                <div className="flex flex-col w-full gap-4 animate-pulse">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="flex justify-between items-center border-b border-gray-200 pb-2"
                        >
                            <div className="h-4 w-24 bg-gray-200 rounded"></div>
                            <div className="h-4 w-32 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                    <div className="h-24 bg-gray-200 rounded w-full"></div>
                </div>
            ) : (
                <div className={`flex flex-col w-full gap-4`}>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">
                            Verifikatur
                        </span>
                        <span className="text-sm font-medium text-gray-900 text-right px-2 py-2">
                            {registrationData.committee_name || '-'}
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">
                            Waktu Verifikasi
                        </span>
                        <span className="text-sm font-medium text-gray-900 text-right px-2 py-2">
                            {registrationData.verified_at || '-'}
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">
                            Kontak Verifikatur
                        </span>
                        <span className="text-sm font-medium text-gray-900 text-right px-2 py-2">
                            {registrationData.committee_contact || '-'}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                            Catatan Verifikatur
                        </span>
                    </div>
                    <div className="flex justify-between text-sm border border-gray-400 rounded-lg min-h-24 p-2">
                        {registrationData.verification_message || ''}
                    </div>
                </div>
            )}
            {isLoading ? (
                <div className="flex w-full justify-between items-center gap-2 animate-pulse">
                    <div className="h-11 w-full bg-gray-200 rounded"></div>
                    <div className="h-11 w-full bg-gray-200 rounded"></div>
                    <div className="h-11 w-full bg-gray-200 rounded"></div>
                </div>
            ) : (
                <div className="flex w-full justify-between items-center gap-2">
                    <Button
                        text="Hapus Tim"
                        size="long"
                        type="primary"
                        color="hazard"
                        onClick={() => setIsDeleteConfirmationOpen(true)}
                        leftIcon={<Trash2Icon size={18} />}
                    ></Button>
                    <Button
                        text="Hubungi Tim"
                        size="long"
                        type="primary"
                        color="accent"
                        onClick={() => setIsRedirectModalOpen(true)}
                        leftIcon={<Phone size={18} />}
                    ></Button>
                    <Button
                        text="Perbarui Status"
                        size="long"
                        type="primary"
                        color="secondary"
                        onClick={() => setIsUpdateStatusOpen(true)}
                    ></Button>
                </div>
            )}
            <UpdateStatus
                isOpen={isUpdateStatusOpen}
                onClose={() => setIsUpdateStatusOpen(false)}
                registrationId={registrationData?.registration_id}
                currentStatus={registrationData?.status}
                onSuccess={handleUpdateSuccess}
            />
            <ConfirmDeletationModal
                isOpen={isDeleteConfirmationOpen}
                onClose={() => setIsDeleteConfirmationOpen(false)}
                onConfirm={handleDeleteRegistration}
                title="Konfirmasi Hapus"
                message={`Apakah Anda yakin ingin menghapus ${registrationData?.team_name}? Tindakan ini tidak dapat dibatalkan.`}
            />
            <SuccessModal
                isOpen={isSuccessOpen}
                onClose={() => {
                    setIsSuccessOpen(false);
                    navigate('/tim-terdaftar');
                }}
                type={successType}
            />
            <RedirectModal
                isOpen={isRedirectModalOpen}
                onClose={() => setIsRedirectModalOpen(false)}
                url={`https://wa.me/${valid_phone_number}`}
                title="Hubungi Tim"
                message={`Apakah Anda ingin menghubungi tim ${registrationData?.team_name} melalui WhatsApp?`}
            />
        </div>
    );
};

export default CommitteeRegistrationPanel;
