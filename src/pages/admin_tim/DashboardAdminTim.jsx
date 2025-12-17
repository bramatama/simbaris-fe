import MyDataPanel from "../../components/member/MyDataPanel";
import MyMemberPanel from "../../components/member/MyMemberPanel";
import MyTeamPanel from "../../components/member/dashboard_member/MyTeamPanel";
import MyTeamDataPanel from "../../components/admin_tim/MyTeamDataPanel";
import myData from "../../dummy/singleMemberData";
import teamData from "../../dummy/singleTeamData";
import memberList from "../../dummy/memberList";
import MyRegistrationPanel from "../../components/admin_tim/MyRegistrationPanel";

const DashboardAdminTim = ({ isSidebarOpen }) => {
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
                            <MyTeamDataPanel teamData={teamData} />
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 border flex flex-col lg:col-span-1 lg:row-span-1">
                            <h2 className="text-xl font-semibold text-simbaris-text">
                                Nilai dan Catatan Juri
                            </h2>
                            <p className="flex h-full font-extrabold text-4xl text-gray-300 text-center items-center justify-center p-8">
                                COMING SOON
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2 lg:row-span-2 border border-gray-200">
                            <MyMemberPanel myMemberData={memberList} />
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 border lg:col-span-1 lg:row-span-2 border-gray-200">
                            <MyRegistrationPanel teamData={teamData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DashboardAdminTim;
