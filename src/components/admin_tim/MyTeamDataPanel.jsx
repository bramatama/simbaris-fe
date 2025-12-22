const MyTeamDataPanel = ({ teamData, isLoading = false }) => {

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-simbaris-text">
                Data Tim    
            </h2>
            {isLoading ? (
                <div className="flex items-center flex-col gap-6 animate-pulse">
                    <div className="shrink-0">
                        <div className="w-80 h-80 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="flex w-full gap-4 flex-col">
                        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                            <div
                                key={i}
                                className="flex justify-between items-end border-b border-gray-200 pb-2"
                            >
                                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className={`flex items-center flex-col gap-6`}>
                    {/* Logo Tim */}
                    <div className="shrink-0">
                        <div className="w-80 h-80 border-2 border-gray-300 rounded-full flex items-center justify-center overflow-hidden bg-white">
                            {teamData.logoUrl ? (
                                <img
                                    src={teamData.logoUrl}
                                    className="h-full w-full object-contain rounded-full"
                                />
                            ) : (
                                <div className="text-gray-300 text-6xl font-bold">
                                    ?
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info Tim */}
                    <div className="flex w-full gap-4 flex-col">
                        <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                            <span className="text-sm text-gray-600">
                                Nama Tim
                            </span>
                            <span className="text-sm font-medium text-gray-900 text-right">
                                {teamData.team_name}
                            </span>
                        </div>
                        <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                            <span className="text-sm text-gray-600">
                                Nama Sekolah
                            </span>
                            <span className="text-sm font-medium text-gray-900 text-right">
                                {teamData.school_name}
                            </span>
                        </div>
                        <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                            <span className="text-sm text-gray-600">Kota</span>
                            <span className="text-sm font-medium text-gray-900 text-right">
                                {teamData.city}
                            </span>
                        </div>
                        <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                            <span className="text-sm text-gray-600">
                                Nama Pelatih
                            </span>
                            <span className="text-sm font-medium text-gray-900 text-right">
                                {teamData.coach_name}
                            </span>
                        </div>
                        <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                            <span className="text-sm text-gray-600">
                                Nama Pembina
                            </span>
                            <span className="text-sm font-medium text-gray-900 text-right break-all">
                                {teamData.supervisor_name}
                            </span>
                        </div>
                        <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                            <span className="text-sm text-gray-600">
                                Kontak
                            </span>
                            <span className="text-sm font-medium text-gray-900 text-right break-all">
                                {teamData.contact}
                            </span>
                        </div>
                        <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                            <span className="text-sm text-gray-600">Email</span>
                            <span className="text-sm font-medium text-gray-900 text-right break-all">
                                {teamData.email}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyTeamDataPanel;
