import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import myData from '../../dummy/singleMemberData';
import memberList from '../../dummy/memberList';
import MyDataPanel from '../../components/member/MyDataPanel';
import MyMemberPanel from '../../components/member/MyMemberPanel';

const AnggotaTimAdminTim = ({ isSidebarOpen = true }) => {
    const userRole = 'member';
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
                        <MyDataPanel myData={myData} userRole={userRole} />
                        <MyMemberPanel
                            myMemberData={memberList}
                            userRole={userRole}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnggotaTimAdminTim;
