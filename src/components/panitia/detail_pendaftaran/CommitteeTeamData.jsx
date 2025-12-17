const CommitteeTeamDataPanel = ({ registrationData }) => {
    return (
        <>
            <h2 className="text-xl font-semibold text-simbaris-text">
                Data Tim
            </h2>
            <div className={`flex items-center flex-col gap-6`}>
                {/* Logo Tim */}
                <div className="shrink-0">
                    <div className="w-80 h-80 border-2 border-gray-300 rounded-full flex items-center justify-center overflow-hidden bg-white">
                        {registrationData.logoUrl ? (
                            <img
                                src={registrationData.logoUrl}
                                className="w-72 h-full object-contain rounded-full"
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
                        <span className="text-sm text-gray-600">Nama Tim</span>
                        <span className="text-sm font-medium text-gray-900 text-right">
                            {registrationData.team_name}
                        </span>
                    </div>
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">
                            Nama Sekolah
                        </span>
                        <span className="text-sm font-medium text-gray-900 text-right">
                            {registrationData.school_name}
                        </span>
                    </div>
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">Kota</span>
                        <span className="text-sm font-medium text-gray-900 text-right">
                            {registrationData.city}
                        </span>
                    </div>
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">
                            Nama Pelatih
                        </span>
                        <span className="text-sm font-medium text-gray-900 text-right">
                            {registrationData.coach_name}
                        </span>
                    </div>
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">
                            Nama Pembina
                        </span>
                        <span className="text-sm font-medium text-gray-900 text-right break-all">
                            {registrationData.supervisor_name}
                        </span>
                    </div>
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">
                            Kontak
                        </span>
                        <span className="text-sm font-medium text-gray-900 text-right break-all">
                            {registrationData.contact}
                        </span>
                    </div>
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">
                            Email
                        </span>
                        <span className="text-sm font-medium text-gray-900 text-right break-all">
                            {registrationData.email}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommitteeTeamDataPanel;
