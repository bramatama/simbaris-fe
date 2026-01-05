import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import memberService from '../../services/member_service';
import MyDataPanel from '../../components/member/MyDataPanel';
import MyMemberPanel from '../../components/member/MyMemberPanel';

const AnggotaTimMember = ({ isSidebarOpen = true }) => {
    const userRole = 'member';
    const [myData, setMyData] = useState(null);
    const [memberList, setMemberList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [userData, membersResponse] = await Promise.all([
                    memberService.getMyData(),
                    memberService.getAllMyMembers(),
                ]);
                setMyData(userData.data);
                setMemberList(membersResponse.data);
            } catch (error) {
                console.error('Error fetching member data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
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

                    {/* Data Saya card (full width, like DashboardMember's style) */}
                    <div className="flex flex-col gap-4 bg-white rounded-lg shadow-md p-6">
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
                            <MyDataPanel myData={myData} userRole={userRole} />
                        )}
                        <MyMemberPanel
                            myMemberData={memberList}
                            userRole={userRole}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnggotaTimMember;
