import { useState, useEffect } from 'react';
import MyDataPanel from '../../components/member/MyDataPanel';
import MyMemberPanel from '../../components/member/MyMemberPanel';
import memberService from '../../services/member_service';

const AnggotaTimMember = ({ isSidebarOpen = true }) => {
    const userRole = 'member';
    const [myData, setMyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyData = async () => {
            setLoading(true);
            try {
                const data = await memberService.getMe();
                setMyData(data);
            } catch (err) {
                setError('Gagal memuat data Anda.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMyData();
    }, []);

    return (
        <div className="flex bg-gray-100 min-h-screen font-inter">
            <div
                className={`w-full min-h-screen overflow-hidden pt-16 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'} transition-all duration-300`}
            >
                <div className="flex flex-col gap-4 p-6">
                    {/* Header */}
                    <header className="text-simbaris-text font-semibold text-3xl">
                        Tim Saya
                    </header>

                    {loading && <p>Memuat data...</p>}
                    {error && <p className="text-red-500">{error}</p>}

                    {!loading && !error && myData && (
                        <div className="flex flex-col gap-4 bg-white rounded-lg shadow-md p-6">
                            <MyDataPanel myData={myData} userRole={userRole} />
                            <MyMemberPanel
                                myMemberData={[]} // Kirim array kosong, komponen akan fetch data sendiri
                                userRole={userRole}
                                teamId={myData.team_id} // Kirim team_id agar MyMemberPanel bisa fetch data
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnggotaTimMember;
