import { useState, useMemo } from 'react';
import {
    GraduationCapIcon,
    Users,
    Filter,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    SearchIcon,
} from 'lucide-react';
import SimpleCard from '../components/SimpleCards';
import InputField from '../components/inputs/InputField';

const initialData = [
    {
        id: 1,
        team: 'Human Torch',
        school: 'SMP Negeri 29 Samarinda',
        level: 'SMP/MTs Sederajat',
        time: 'Kalimantan Timur',
        status: 'Perlu Verifikasi',
        verified_by: '-',
    },
    {
        id: 2,
        team: 'Garuda Muda',
        school: 'SMP Negeri 89 Balikpapan',
        level: 'SMP/MTs Sederajat',
        time: 'Kalimantan Timur',
        status: 'Telah Diverifikasi',
        verified_by: 'Joko',
    },
    {
        id: 3,
        team: 'Elang Perkasa',
        school: 'SD Negeri 087 Pontianak',
        level: 'SD/MI Sederajat',
        time: 'Kalimantan Barat',
        status: 'Perlu Verifikasi',
        verified_by: '-',
    },
    {
        id: 4,
        team: 'Kijang Mata Satu',
        school: 'SMK Kesehatan Samarinda',
        level: 'SMA/SMK/MA Sederajat',
        time: 'Kalimantan Timur',
        status: 'Perlu Verifikasi',
        verified_by: '-',
    },
    {
        id: 5,
        team: 'Ksatria Muda',
        school: 'SMP Negeri 99 Singkawang',
        level: 'SMP/MTs Sederajat',
        time: 'Kalimantan Barat',
        status: 'Ditolak',
        verified_by: 'Bambang',
    },
    {
        id: 6,
        team: 'Arjuna',
        school: 'SMA Negeri 10 Balikpapan',
        level: 'SMA/SMK/MA Sederajat',
        time: 'Kalimantan Timur',
        status: 'Perlu Verifikasi',
        verified_by: '-',
    },
    {
        id: 7,
        team: 'Budiono Siregar',
        school: 'SD Negeri 1 Palangkaraya',
        level: 'SD/MI Sederajat',
        time: 'Kalimantan Tengah',
        status: 'Telah Diverifikasi',
        verified_by: 'Bambang',
    },
    {
        id: 8,
        team: 'Bina Bangsa',
        school: 'SD Negeri 77 Balikpapan',
        level: 'SD/MI Sederajat',
        time: 'Kalimantan Timur',
        status: 'Perlu Verifikasi',
        verified_by: '-',
    },
    {
        id: 9,
        team: 'Ksatria Nusantara',
        school: 'SMP Nusantara Pontianak',
        level: 'SMP/MTs Sederajat',
        time: 'Kalimantan Barat',
        status: 'Telah Diverifikasi',
        verified_by: 'Joko',
    },
    {
        id: 10,
        team: 'Harimau Sakti',
        school: 'MAN 5 Balikpapan',
        level: 'SMA/SMK/MA Sederajat',
        time: 'Kalimantan Timur',
        status: 'Telah Diverifikasi',
        verified_by: 'Sulis',
    },
    {
        id: 11,
        team: 'Rajawali',
        school: 'SMA 1 Samarinda',
        level: 'SMA/SMK/MA Sederajat',
        time: 'Kalimantan Timur',
        status: 'Perlu Verifikasi',
        verified_by: '-',
    },
    {
        id: 12,
        team: 'Pangeran Antasari',
        school: 'SMP 1 Banjarmasin',
        level: 'SMP/MTs Sederajat',
        time: 'Kalimantan Selatan',
        status: 'Telah Diverifikasi',
        verified_by: 'Joko',
    },
    {
        id: 13,
        team: 'Srikandi',
        school: 'SMK 2 Balikpapan',
        level: 'SMA/SMK/MA Sederajat',
        time: 'Kalimantan Timur',
        status: 'Perlu Verifikasi',
        verified_by: '-',
    },
    {
        id: 14,
        team: 'Gatot Kaca',
        school: 'SD 1 Tenggarong',
        level: 'SD/MI Sederajat',
        time: 'Kalimantan Timur',
        status: 'Perlu Verifikasi',
        verified_by: '-',
    },
    {
        id: 15,
        team: 'Panglima Burung',
        school: 'SMA 3 Pontianak',
        level: 'SMA/SMK/MA Sederajat',
        time: 'Kalimantan Barat',
        status: 'Ditolak',
        verified_by: 'Bambang',
    },
];

const FilterButton = ({ label }) => (
    <button className="flex items-center gap-2 px-4 py-2 h-11 bg-white border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition-colors">
        {label}
        <Filter size={16} />
    </button>
);

const TimTerdaftarMember = ({ isSidebarOpen }) => {
    const cards = [
        {
            color: 'bg-simbaris-accent',
            title: 'Tim Terdaftar',
            data: '15 Data',
            leftIcon: <Users className="text-white" size={20} />,
        },
        {
            color: 'bg-gray-500',
            title: 'SMA/SMK/MA Sederajat',
            data: '5 Data',
            leftIcon: <GraduationCapIcon className="text-white" size={20} />,
        },
        {
            color: 'bg-simbaris-secondary',
            title: 'SMP/MTs Sederajat',
            data: '5 Data',
            leftIcon: <GraduationCapIcon className="text-white" size={20} />,
        },
        {
            color: 'bg-simbaris-hazard',
            title: 'SD/MI Sederajat',
            data: '5 Data',
            leftIcon: <GraduationCapIcon className="text-white" size={20} />,
        },
    ];

    const [data] = useState(initialData);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'asc',
    });

    // --- LOGIC ---

    // 1. Filtering
    const filteredData = useMemo(() => {
        return data.filter(
            (item) =>
                item.team.toLowerCase().includes(search.toLowerCase()) ||
                item.school.toLowerCase().includes(search.toLowerCase())
        );
    }, [data, search]);

    // 2. Sorting
    const sortedData = useMemo(() => {
        let sortableItems = [...filteredData];
        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key])
                    return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key])
                    return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [filteredData, sortConfig]);

    // 3. Pagination
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const paginatedData = sortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Helper untuk Header Tabel
    const Th = ({ label, sortKey, className = '' }) => (
        <th
            className={`px-4 py-3 text-left font-semibold text-white text-sm whitespace-nowrap ${className}`}
        >
            <button
                className="flex items-center gap-2 hover:text-gray-200"
                onClick={() => sortKey && handleSort(sortKey)}
            >
                {label}
                {sortKey && <ArrowUpDown size={14} className="opacity-70" />}
            </button>
        </th>
    );

    return (
        <div className="flex bg-gray-100">
            <div
                className={`w-full min-h-screen overflow-hidden pt-16 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'} transition-all duration-300`}
            >
                <div className="flex flex-col gap-4 p-6">
                    <header className="text-simbaris-text font-semibold text-3xl">
                        Tim Terdaftar
                    </header>
                    <div className="hidden lg:flex gap-4 mb-4">
                        {cards.map((card, index) => (
                            <SimpleCard
                                key={index}
                                color={card.color}
                                title={card.title}
                                data={card.data}
                                leftIcon={card.leftIcon}
                            />
                        ))}
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">
                            Daftar Tim
                        </h1>
                        <div className="flex flex-col items-center lg:flex-row gap-4">
                            <InputField 
                                leftIcon={<SearchIcon/>}
                                name="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari Tim"
                            />
                            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
                                <FilterButton label="Jenjang" />
                                <FilterButton label="Provinsi" />
                                <FilterButton label="Kota" />
                                <FilterButton label="Kota" />
                            </div>
                        </div>
                        <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    {/* Header Biru (#3454D1 is typical primary blue) */}
                                    <thead className="bg-blue-600">
                                        <tr>
                                            <Th
                                                label="Nama Tim"
                                                sortKey="team"
                                            />
                                            <Th
                                                label="Nama Sekolah"
                                                sortKey="school"
                                            />
                                            <Th
                                                label="Jenjang"
                                                sortKey="level"
                                            />
                                            <Th
                                                label="Waktu Pendaftaran"
                                                sortKey="time"
                                            />
                                            <Th
                                                label="Status Pendaftaran"
                                                sortKey="status"
                                            />
                                            <Th
                                                label="Verifikator"
                                                sortKey="verifier"
                                            />
                                            <th className="px-4 py-3 text-center text-white font-semibold text-sm">
                                                Detail
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {paginatedData.length > 0 ? (
                                            paginatedData.map((row, index) => (
                                                <tr
                                                    key={row.id}
                                                    className={`hover:bg-gray-50 transition-colors ${
                                                        index % 2 !== 0
                                                            ? 'bg-gray-50/50'
                                                            : 'bg-white'
                                                    }`}
                                                >
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                                        {row.team}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {row.school}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {row.level}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {row.time}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {row.status}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {row.verifier}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
                                                        <button className="text-gray-400 hover:text-blue-600 transition-colors">
                                                            <MoreVertical
                                                                size={18}
                                                            />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="7"
                                                    className="px-4 py-8 text-center text-gray-500 text-sm"
                                                >
                                                    Tidak ada data yang
                                                    ditemukan.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* --- PAGINATION --- */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
                            <div>
                                {(currentPage - 1) * itemsPerPage + 1}-
                                {Math.min(
                                    currentPage * itemsPerPage,
                                    sortedData.length
                                )}{' '}
                                of {sortedData.length}
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span>Result per page</span>
                                    <select
                                        className="border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        value={itemsPerPage}
                                        onChange={(e) => {
                                            setItemsPerPage(
                                                Number(e.target.value)
                                            );
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-1">
                                    <button
                                        className="flex items-center px-2 py-1 hover:text-blue-600 disabled:opacity-50 disabled:hover:text-gray-600"
                                        onClick={() =>
                                            setCurrentPage((p) =>
                                                Math.max(1, p - 1)
                                            )
                                        }
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronLeft size={16} /> Back
                                    </button>

                                    <div className="flex gap-1 mx-2">
                                        {Array.from(
                                            { length: totalPages },
                                            (_, i) => i + 1
                                        ).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() =>
                                                    setCurrentPage(page)
                                                }
                                                className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                                                    currentPage === page
                                                        ? 'bg-simbaris-secondary text-white'
                                                        : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        className="flex items-center px-2 py-1 hover:text-simbaris-secondary disabled:opacity-50 disabled:hover:text-gray-600"
                                        onClick={() =>
                                            setCurrentPage((p) =>
                                                Math.min(totalPages, p + 1)
                                            )
                                        }
                                        disabled={currentPage === totalPages}
                                    >
                                        Next <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TimTerdaftarMember;
