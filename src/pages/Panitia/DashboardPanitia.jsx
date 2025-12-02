import { useState, useMemo, useEffect } from 'react';
import { PenTool, ExternalLink, SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

// Services
import teamService from '../../services/team_service';
import registrationService from '../../services/registration_service';

// Components
import Button from '../../components/Button';
import PieChart from '../../components/panitia/dashboard_panitia/PieChart';
import FastestRegistrantsPanel from '../../components/panitia/dashboard_panitia/FastestRegistrationPanel';
import SimpleCard from '../../components/SimpleCards';
import Table from '../../components/Table';
import InputField from '../../components/inputs/InputField';
import Pagination from '../../components/Pagination';
import SimpleCardSkeleton from '../../components/skeleton/SimpleCardSkeleton';

const DashboardPanitia = ({ isSidebarOpen }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

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

    // --- DEBOUNCE SEARCH ---
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setCurrentPage(1); // Reset halaman saat pencarian berubah
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    // --- DATA PROCESSING ---
    useEffect(() => {
        // Fetch all data in parallel
        const fetchDashboardData = async () => {
            try {
                // Fetch stats for cards
                setStatsLoading(true);
                const statsRes = await registrationService.getStats();
                setStats(statsRes.data);
                setStatsLoading(false);

                // Fetch data for Pie Chart
                const levelsRes = await teamService.getLevelCounts();
                const counts = levelsRes.data;
                setRegistrationData({
                    labels: [
                        'SMA Sederajat',
                        'SMP Sederajat',
                        'SD Sederajat',
                    ],
                    values: [
                        counts.senior_high,
                        counts.junior_high,
                        counts.elementary,
                    ],
                });

                // Fetch fastest registrants
                const fastestRes = await registrationService.getFastestRegistrants();
                setFastestTeams(
                    fastestRes.data.map((t) => ({
                        team_name: t.teams.team_name || 'N/A',
                        school_name: t.teams.schools.school_name || 'N/A',
                        initials: t.teams.team_name
                            ? t.teams.team_name.substring(0, 2).toUpperCase()
                            : 'N/A',
                    }))
                );
            } catch (error) {
                console.error('Failed to fetch dashboard widgets data:', error);
                setStatsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    useEffect(() => {
        const fetchTeams = async () => {
            setTeamsLoading(true);
            try {
                const params = {
                    page: currentPage,
                    limit: itemsPerPage,
                    search: debouncedSearch,
                    sortBy: sortConfig.key,
                    order: sortConfig.direction,
                };
                const response = await teamService.getTeams(params);
                setTeams(response.data || []);
                setTotalItems(response.count || 0);
            } catch (error) {
                console.error('Failed to fetch teams:', error);
            } finally {
                setTeamsLoading(false);
            }
        };
        fetchTeams();
    }, [currentPage, itemsPerPage, debouncedSearch, sortConfig]);

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
                return <span className={colorClass}>{row.status || 'N/A'}</span>;
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

                    <div className="hidden xl:flex gap-4 mb-4">
                        {statsLoading
                            ? [1, 2, 3, 4].map((_, i) => <SimpleCardSkeleton key={i} />)
                            : cards.map((card, index) => (
                                  <SimpleCard key={index} {...card} />
                              ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-4 bg-white rounded-lg shadow-md p-6 col-span-1 row-span-1 md:col-span-2 md:row-span-3 h-fit">
                            <h3 className="font-bold text-xl">Tim Terdaftar</h3>
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
                                <div className={`transition-opacity duration-300 ${teamsLoading ? 'opacity-50' : 'opacity-100'}`}>
                                    <Table
                                        columns={columns}
                                        data={teams}
                                        sortConfig={sortConfig}
                                        onSort={handleSort}
                                        isLoading={teamsLoading}
                                    />
                                    <Pagination
                                        currentPage={currentPage}
                                        totalItems={totalItems}
                                        itemsPerPage={itemsPerPage}
                                        onPageChange={setCurrentPage}
                                        onItemsPerPageChange={(val) => {
                                            setItemsPerPage(val);
                                            setCurrentPage(1);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end items-center">
                                <Link to="/tim-terdaftar">
                                    <Button
                                        text="Lihat Selengkapnya"
                                        size="long"
                                        round="half"
                                        color="secondary"
                                        leftIcon={<ExternalLink size={18} />}
                                    ></Button>
                                </Link>
                            </div>
                        </div>

                        <div className="flex bg-white shadow-md rounded-lg col-span-1 row-span-1">
                            <div className="h-full w-full p-6 flex flex-col">
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
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DashboardPanitia;
