import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { X } from 'lucide-react';
import CommitteeRegistrationPanel from '../../components/panitia/detail_pendaftaran/CommitteeRegistrationPanel';
import registrationService from '../../services/registration_service';
import CommitteeTeamDataPanel from '../../components/panitia/detail_pendaftaran/CommitteeTeamData';

const DetailPendaftaran = ({ isSidebarOpen = true }) => {
    const { registrationId } = useParams();
    const [registrationData, setRegistrationData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFullImage, setShowFullImage] = useState(false);

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
                    level: data.teams?.schools?.level,
                    member_count: data.total_members,
                    price: data.price,
                    payment_proof: data.payment_proof,
                    submitted_at: new Date(
                        data.submitted_at
                    ).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    }),
                    last_updated: new Date(data.last_update).toLocaleDateString(
                        'id-ID',
                        {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        }
                    ),
                    committee_name: data.verified_by?.committee_name,
                    committee_contact: data.verified_by?.committee_contact,
                    committee_email: data.verified_by?.users?.email,
                    status: statusMapping[data.status] || data.status,
                    verification_message: data.verification_message,
                    verified_at: new Date(data.verified_at).toLocaleDateString(
                        'id-ID',
                        {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        }
                    ),
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
        }
    }, [registrationId]);

    if (!loading && (error || !registrationData)) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p className="text-red-500">
                    {error || 'Data tidak ditemukan'}
                </p>
            </div>
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
                        {loading ? (
                            <>
                                <div className="flex flex-col gap-6 bg-white rounded-lg shadow-md p-6 col-span-1 row-span-1 md:row-span-2 animate-pulse">
                                    {/* Section 1 */}
                                    <div>
                                        <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>
                                        <div className="flex flex-col gap-4 items-center">
                                            <div className="w-80 h-80 rounded-full bg-gray-200 border-4 border-white"></div>
                                            <div className="h-24 w-full bg-gray-200 rounded"></div>
                                        </div>
                                    </div>
                                    {/* Section 2 */}
                                    <div>
                                        <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>
                                        <div className="space-y-3">
                                            <div className="h-4 w-full bg-gray-200 rounded"></div>
                                            <div className="h-4 w-full bg-gray-200 rounded"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Panel Skeleton (Registration Status) */}
                                <div className="bg-white rounded-lg shadow-md p-6 border flex flex-col lg:col-span-1 lg:row-span-2 animate-pulse">
                                    <div className="h-6 w-40 bg-gray-300 rounded mb-6"></div>
                                    <div className="space-y-4">
                                        <div className="h-24 w-full bg-gray-200 rounded"></div>
                                        <div className="h-24 w-full bg-gray-200 rounded"></div>
                                        <div className="h-12 w-full bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-col gap-4 bg-white rounded-lg shadow-md p-6 col-span-1 row-span-1 md:row-span-2">
                                    <CommitteeTeamDataPanel
                                        registrationData={registrationData}
                                    />
                                </div>

                                <div className="bg-white rounded-lg shadow-md p-6 border flex flex-col  lg:col-span-1 lg:row-span-2">
                                    <CommitteeRegistrationPanel
                                        registrationData={registrationData}
                                        onViewImage={() =>
                                            setShowFullImage(true)
                                        }
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPendaftaran;
