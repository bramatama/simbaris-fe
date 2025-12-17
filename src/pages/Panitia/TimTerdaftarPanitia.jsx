import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    GraduationCapIcon,
    Users,
    SearchIcon,
    MoreVertical,
} from 'lucide-react';
import SimpleCard from '../../components/ui/SimpleCards';
import InputField from '../../components/ui/InputField';
import Table from '../../components/ui/Table';
import Pagination from '../../components/ui/Pagination';
import FilterDropdown from '../../components/ui/FilterDropdown';
import registrationService from '../../services/registration_service';
import schoolService from '../../services/school_service';
import SimpleCardSkeleton from '../../components/skeleton/CardSkeleton';

const TimTerdaftarPanitia = ({ isSidebarOpen }) => {
    const navigate = useNavigate();
    // --- STATE ---
    const [allRegistrations, setAllRegistrations] = useState([]);
    const [loadingTable, setLoadingTable] = useState(false);
    const [errorTable, setErrorTable] = useState(null);

    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({ level: '', status: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({
        key: 'submitted_at',
        direction: 'asc',
    });

    // --- OPTIONS FILTER ---
    const levelOptions = [
        { label: 'SD/MI Sederajat', value: 'SD/MI Sederajat' },
        { label: 'SMP/MTs Sederajat', value: 'SMP/MTs Sederajat' },
        { label: 'SMA/SMK/MA Sederajat', value: 'SMA/SMK/MA Sederajat' },
    ];

    const statusOptions = [
        { label: 'Perlu Verifikasi', value: 'pending' },
        { label: 'Telah Diverifikasi', value: 'verified' },
        { label: 'Ditolak', value: 'rejected' },
    ];

    // --- DATA PROCESSING ---
    const [stats, setStats] = useState({
        total: 0,
        sma: 0,
        smp: 0,
        sd: 0,
    });
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingStats(true);
            setLoadingTable(true);
            setErrorTable(null);
            try {
                const [levelsRes, allRegRes] = await Promise.all([
                    schoolService.getLevelCounts(),
                    registrationService.getAllRegistrations(),
                ]);

                // Process Stats
                const counts = levelsRes.data;
                setStats({
                    total: counts.total || 0,
                    sma: counts['SMA/SMK/MA Sederajat'] || 0,
                    smp: counts['SMP/MTs Sederajat'] || 0,
                    sd: counts['SD/MI Sederajat'] || 0,
                });

                // Process Table Data
                const formattedRegistrations = allRegRes.data.map((reg) => ({
                    registration_id: reg.registration_id,
                    team_name: reg.team_name || reg.teams?.team_name || 'N/A',
                    school_name:
                        reg.school_name ||
                        reg.teams?.schools?.school_name ||
                        'N/A',
                    school_level:
                        reg.school_level ||
                        reg.teams?.schools?.school_level ||
                        'N/A',
                    submitted_at: reg.created_at || reg.submitted_at,
                    status: reg.status,
                    verified_by: reg.verifier_name,
                }));
                setAllRegistrations(formattedRegistrations);
            } catch (error) {
                console.error('Gagal memuat data.', error);
                if (error.code === 'ERR_NETWORK') {
                    setErrorTable(
                        'Koneksi ke server gagal. Pastikan server backend berjalan.'
                    );
                } else {
                    setErrorTable('Gagal memuat data tim.');
                }
            } finally {
                setLoadingStats(false);
                setLoadingTable(false);
            }
        };
        fetchData();
    }, []);

    // --- CLIENT-SIDE FILTERING & PAGINATION ---
    const processedData = useMemo(() => {
        let data = [...allRegistrations];

        // 1. Search
        if (search) {
            const lowerQuery = search.toLowerCase();
            data = data.filter(
                (item) =>
                    (item.team_name?.toLowerCase() || '').includes(
                        lowerQuery
                    ) ||
                    (item.school_name?.toLowerCase() || '').includes(lowerQuery)
            );
        }

        // 2. Filter Level
        if (filters.level) {
            data = data.filter((item) => item.school_level === filters.level);
        }

        // 3. Filter Status
        if (filters.status) {
            data = data.filter((item) => item.status === filters.status);
        }

        // 4. Sort
        if (sortConfig.key) {
            data.sort((a, b) => {
                const aValue = a[sortConfig.key] || '';
                const bValue = b[sortConfig.key] || '';
                if (aValue < bValue)
                    return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue)
                    return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return data;
    }, [allRegistrations, search, filters, sortConfig]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return processedData.slice(startIndex, startIndex + itemsPerPage);
    }, [processedData, currentPage, itemsPerPage]);

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
            accessor: 'team_name',
            sortable: true,
            cellClassName: 'text-gray-900 font-medium',
        },
        { header: 'Nama Sekolah', accessor: 'school_name', sortable: true },
        { header: 'Jenjang', accessor: 'school_level' },
        {
            header: 'Waktu Pendaftaran',
            accessor: 'submitted_at',
            sortable: true,
            render: (row) =>
                new Date(row.submitted_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                }),
        },
        {
            header: 'Status Pendaftaran',
            accessor: 'status',

            render: (row) => {
                const statusMapping = {
                    pending: 'Menunggu Verifikasi',
                    verified: 'Terverifikasi',
                    rejected: 'Ditolak',
                };
                let colorClass = 'text-gray-600';
                if (row.status === 'pending')
                    colorClass =
                        'text-simbaris-warning font-medium bg-simbaris-warning-lightest px-2 py-1 rounded-md text-xs inline-block border border-simbaris-warning-light';
                if (row.status === 'verified')
                    colorClass =
                        'text-simbaris-success font-medium bg-simbaris-success-lightest px-2 py-1 rounded-md text-xs inline-block border border-simbaris-success-light';
                if (row.status === 'rejected')
                    colorClass =
                        'text-simbaris-hazard font-medium bg-simbaris-hazard-lightest px-2 py-1 rounded-md text-xs inline-block border border-simbaris-hazard-light';
                return (
                    <span className={colorClass}>
                        {statusMapping[row.status] || row.status || 'N/A'}
                    </span>
                );
            },
        },
        { header: 'Verifikator', accessor: 'verified_by', sortable: true },
        {
            header: 'Detail',
            accessor: 'actions',
            className: 'text-center',
            cellClassName: 'text-center',
            render: (row) => (
                <button
                    onClick={() =>
                        navigate(`/tim-terdaftar/detail/${row.registration_id}`)
                    }
                    className="text-gray-400 hover:text-blue-600 transition-colors inline-block p-1 rounded-full hover:bg-blue-50"
                >
                    <MoreVertical size={18} />
                </button>
            ),
        },
    ];

    const cards = [
        {
            color: 'bg-simbaris-accent',
            title: 'Tim Terdaftar',
            data: `${stats.total} Tim`,
            leftIcon: <Users className="text-white" size={20} />,
        },
        {
            color: 'bg-gray-500',
            title: 'SMA/SMK/MA Sederajat',
            data: `${stats.sma} Tim`,
            leftIcon: <GraduationCapIcon className="text-white" size={20} />,
        },
        {
            color: 'bg-simbaris-secondary',
            title: 'SMP/MTs Sederajat',
            data: `${stats.smp} Tim`,
            leftIcon: <GraduationCapIcon className="text-white" size={20} />,
        },
        {
            color: 'bg-simbaris-hazard',
            title: 'SD/MI Sederajat',
            data: `${stats.sd} Tim`,
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
                    <div className="hidden xl:flex gap-4 mb-4">
                        {loadingStats
                            ? [1, 2, 3, 4].map((_, index) => (
                                  <SimpleCardSkeleton key={index} />
                              ))
                            : cards.map((card, index) => (
                                  <SimpleCard key={index} {...card} />
                              ))}
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col gap-4 bg-white rounded-lg shadow-md p-6">
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
                                    disabled={loadingTable}
                                />
                            </div>
                            <div className="relative z-10 flex flex-wrap gap-2">
                                <FilterDropdown
                                    label="Jenjang"
                                    options={levelOptions}
                                    value={filters.level}
                                    onChange={(val) =>
                                        handleFilterChange('level', val)
                                    }
                                    disabled={loadingTable}
                                />
                                <FilterDropdown
                                    label="Status"
                                    options={statusOptions}
                                    value={filters.status}
                                    onChange={(val) =>
                                        handleFilterChange('status', val)
                                    }
                                    disabled={loadingTable}
                                />
                            </div>
                        </div>

                        <div className="relative">
                            {errorTable && (
                                <p className="text-center text-red-500">
                                    {errorTable}
                                </p>
                            )}
                            <div
                                className={`transition-opacity duration-300 ${loadingTable ? 'opacity-50' : 'opacity-100'}`}
                            >
                                <Table
                                    columns={columns}
                                    data={paginatedData}
                                    sortConfig={sortConfig}
                                    onSort={handleSort}
                                    isLoading={loadingTable}
                                />
                            </div>
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalItems={processedData.length}
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
