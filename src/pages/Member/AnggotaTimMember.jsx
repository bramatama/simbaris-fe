import React, { useState, useMemo } from 'react';
import myData from '../../dummy/singleMemberData';
import memberList from '../../dummy/memberList';
import MyDataPanel from '../../components/member/MyDataPanel';
import MyMemberPanel from '../../components/member/MyMemberPanel';

const AnggotaTimMember = ({ isSidebarOpen = true }) => {
    // helpers
    const openMemberModal = (member) => {
        setSelectedMember(member);
        setShowMemberModal(true);
    };

    const handleOpenMyDetail = () => {
        openMemberModal(myData);
    }

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
                        <MyDataPanel
                            myData={myData}
                            onButtonClick={handleOpenMyDetail}
                        />
                        <MyMemberPanel myMemberData={memberList} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnggotaTimMember;
