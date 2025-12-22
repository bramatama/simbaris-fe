const SchoolDataPanel = ({ schoolData, isLoading = false }) => {
    // if (!schoolData) return null;
    return (
        <>
            <h2 className="text-xl font-semibold text-simbaris-text">
                Data Sekolah
            </h2>
            {isLoading ? (
                <div className="animate-pulse">
                    <div className="space-y-4">
                        {[...Array(5)].map((_, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-end border-b border-gray-200 pb-2"
                            >
                                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">
                            Nama Sekolah
                        </span>
                        <span className="text-sm font-medium text-gray-900 text-right">
                            {schoolData.school_name}
                        </span>
                    </div>
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">
                            Jenjang Sekolah
                        </span>
                        <span className="text-sm font-medium text-gray-900 text-right">
                            {schoolData.school_level}
                        </span>
                    </div>
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">Provinsi</span>
                        <span className="text-sm font-medium text-gray-900 text-right">
                            {schoolData.province}
                        </span>
                    </div>
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">Kota</span>
                        <span className="text-sm font-medium text-gray-900 text-right">
                            {schoolData.city}
                        </span>
                    </div>
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">Kecamatan</span>
                        <span className="text-sm font-medium text-gray-900 text-right">
                            {schoolData.subdistrict}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
};

export default SchoolDataPanel;
