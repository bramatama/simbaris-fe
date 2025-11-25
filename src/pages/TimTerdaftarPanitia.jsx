import { useState, useMemo, useRef, useEffect } from 'react';
import {
    GraduationCapIcon,
    Users,
    Filter,
    SearchIcon,
    MoreVertical,
    XCircle,
    ChevronDown, // Tambahkan import ChevronDown
} from 'lucide-react';
import SimpleCard from '../components/SimpleCards';
import InputField from '../components/inputs/InputField';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import FilterDropdown from '../components/FilterDropdown';

// ... (Data dummy initialData tetap sama) ...
const initialData = [
    {
        id: 1,
        team: 'Human Torch',
        school: 'SMP Negeri 29 Samarinda',
        level: 'SMP/MTs Sederajat',
        time: '25/10/2025',
        status: 'Perlu Verifikasi',
        verified_by: '-',
    },
    {
        id: 2,
        team: 'Garuda Muda',
        school: 'SMP Negeri 89 Balikpapan',
        level: 'SMP/MTs Sederajat',
        time: '26/10/2025',
        status: 'Telah Diverifikasi',
        verified_by: 'Joko',
    },
    {
        id: 3,
        team: 'Elang Perkasa',
        school: 'SD Negeri 087 Pontianak',
        level: 'SD/MI Sederajat',
        time: '24/10/2025',
        status: 'Perlu Verifikasi',
        verified_by: '-',
    },
    {
        id: 4,
        team: 'Kijang Mata Satu',
        school: 'SMK Kesehatan Samarinda',
        level: 'SMA/SMK/MA Sederajat',
        time: '25/10/2025',
        status: 'Perlu Verifikasi',
        verified_by: '-',
    },
    {
        id: 5,
        team: 'Ksatria Muda',
        school: 'SMP Negeri 99 Singkawang',
        level: 'SMP/MTs Sederajat',
        time: '26/10/2025',
        status: 'Ditolak',
        verified_by: 'Bambang',
    },
    {
        id: 6,
        team: 'Arjuna',
        school: 'SMA Negeri 10 Balikpapan',
        level: 'SMA/SMK/MA Sederajat',
        time: '24/10/2025',
        status: 'Perlu Verifikasi',
        verified_by: '-',
    },
    {
        id: 7,
        team: 'Budiono Siregar',
        school: 'SD Negeri 1 Palangkaraya',
        level: 'SD/MI Sederajat',
        time: '25/10/2025',
        status: 'Telah Diverifikasi',
        verified_by: 'Bambang',
    },
    {
        id: 8,
        team: 'Bina Bangsa',
        school: 'SD Negeri 77 Balikpapan',
        level: 'SD/MI Sederajat',
        time: '26/10/2025',
        status: 'Perlu Verifikasi',
        verified_by: '-',
    },
    {
        id: 9,
        team: 'Ksatria Nusantara',
        school: 'SMP Nusantara Pontianak',
        level: 'SMP/MTs Sederajat',
        time: '25/10/2025',
        status: 'Telah Diverifikasi',
        verified_by: 'Joko',
    },
    {
        id: 10,
        team: 'Harimau Sakti',
        school: 'MAN 5 Balikpapan',
        level: 'SMA/SMK/MA Sederajat',
        time: '26/10/2025',
        status: 'Telah Diverifikasi',
        verified_by: 'Sulis',
    },
    {
        id: 11,
        team: 'Rajawali',
        school: 'SMA 1 Samarinda',
        level: 'SMA/SMK/MA Sederajat',
        time: '24/10/2025',
        status: 'Perlu Verifikasi',
        verified_by: '-',
    },
    {
        id: 12,
        team: 'Pangeran Antasari',
        school: 'SMP 1 Banjarmasin',
        level: 'SMP/MTs Sederajat',
        time: '23/10/2025',
        status: 'Telah Diverifikasi',
        verified_by: 'Joko',
    },
    {
        id: 13,
        team: 'Srikandi',
        school: 'SMK 2 Balikpapan',
        level: 'SMA/SMK/MA Sederajat',
        time: '27/10/2025',
        status: 'Perlu Verifikasi',
        verified_by: '-',
    },
    {
        id: 14,
        team: 'Gatot Kaca',
        school: 'SD 1 Tenggarong',
        level: 'SD/MI Sederajat',
        time: '22/10/2025',
        status: 'Perlu Verifikasi',
        verified_by: '-',
    },
    {
        id: 15,
        team: 'Panglima Burung',
        school: 'SMA 3 Pontianak',
        level: 'SMA/SMK/MA Sederajat',
        time: '27/10/2025',
        status: 'Ditolak',
        verified_by: 'Bambang',
    },
];

const TimTerdaftarPanitia = ({ isSidebarOpen }) => {
    // --- STATE ---
    const [data] = useState(initialData);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({ level: '', status: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'asc',
    });

    // --- OPTIONS FILTER ---
    const levelOptions = [
        { label: 'SD/MI Sederajat', value: 'SD/MI Sederajat' },
        { label: 'SMP/MTs Sederajat', value: 'SMP/MTs Sederajat' },
        { label: 'SMA/SMK/MA Sederajat', value: 'SMA/SMK/MA Sederajat' },
    ];

    const statusOptions = [
        { label: 'Perlu Verifikasi', value: 'Perlu Verifikasi' },
        { label: 'Telah Diverifikasi', value: 'Telah Diverifikasi' },
        { label: 'Ditolak', value: 'Ditolak' },
    ];

    // --- DATA PROCESSING ---
    const stats = useMemo(() => {
        const counts = { total: data.length, sma: 0, smp: 0, sd: 0 };
        data.forEach((item) => {
            if (item.level === 'SMA/SMK/MA Sederajat') counts.sma++;
            else if (item.level === 'SMP/MTs Sederajat') counts.smp++;
            else if (item.level === 'SD/MI Sederajat') counts.sd++;
        });
        return counts;
    }, [data]);

    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const matchSearch =
                item.team.toLowerCase().includes(search.toLowerCase()) ||
                item.school.toLowerCase().includes(search.toLowerCase());
            const matchLevel = filters.level
                ? item.level === filters.level
                : true;
            const matchStatus = filters.status
                ? item.status === filters.status
                : true;
            return matchSearch && matchLevel && matchStatus;
        });
    }, [data, search, filters]);

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

    const paginatedData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(firstPageIndex, firstPageIndex + itemsPerPage);
    }, [sortedData, currentPage, itemsPerPage]);

    // --- HANDLERS ---
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setCurrentPage(1);
    };

    const columns = [
        {
            header: 'Nama Tim',
            accessor: 'team',
            sortable: true,
            cellClassName: 'text-gray-900 font-medium',
        },
        { header: 'Nama Sekolah', accessor: 'school', sortable: true },
        { header: 'Jenjang', accessor: 'level', sortable: true },
        { header: 'Waktu Pendaftaran', accessor: 'time', sortable: true },
        {
            header: 'Status Pendaftaran',
            accessor: 'status',
            sortable: true,
            render: (row) => {
                let colorClass = 'text-gray-600';
                if (row.status === 'Perlu Verifikasi')
                    colorClass =
                        'text-simbaris-warning font-medium bg-simbaris-warning-lightest px-2 py-1 rounded-md text-xs inline-block border border-simbaris-warning-light';
                if (row.status === 'Telah Diverifikasi')
                    colorClass =
                        'text-simbaris-success font-medium bg-simbaris-success-lightest px-2 py-1 rounded-md text-xs inline-block border border-simbaris-success-light';
                if (row.status === 'Ditolak')
                    colorClass =
                        'text-simbaris-hazard font-medium bg-simbaris-hazard-lightest px-2 py-1 rounded-md text-xs inline-block border border-simbaris-hazard-light';
                return <span className={colorClass}>{row.status}</span>;
            },
        },
        { header: 'Verifikator', accessor: 'verified_by', sortable: true },
        {
            header: 'Detail',
            accessor: 'actions',
            className: 'text-center',
            cellClassName: 'text-center',
            render: () => (
                <button className="text-gray-400 hover:text-blue-600 transition-colors inline-block p-1 rounded-full hover:bg-blue-50">
                    <MoreVertical size={18} />
                </button>
            ),
        },
    ];

    const cards = [
        {
            color: 'bg-simbaris-accent',
            title: 'Tim Terdaftar',
            data: `${stats.total}  Data`,
            leftIcon: <Users className="text-white" size={20} />,
        },
        {
            color: 'bg-gray-500',
            title: 'SMA/SMK/MA Sederajat',
            data: `${stats.sma}  Data`,
            leftIcon: <GraduationCapIcon className="text-white" size={20} />,
        },
        {
            color: 'bg-simbaris-secondary',
            title: 'SMP/MTs Sederajat',
            data: `${stats.smp}  Data`,
            leftIcon: <GraduationCapIcon className="text-white" size={20} />,
        },
        {
            color: 'bg-simbaris-hazard',
            title: 'SD/MI Sederajat',
            data: `${stats.sd}  Data`,
            leftIcon: <GraduationCapIcon className="text-white" size={20} />,
        },
    ];

    return (
        <div className="flex bg-gray-100">
            <div
                className={`w-full min-h-screen overflow-hidden pt-16 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'} transition-all duration-300`}
            >
                <div className="flex flex-col gap-4 p-6">
                    <header className="text-simbaris-text font-semibold text-3xl">
                        Tim Terdaftar
                    </header>

                    {/* Cards */}
                    <div className="hidden lg:flex gap-4 mb-4">
                        {cards.map((card, index) => (
                            <SimpleCard key={index} {...card} />
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col gap-4 bg-white rounded-lg shadow-md p-6 border border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h1 className="text-xl font-bold text-gray-900">
                                Daftar Tim
                            </h1>
                        </div>

                        {/* Search & Filters */}
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="flex">
                                <InputField
                                    leftIcon={
                                        <SearchIcon
                                            size={18}
                                            className="text-gray-400"
                                        />
                                    }
                                    name="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari Tim atau Sekolah..."
                                    className="h-11"
                                />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <FilterDropdown
                                    label="Jenjang"
                                    options={levelOptions}
                                    value={filters.level}
                                    onChange={(val) =>
                                        handleFilterChange('level', val)
                                    }
                                />
                                <FilterDropdown
                                    label="Status"
                                    options={statusOptions}
                                    value={filters.status}
                                    onChange={(val) =>
                                        handleFilterChange('status', val)
                                    }
                                />
                            </div>
                        </div>

                        <Table
                            columns={columns}
                            data={paginatedData}
                            sortConfig={sortConfig}
                            onSort={handleSort}
                        />

                        <Pagination
                            currentPage={currentPage}
                            totalItems={filteredData.length}
                            itemsPerPage={itemsPerPage}
                            onPageChange={setCurrentPage}
                            onItemsPerPageChange={(val) => {
                                setItemsPerPage(val);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimTerdaftarPanitia;
