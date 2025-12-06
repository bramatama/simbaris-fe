const SchoolDataPanel = ({ schoolData }) => {
    return (
        <>
            <h2 className="text-xl font-semibold text-simbaris-text">
                Data Sekolah
            </h2>

            <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                    <span className="text-sm text-gray-600">Nama Sekolah</span>
                    <span className="text-sm font-medium text-gray-900 text-right">
                        {schoolData.school.school_name}
                    </span>
                </div>
                <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                    <span className="text-sm text-gray-600">
                        Jenjang Sekolah
                    </span>
                    <span className="text-sm font-medium text-gray-900 text-right">
                        {schoolData.school.level}
                    </span>
                </div>
                <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                    <span className="text-sm text-gray-600">Provinsi</span>
                    <span className="text-sm font-medium text-gray-900 text-right">
                        {schoolData.school.province}
                    </span>
                </div>
                <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                    <span className="text-sm text-gray-600">Kota</span>
                    <span className="text-sm font-medium text-gray-900 text-right">
                        {schoolData.school.city}
                    </span>
                </div>
                <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                    <span className="text-sm text-gray-600">Kecamatan</span>
                    <span className="text-sm font-medium text-gray-900 text-right">
                        {schoolData.school.subdistrict}
                    </span>
                </div>
            </div>
        </>
    );
};

export default SchoolDataPanel;
