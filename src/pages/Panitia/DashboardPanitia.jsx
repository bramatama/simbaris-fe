import { useState, useMemo, useEffect, useRef } from 'react';
import { PenTool, ExternalLink, SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

// Services
import registrationService from '../../services/registration_service';
import schoolService from '../../services/school_service';

// Components
import Button from '../../components/ui/Button';
import PieChart from '../../components/panitia/dashboard_panitia/PieChart';
import FastestRegistrantsPanel from '../../components/panitia/dashboard_panitia/FastestRegistrationPanel';
import SimpleCard from '../../components/ui/SimpleCards';
import Table from '../../components/ui/Table';
import InputField from '../../components/ui/InputField';
import Pagination from '../../components/ui/Pagination';
import SimpleCardSkeleton from '../../components/skeleton/CardSkeleton';
import ErrorPanel from '../../components/ui/ErrorPanel';

const DashboardPanitia = ({ isSidebarOpen }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({
        key: 'submitted_at',
        direction: 'desc',
    });

    // --- State untuk Data API ---
    const [stats, setStats] = useState(null);
    const [statsLoading, setStatsLoading] = useState(true);
    const [teams, setTeams] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [teamsLoading, setTeamsLoading] = useState(true);
    const [fastestTeams, setFastestTeams] = useState([]);
    const [registrationData, setRegistrationData] = useState({
        labels: [],
        values: [],
    });
    const [error, setError] = useState(null);

    const hasFetched = useRef(false);

    // --- DATA PROCESSING ---
    useEffect(() => {
        // Fetch all data in parallel
        const fetchDashboardData = async () => {
            try {
                // Fetch stats for cards
                setStatsLoading(true);
                setError(null);

                const [statsRes, levelsRes, allRegRes, fastestRes] =
                    await Promise.all([
                        registrationService.getStats(),
                        schoolService.getLevelCounts(),
                        registrationService.getAllRegistrations(),
                        registrationService.getFastestRegistrants(),
                    ]);

                setStats(statsRes.data);

                const counts = levelsRes.data;
                setRegistrationData({
                    labels: [
                        'SMA/SMK/MA Sederajat',
                        'SMP/MTs Sederajat',
                        'SD/MI Sederajat',
                    ],
                    values: [
                        counts['SMA/SMK/MA Sederajat'],
                        counts['SMP/MTs Sederajat'],
                        counts['SD/MI Sederajat'],
                    ],
                });

                // Process and Set All Registrations for Table
                const formattedRegistrations = allRegRes.data.map((reg) => ({
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
                }));
                setTeams(formattedRegistrations);
                setTotalItems(formattedRegistrations.length);

                setFastestTeams(
                    fastestRes.data.map((t) => ({
                        team_name: t.teams.team_name || 'N/A',
                        school_name: t.teams.schools.school_name || 'N/A',
                        logo: t.teams.team_logo_url,
                    }))
                );
            } catch (error) {
                console.error('Failed to fetch dashboard widgets data:', error);
                setError(
                    'Gagal memuat data dashboard. Silakan periksa koneksi internet Anda atau coba lagi nanti.'
                );
            } finally {
                setStatsLoading(false);
                setTeamsLoading(false);
            }
        };

        if (hasFetched.current) return;
        hasFetched.current = true;

        fetchDashboardData();
    }, []);

    // --- FILTERING & PAGINATION ---
    const processedTeams = useMemo(() => {
        let data = [...teams];

        // 1. Search
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            data = data.filter(
                (item) =>
                    (item.team_name?.toLowerCase() || '').includes(
                        lowerQuery
                    ) ||
                    (item.school_name?.toLowerCase() || '').includes(lowerQuery)
            );
        }

        // 2. Sort
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
    }, [teams, searchQuery, sortConfig]);

    const paginatedTeams = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return processedTeams.slice(startIndex, startIndex + itemsPerPage);
    }, [processedTeams, currentPage, itemsPerPage]);

    const cards = [
        {
            color: 'bg-simbaris-secondary',
            title: 'Tim Terdaftar',
            data: stats?.total || 0,
            leftIcon: <PenTool className="text-white" size={20} />,
            rightIcon: <ExternalLink size={18} className="text-gray-400" />,
            navigateTo: '/tim-terdaftar',
        },
        {
            color: 'bg-simbaris-warning',
            title: 'Tim Butuh Verifikasi',
            data: stats?.pending || 0,
            leftIcon: <PenTool className="text-white" size={20} />,
            rightIcon: <ExternalLink size={18} className="text-gray-400" />,
            navigateTo: '/tim-terdaftar',
        },
        {
            color: 'bg-simbaris-hazard',
            title: 'Tim Butuh Revisi',
            data: stats?.rejected || 0,
            leftIcon: <PenTool className="text-white" size={20} />,
            rightIcon: <ExternalLink size={18} className="text-gray-400" />,
            navigateTo: '/tim-terdaftar',
        },
        {
            color: 'bg-simbaris-success',
            title: 'Tim Terverifikasi',
            data: stats?.verified || 0,
            leftIcon: <PenTool className="text-white" size={20} />,
            rightIcon: <ExternalLink size={18} className="text-gray-400" />,
            navigateTo: '/tim-terdaftar',
        },
    ];

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
    ];

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="flex bg-gray-100">
            <div
                className={`w-full min-h-screen overflow-hidden pt-16 ${
                    isSidebarOpen ? 'md:ml-64' : 'ml-0'
                } transition-all duration-300`}
            >
                <div className="flex flex-col gap-4 p-6">
                    <header className="text-simbaris-text font-semibold text-3xl">
                        Dashboard
                    </header>

                    {error ? (
                        <ErrorPanel message={error} />
                    ) : (
                        <>
                            <div className="hidden xl:flex gap-4 mb-4">
                                {statsLoading
                                    ? [1, 2, 3, 4].map((_, i) => (
                                          <SimpleCardSkeleton key={i} />
                                      ))
                                    : cards.map((card, index) => (
                                          <SimpleCard key={index} {...card} />
                                      ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 gap-4">
                                <div className="flex flex-col gap-4 bg-white rounded-lg shadow-md p-6 col-span-1 row-span-1 md:col-span-2 md:row-span-3 h-full">
                                    <h3 className="font-bold text-xl">
                                        Tim Terdaftar
                                    </h3>
                                    <div className="flex relative z-10">
                                        <InputField
                                            leftIcon={
                                                <SearchIcon
                                                    size={18}
                                                    className="text-gray-400"
                                                />
                                            }
                                            name="search"
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            placeholder="Cari Tim atau Sekolah..."
                                            className="h-11"
                                            disabled={teamsLoading}
                                        />
                                    </div>

                                    <div className="relative">
                                        {teamsLoading ? (
                                            <div className="border border-gray-200 rounded-lg overflow-hidden animate-pulse">
                                                <div className="h-12 bg-gray-100 border-b border-gray-200"></div>
                                                {[1, 2, 3, 4, 5].map((i) => (
                                                    <div
                                                        key={i}
                                                        className="h-16 bg-white border-b border-gray-100"
                                                    ></div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <Table
                                                    columns={columns}
                                                    data={paginatedTeams}
                                                    sortConfig={sortConfig}
                                                    onSort={handleSort}
                                                />
                                                <Pagination
                                                    currentPage={currentPage}
                                                    totalItems={
                                                        processedTeams.length
                                                    }
                                                    itemsPerPage={itemsPerPage}
                                                    onPageChange={
                                                        setCurrentPage
                                                    }
                                                    onItemsPerPageChange={(
                                                        val
                                                    ) => {
                                                        setItemsPerPage(val);
                                                        setCurrentPage(1);
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex justify-end items-center">
                                        <Link to="/tim-terdaftar">
                                            <Button
                                                text="Lihat Selengkapnya"
                                                size="long"
                                                round="half"
                                                color="secondary"
                                                disabled={teamsLoading}
                                                leftIcon={
                                                    <ExternalLink size={18} />
                                                }
                                            ></Button>
                                        </Link>
                                    </div>
                                </div>

                                <div className="flex bg-white shadow-md rounded-lg col-span-1 row-span-1">
                                    <div className="h-full w-full p-6 flex flex-col gap-4">
                                        <span className="text-xl text-simbaris-text font-bold">
                                            Pendaftar Tercepat
                                        </span>
                                        <div className="flex items-center w-full h-full">
                                            <FastestRegistrantsPanel
                                                teams={
                                                    fastestTeams.length > 0
                                                        ? fastestTeams
                                                        : []
                                                }
                                                isLoading={statsLoading}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white flex flex-col items-center rounded-lg shadow-md py-4 px-6 md:row-span-2">
                                    <div className="h-full w-full max-w-[350px] p-4">
                                        <PieChart
                                            // Gunakan data yang sudah diproses
                                            chartData={registrationData}
                                            title="Tim Terdaftar Perkategori"
                                            isLoading={statsLoading}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DashboardPanitia;
