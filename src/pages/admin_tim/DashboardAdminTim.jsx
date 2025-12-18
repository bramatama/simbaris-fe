import { useState, useEffect } from 'react';
import MyMemberPanel from '../../components/member/MyMemberPanel';
import MyTeamDataPanel from '../../components/admin_tim/MyTeamDataPanel';
import MyRegistrationPanel from '../../components/admin_tim/MyRegistrationPanel';
import memberService from '../../services/member_service';
import registrationService from '../../services/registration_service';
import ErrorPanel from '../../components/ui/ErrorPanel';

const DashboardAdminTim = ({ isSidebarOpen }) => {
    const [members, setMembers] = useState([]);
    const [registration, setRegistration] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [membersRes, regRes] = await Promise.all([
                    memberService.getAllMyMembers(),
                    registrationService.getMyRegistration(),
                ]);

                setMembers(membersRes.data || []);

                const rawReg = regRes.data;
                const statusMapping = {
                    pending: 'Menunggu Verifikasi',
                    verified: 'Terverifikasi',
                    rejected: 'Ditolak',
                };
                const formattedReg = rawReg
                    ? {
                          team_logo_url: rawReg.teams?.team_logo_url,
                          team_name: rawReg.teams?.team_name,
                          school_name: rawReg.teams?.schools?.school_name,
                          city: rawReg.teams?.schools?.city,
                          level: rawReg.teams?.schools?.level,
                          member_count: rawReg.total_members,
                          price: rawReg.price,
                          submitted_at: new Date(
                              rawReg.submitted_at
                          ).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                          }),
                          last_updated: new Date(
                              rawReg.last_update
                          ).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                          }),
                          status: statusMapping[rawReg.status] || rawReg.status,
                          verified_by: rawReg.verified_by
                              ? rawReg.verified_by.committee_name
                              : "-",
                      }
                    : null;
                setRegistration(formattedReg);
            } catch (err) {
                console.error(err);
                setError('Gagal memuat data dashboard.');
            } finally {
                setLoading(false);
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

                    {error ? (
                        <ErrorPanel message={error} />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 gap-4">
                            <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2 border border-gray-200">
                                <MyTeamDataPanel teamData={registration} isLoading={loading} />
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6 border flex flex-col lg:col-span-1 lg:row-span-1">
                                <h2 className="text-xl font-semibold text-simbaris-text">
                                    Nilai dan Catatan Juri
                                </h2>
                                <p className="flex h-full font-extrabold text-4xl text-gray-300 text-center items-center justify-center p-8">
                                    COMING SOON
                                </p>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2 h-fit lg:row-span-2 border border-gray-200">
                                <MyMemberPanel myMemberData={members} isLoading={loading} />
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6 border h-fit lg:col-span-1 lg:row-span-2 border-gray-200">
                                <MyRegistrationPanel teamData={registration} isLoading={loading} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DashboardAdminTim;
