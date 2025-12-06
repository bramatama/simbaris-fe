import { useState, useEffect } from 'react';
import MyDataPanel from '../../components/member/MyDataPanel';
import MyTeamPanel from '../../components/member/dashboard_member/MyTeamPanel';
import MyMemberPanel from '../../components/member/MyMemberPanel';
import memberService from '../../services/member_service';

const DashboardMember = ({ isSidebarOpen = true }) => {
    const [myData, setMyData] = useState(null);
    const [teamData, setTeamData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyData = async () => {
            try {
                setLoading(true);
                const myDataResponse = await memberService.getMe();

                setMyData(myDataResponse);

                const teamInfo = {
                    team_name: myDataResponse.team_name,
                    school_name: myDataResponse.school_name,
                    city: myDataResponse.city, 
                };
                setTeamData(teamInfo);
            } catch (err) {
                setError('Gagal memuat data dasbor.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMyData();
    }, []);

    return (
        <div className="flex bg-gray-100">
            <div
                className={`w-full min-h-screen overflow-hidden pt-16 ${
                    isSidebarOpen ? 'md:ml-64' : 'ml-0'
                } transition-all duration-300`}
            >
                <div className="flex flex-col gap-4 p-6">
                    {/* HEADER */}
                    <header className="text-simbaris-text font-semibold text-3xl">
                        Dashboard
                    </header>

                    {loading && <p>Memuat data...</p>}
                    {error && <p className="text-red-500">{error}</p>}

                    {!loading && !error && myData && teamData && (
                        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 gap-4">
                            <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2 border border-gray-200">
                                <MyDataPanel myData={myData} />
                            </div>

                            {/* Komponen lain masih menggunakan dummy data untuk saat ini */}
                            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                                <MyTeamPanel teamData={teamData} />
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2 lg:row-span-2 border border-gray-200">
                                <MyMemberPanel
                                    myMemberData={[]} // Kirim array kosong sebagai nilai awal
                                    teamId={myData.team_id} // Kirim team_id sebagai prop
                                />
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6 border flex flex-col lg:col-span-1 lg:row-span-2">
                                <h2 className="text-xl font-semibold text-simbaris-text">
                                    Nilai dan Catatan Juri
                                </h2>
                                <p className="flex h-full font-extrabold text-4xl text-gray-300 text-center items-center justify-center p-8">
                                    COMING SOON
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardMember;
