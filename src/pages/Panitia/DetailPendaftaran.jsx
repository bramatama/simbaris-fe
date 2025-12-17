import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TeamDataPanel from '../../components/member/detail_tim_member/TeamDataPanel';
import SchoolDataPanel from '../../components/member/detail_tim_member/SchoolDataPanels';
import MyRegistrationPanel from '../../components/admin_tim/MyRegistrationPanel';
import registrationService from '../../services/registration_service';

const DetailPendaftaran = ({ isSidebarOpen = true }) => {
    const { registrationId } = useParams();
    const [teamData, setTeamData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRegistrationDetail = async () => {
            try {
                setLoading(true);
                const response = await registrationService.getRegistrationById(
                    registrationId
                );
                setTeamData(response.data);
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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error || !teamData) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p className="text-red-500">{error || 'Data tidak ditemukan'}</p>
            </div>
        );
    }

    return (
        <div className="flex bg-gray-100">
            <div
                className={`w-full min-h-screen overflow-hidden pt-16 ${
                    isSidebarOpen ? 'md:ml-64' : 'ml-0'
                } transition-all duration-300`}
            >
                <div className="flex flex-col gap-4 p-6 min-h-[calc(100vh-4rem)]">
                    <header className="text-simbaris-text font-semibold text-3xl">
                        Tim Saya
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 flex-1">
                        <div className="flex flex-col gap-4 bg-white rounded-lg shadow-md p-6 col-span-1 row-span-1 md:row-span-2">
                            <TeamDataPanel teamData={teamData} />
                            <SchoolDataPanel schoolData={teamData} />
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 border flex flex-col  lg:col-span-1 lg:row-span-2">
                            <MyRegistrationPanel teamData={teamData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPendaftaran;
