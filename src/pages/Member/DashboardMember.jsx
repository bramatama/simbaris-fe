import { useState, useEffect } from 'react';
import MyDataPanel from '../../components/member/MyDataPanel';
import MyTeamPanel from '../../components/member/dashboard_member/MyTeamPanel';
import MyMemberPanel from '../../components/member/MyMemberPanel';
import memberService from '../../services/member_service';
import teamService from '../../services/team_service';

const DashboardMember = ({ isSidebarOpen = true }) => {
    const [myData, setMyData] = useState(null);
    const [teamData, setTeamData] = useState(null);
    const [memberList, setMemberList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [membersResponse, teamData, userData] =
                    await Promise.all([
                        memberService.getAllMyMembers(),
                        teamService.getMyTeam(),
                        memberService.getMyData(),
                    ]);

                // Mengambil properti .data dari response API
                const flattenedTeamData = {
                    team_name: teamData.data?.team_name,
                    school_name: teamData.data?.schools?.school_name,
                    city: teamData.data?.schools?.city,
                };

                const flattenedMyData = {
                    member_name: userData?.data.member_name,
                    nisn: userData.data?.nisn,
                    member_grade: userData.data?.member_grade,
                    file_url: userData.data?.file_url,
                };

                setMyData(flattenedMyData);
                setTeamData(flattenedTeamData);
                setMemberList(membersResponse?.data || []);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
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

                    <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2 border border-gray-200">
                            <h2 className="text-xl font-semibold text-simbaris-text mb-2">
                                Data Saya
                            </h2>
                            {isLoading ? (
                                <div className="animate-pulse flex flex-col items-center md:flex-row gap-6 ">
                                    <div className="shrink-0">
                                        <div className="w-48 h-48 bg-gray-200 rounded-full"></div>
                                    </div>
                                    <div className="flex-1 w-full space-y-4">
                                        {[1, 2, 3].map((i) => (
                                            <div
                                                key={i}
                                                className="flex justify-between items-end border-b border-gray-200 pb-2"
                                            >
                                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                                                <div className="h-4 bg-gray-200 rounded w-48"></div>
                                            </div>
                                        ))}
                                        <div className="flex justify-end mt-2">
                                            <div className="h-10 bg-gray-200 rounded-full w-40"></div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <MyDataPanel myData={myData} />
                            )}
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                            <h2 className="text-xl font-semibold text-simbaris-text mb-2">
                                Data Tim
                            </h2>
                            {isLoading ? (
                                <div className="animate-pulse flex flex-col gap-4">
                                    <div className="space-y-4">
                                        {[1, 2, 3].map((i) => (
                                            <div
                                                key={i}
                                                className="flex justify-between border-b border-gray-200 pb-2"
                                            >
                                                <div className="h-4 bg-gray-200 rounded w-20"></div>
                                                <div className="h-4 bg-gray-200 rounded w-32"></div>
                                            </div>
                                        ))}
                                        <div className="flex justify-end mt-2">
                                            <div className="h-10 bg-gray-200 rounded-full w-40"></div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <MyTeamPanel teamData={teamData} />
                            )}
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2 lg:row-span-2 border border-gray-200">
                            <MyMemberPanel
                                myMemberData={memberList}
                                isLoading={isLoading}
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
                </div>
            </div>
        </div>
    );
};

export default DashboardMember;
