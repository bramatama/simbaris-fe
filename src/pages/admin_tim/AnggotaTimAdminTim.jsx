import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import SimpleCard from '../../components/ui/SimpleCards';
import SimpleCardSkeleton from '../../components/skeleton/CardSkeleton';
import { Users, User } from 'lucide-react';
import MyMemberPanel from '../../components/member/MyMemberPanel';
import memberService from '../../services/member_service';


const AnggotaTimAdminTim = ({ isSidebarOpen = true }) => {
    const userRole = 'team_admin';
    const [stats, setStats] = useState({ total: 0, "laki-laki": 0, "perempuan": 0 });
    const [members, setMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [genderRes, membersRes] = await Promise.all([
                    memberService.getGenderCounts(),
                    memberService.getAllMyMembers(),
                ]);

                setStats(genderRes.data || { total: 0, male: 0, female: 0 });
                setMembers(membersRes.data || []);
            } catch (error) {
                console.error('Error fetching member data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const cards = [
        {
            color: 'bg-simbaris-accent',
            title: 'Total Anggota',
            data: `${stats.total} Anggota`,
            leftIcon: <Users className="text-white" size={20} />,
        },
        {
            color: 'bg-blue-500',
            title: 'Laki-laki',
            data: `${stats['laki-laki']} Anggota`,
            leftIcon: <User className="text-white" size={20} />,
        },
        {
            color: 'bg-pink-500',
            title: 'Perempuan',
            data: `${stats['perempuan']} Anggota`,
            leftIcon: <User className="text-white" size={20} />,
        },
    ];

    return (
        <div className="flex bg-gray-100 min-h-screen font-inter">
            <div
                className={`w-full min-h-screen overflow-hidden pt-16 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'} transition-all duration-300`}
            >
                <div className="flex flex-col gap-4 p-6">
                    {/* Cards */}
                    <div className="hidden xl:flex gap-4 mb-4">
                        {isLoading
                            ? [1, 2, 3].map((_, index) => (
                                  <SimpleCardSkeleton key={index} />
                              ))
                            : cards.map((card, index) => (
                                  <SimpleCard key={index} {...card} />
                              ))}
                    </div>

                    {/* Header */}
                    <header className="text-simbaris-text font-semibold text-3xl">
                        Anggota Tim
                    </header>

                    {/* Data Saya card (full width, like DashboardMember's style) */}
                    <div className="flex flex-col gap-4 bg-white rounded-lg shadow-md p-6">
                        <MyMemberPanel
                            myMemberData={members}
                            userRole={userRole}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnggotaTimAdminTim;
