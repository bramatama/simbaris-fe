import { useState, useEffect } from 'react';
import teamService from '../../services/team_service';
import TeamDataPanel from '../../components/member/detail_tim_member/TeamDataPanel';
import SchoolDataPanel from '../../components/member/detail_tim_member/SchoolDataPanels';

const DetailTimMember = ({ isSidebarOpen = true }) => {
    const [teamData, setTeamData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await teamService.getMyTeam();
                const flattenedData = {
                    team_name : response.data.team_name,
                    coach_name : response.data.coach_name,
                    supervisor_name : response.data.supervisor_name,
                    team_logo_url : response.data.team_logo_url,
                    contact : response.data.contact,
                    email : response.data.users.email,
                    school_name : response.data.schools.school_name,
                    school_level : response.data.schools.school_level,
                    province : response.data.schools.province,
                    city : response.data.schools.city,
                    subdistrict : response.data.schools.subdistrict,
                }
                setTeamData(flattenedData);
            } catch (error) {
                console.error('Error fetching team data:', error);
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
                <div className="flex flex-col gap-4 p-6 min-h-[calc(100vh-4rem)]">
                    <header className="text-simbaris-text font-semibold text-3xl">
                        Tim Saya
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 gap-4 flex-1">
                        <div className="flex flex-col gap-4 bg-white rounded-lg shadow-md p-6 col-span-1 row-span-1 md:col-span-2 md:row-span-2">
                            <TeamDataPanel
                                teamData={teamData}
                                isLoading={isLoading}
                            />
                            <SchoolDataPanel
                                schoolData={teamData}
                                isLoading={isLoading}
                            />
                        </div>

                        {/* KANAN ATAS — NILAI & CATATAN JURI */}
                        <div className="bg-white rounded-lg shadow-md p-6 border flex flex-col  lg:col-span-1 lg:row-span-1">
                            <h2 className="text-xl font-semibold text-simbaris-text">
                                Nilai dan Catatan Juri
                            </h2>
                            <p className="flex h-full font-extrabold text-4xl text-gray-300 text-center items-center justify-center p-8">
                                COMING SOON
                            </p>
                        </div>

                        {/* KANAN BAWAH — HASIL PERLOMBAAN */}
                        <div className="bg-white rounded-lg shadow-md p-6 border flex flex-col  lg:col-span-1 lg:row-span-1">
                            <h2 className="text-xl font-semibold mb-4 text-gray-900">
                                Hasil Perlombaan
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

export default DetailTimMember;
