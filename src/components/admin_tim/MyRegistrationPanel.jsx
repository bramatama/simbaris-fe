import { Link, useLocation } from 'react-router-dom';
import { ExternalLink, Eye, Phone, Upload } from 'lucide-react';
import { useState } from 'react';
import Button from '../ui/Button';
import UploadModal from '../registration/UploadModal';
import RedirectModal from '../ui/RedirectModal';
import SuccessModal from '../ui/SuccessModal';
import registrationService from '../../services/registration_service';

const MyRegistrationPanel = ({ teamData, onViewImage, isLoading = false }) => {
    const location = useLocation();
    const isDetailPage = location.pathname === '/detail-pendaftaran';
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isRedirectModalOpen, setIsRedirectModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const valid_phone_number =
        teamData?.committee_contact?.[0] === '0'
            ? '62' + teamData?.committee_contact.slice(1)
            : teamData?.committee_contact;

    const handleUpload = async (file) => {
        try {
            await registrationService.updatePaymentProof(file);
            setIsUploadModalOpen(false);
            setIsSuccessModalOpen(true);
        } catch (error) {
            console.error('Failed to update payment proof:', error);
            alert('Gagal mengupload bukti pembayaran. Silakan coba lagi.');
        }
    };

    const handleSuccessClose = () => {
        setIsSuccessModalOpen(false);
        window.location.reload();
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
                <div className="flex flex-col gap-4 animate-pulse">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col w-full gap-4">
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
                    </div>
                </div>
            ) : (
                <div
                    className={`flex flex-col items-center md:flex-row ${!isDetailPage ? 'gap-4' : 'gap-2'}`}
                >
                    {/* Info Tim */}
                    <div
                        className={`flex flex-col w-full ${!isDetailPage ? 'gap-4' : 'gap-2'}`}
                    >
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <span className="text-sm text-gray-600">
                                Jenjang
                            </span>
                            <span className="text-sm font-medium text-gray-900 text-right px-2 py-1">
                                {teamData.school_level}
                            </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <span className="text-sm text-gray-600">
                                Jumlah Anggota
                            </span>
                            <span className="text-sm font-medium text-gray-900 text-right px-2 py-1">
                                {teamData.member_count}
                            </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <span className="text-sm text-gray-600">Harga</span>
                            <span className="text-sm font-medium text-gray-900 text-right px-2 py-1">
                                {teamData.price}
                            </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <span className="text-sm text-gray-600">
                                Bukti Pembayaran
                            </span>
                            <button
                                onClick={onViewImage}
                                className="flex items-center gap-2 text-simbaris-accent font-medium bg-simbaris-accent-lightest px-2 py-1 rounded-md text-sm border border-simbaris-accent-light"
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
                                {teamData.submitted_at}
                            </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <span className="text-sm text-gray-600">
                                Terakhir di-Update
                            </span>
                            <span className="text-sm font-medium text-gray-900 text-right px-2 py-1">
                                {teamData.last_updated}
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
                        className={`flex items-center gap-4 font-medium px-2 py-1 rounded-md text-md border ${getStatusBadgeClass(teamData.status)}`}
                    >
                        {teamData.status}
                    </div>
                )}
            </div>
            {isLoading ? (
                <div className="flex flex-col gap-4 animate-pulse">
                    <div className="flex flex-col w-full gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="flex justify-between items-center border-b border-gray-200 pb-2"
                            >
                                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <div
                        className={`flex flex-col w-full ${!isDetailPage ? 'gap-4' : 'gap-2'}`}
                    >
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <span className="text-sm text-gray-600">
                                Verifikatur
                            </span>
                            <span className="text-sm font-medium text-gray-900 text-right px-2 py-2">
                                {teamData.committee_name || '-'}
                            </span>
                        </div>
                        {isDetailPage && (
                            <>
                                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                    <span className="text-sm text-gray-600">
                                        Waktu Verifikasi
                                    </span>
                                    <span className="text-sm font-medium text-gray-900 text-right px-2 py-2">
                                        {teamData.verified_at || '-'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                    <span className="text-sm text-gray-600">
                                        Kontak Verifikatur
                                    </span>
                                    <span className="text-sm font-medium text-gray-900 text-right px-2 py-2">
                                        {teamData.committee_contact || '-'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                    <span className="text-sm text-gray-600">
                                        Catatan Verifikatur
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm border border-gray-400 rounded-lg min-h-24 p-2">
                                    {teamData.verification_message ||
                                        'Tidak ada catatan'}
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
            <div className="flex w-full justify-end items-center">
                {!isDetailPage ? (
                    <Link to="/tim-saya/detail">
                        <Button
                            text="Lihat Selengkapnya"
                            size="long"
                            type="primary"
                            color="secondary"
                            leftIcon={<ExternalLink size={18} />}
                            disabled={isLoading}
                        ></Button>
                    </Link>
                ) : (
                    <div className="flex gap-2">
                        <Button
                            text="Hubungi Panitia"
                            size="long"
                            type="primary"
                            color="accent"
                            disabled={isLoading || !teamData.committee_contact}
                            onClick={() => setIsRedirectModalOpen(true)}
                            leftIcon={<Phone size={18} />}
                        ></Button>
                        <Button
                            text="Upload Ulang Bukti Pembayaran"
                            size="long"
                            type="primary"
                            color="secondary"
                            leftIcon={<Upload size={18} />}
                            disabled={
                                isLoading || teamData.status === 'verified'
                            }
                            className="w-fit"
                            onClick={() => setIsUploadModalOpen(true)}
                        ></Button>
                    </div>
                )}
            </div>
            <UploadModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onProcess={handleUpload}
                title={"Upload Ulang Bukti Pembayaran"}
            />
            <RedirectModal
                isOpen={isRedirectModalOpen}
                onClose={() => setIsRedirectModalOpen(false)}
                url={`https://wa.me/${valid_phone_number}`}
                title="Hubungi Panitia"
                message={`Apakah Anda ingin menghubungi panitia ${teamData?.committee_name} melalui WhatsApp?`}
            />
            <SuccessModal
                isOpen={isSuccessModalOpen}
                onClose={handleSuccessClose}
                type="reupload_payment"
            />
        </div>
    );
};

export default MyRegistrationPanel;
