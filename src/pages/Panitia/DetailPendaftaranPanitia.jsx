import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { X } from 'lucide-react';
import CommitteeRegistrationPanel from '../../components/panitia/detail_pendaftaran/CommitteeRegistrationPanel';
import CommitteeTeamDataPanel from '../../components/panitia/detail_pendaftaran/CommitteeTeamData';
import registrationService from '../../services/registration_service';
import ErrorPanel from '../../components/ui/ErrorPanel';

const DetailPendaftaranPanitia = ({ isSidebarOpen = true }) => {
    const { registrationId } = useParams();
    const [registrationData, setRegistrationData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFullImage, setShowFullImage] = useState(false);

    const formatDate = (date) =>
        date
            ? new Date(date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
              })
            : '-';
    useEffect(() => {
        const fetchRegistrationDetail = async () => {
            try {
                setLoading(true);
                const response =
                    await registrationService.getRegistrationById(
                        registrationId
                    );
                const statusMapping = {
                    pending: 'Menunggu Verifikasi',
                    verified: 'Terverifikasi',
                    rejected: 'Ditolak',
                    draft : 'Dalam Proses Pendaftaran'
                };
                const data = response.data;
                const flattenedData = {
                    registration_id: data.registration_id,
                    logoUrl: data.teams?.team_logo_url,
                    team_name: data.teams?.team_name,
                    school_name: data.teams?.schools?.school_name,
                    city: data.teams?.schools?.city,
                    coach_name: data.teams?.coach_name,
                    supervisor_name: data.teams?.supervisor_name,
                    contact: data.teams?.contact,
                    email: data.teams?.users?.email,
                    school_level: data.teams?.schools?.school_level,
                    member_count: data.total_members,
                    price: data.price,
                    payment_proof: data.payment_proof,
                    submitted_at: formatDate(data.submitted_at),
                    last_updated: formatDate(data.last_updated),
                    committee_name: data.verified_by?.committee_name,
                    committee_contact: data.verified_by?.committee_contact,
                    committee_email: data.verified_by?.users?.email,
                    status: statusMapping[data.status] || data.status,
                    verification_message: data.verification_message,
                    verified_at: formatDate(data.verified_at),
                };
                setRegistrationData(flattenedData);
            } catch (err) {
                console.error('Failed to fetch registration detail:', err);
                setError('Gagal memuat detail pendaftaran.');
            } finally {
                setLoading(false);
            }
        };

        if (registrationId) {
            fetchRegistrationDetail();
        } else {
            setLoading(false);
        }
    }, [registrationId]);

    if (!loading && (error || !registrationData)) {
        return (
            <ErrorPanel message={error} />
        );
    }

    return (
        <div className="flex bg-gray-100">
            {showFullImage && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 transition-opacity animate-in fade-in duration-200"
                    onClick={() => setShowFullImage(false)}
                >
                    <button
                        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2 bg-black/20 rounded-full"
                        onClick={() => setShowFullImage(false)}
                    >
                        <X size={32} />
                    </button>
                    <img
                        src={registrationData.payment_proof}
                        alt="Bukti Pembayaran Full"
                        className="max-w-full max-h-full object-contain rounded-md shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
            <div
                className={`w-full min-h-screen overflow-hidden pt-16 ${
                    isSidebarOpen ? 'md:ml-64' : 'ml-0'
                } transition-all duration-300`}
            >
                <div className="flex flex-col gap-4 p-6 min-h-[calc(100vh-4rem)]">
                    <header className="text-simbaris-text font-semibold text-3xl">
                        Detail Pendaftaran
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 flex-1">
                        <div className="flex flex-col gap-4 bg-white rounded-lg shadow-md p-6 col-span-1 row-span-1 md:row-span-2">
                            <CommitteeTeamDataPanel
                                registrationData={registrationData}
                                isLoading={loading}
                            />
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 border flex flex-col  lg:col-span-1 lg:row-span-2">
                            <CommitteeRegistrationPanel
                                registrationData={registrationData}
                                onViewImage={() => setShowFullImage(true)}
                                isLoading={loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPendaftaranPanitia;
