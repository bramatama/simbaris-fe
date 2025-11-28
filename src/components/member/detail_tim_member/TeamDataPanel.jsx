import React from 'react';

const TeamDataPanel = ({ teamData }) => {
    return (
        <>
            <h2 className="text-xl font-semibold text-simbaris-text">
                Data Tim
            </h2>
            <div className="flex flex-col items-center md:flex-row gap-6">
                {/* Logo Tim */}
                <div className="shrink-0">
                    <div className="w-48 h-48 border-2 border-gray-300 rounded-full flex items-center justify-center overflow-hidden bg-white">
                        {teamData.logoUrl ? (
                            <img
                                src={teamData.logoUrl}
                                className="w-32 h-full object-contain rounded-full"
                            />
                        ) : (
                            <div className="text-gray-300 text-6xl font-bold">
                                ?
                            </div>
                        )}
                    </div>
                </div>

                {/* Info Tim */}
                <div className="flex-1 w-full space-y-4">
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">Nama Tim</span>
                        <span className="text-sm font-medium text-gray-900 text-right">
                            {teamData.name}
                        </span>
                    </div>
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">
                            Nama Pelatih
                        </span>
                        <span className="text-sm font-medium text-gray-900 text-right">
                            {teamData.coach}
                        </span>
                    </div>
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">
                            Nama Pembina
                        </span>
                        <span className="text-sm font-medium text-gray-900 text-right">
                            {teamData.supervisor}
                        </span>
                    </div>
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">
                            Kontak Pembina/Pelatih
                        </span>
                        <span className="text-sm font-medium text-gray-900 text-right">
                            {teamData.contact}
                        </span>
                    </div>
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">
                            Email Pembina/Pelatih
                        </span>
                        <span className="text-sm font-medium text-gray-900 text-right break-all">
                            {teamData.email}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeamDataPanel;
