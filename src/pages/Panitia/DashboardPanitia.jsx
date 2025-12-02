import { useState, useMemo, useEffect } from 'react';
import { PenTool, ExternalLink, SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

// Services & Hooks
import { useFetch } from '../../hooks/useApi';
import registrationService from '../../services/registration_service';
import teamService from '../../services/team_service';

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

    // State untuk input search (untuk UI)
    const [searchQuery, setSearchQuery] = useState('');
    // State untuk query API (yang ada delay/debounce)
    const [debouncedSearch, setDebouncedSearch] = useState('');

    const [sortConfig, setSortConfig] = useState({
        key: 'submitted_at', // Default sort key disesuaikan
        direction: 'desc',
    });

    // --- DEBOUNCE SEARCH ---
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setCurrentPage(1); // Reset page saat search berubah
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    // 1. Fetch Statistics
    const { data: stats, loading: statsLoading } = useFetch(
        registrationService.getStats
    );

    // --- MAPPING SORT KEYS ---
    // Terjemahkan 'Accessor Frontend' -> 'Kolom Database Backend'
    const backendSortKeys = {
        team_name: 'team_name',
        school_name: 'school_name',
        level: 'level',
        submitted_at: 'submitted_at', // PERBAIKAN: Mapping key frontend 'submitted_at' ke backend 'created_at'
        status: 'status',
    };

    // 2. Fetch Teams
    const queryParams = {
        page: currentPage,
        limit: itemsPerPage,
        search: debouncedSearch,
        sort_by: backendSortKeys[sortConfig.key] || sortConfig.key,
        sort_order: sortConfig.direction,
    };

    const { data: teamsResponse, loading: teamsLoading } = useFetch(
        teamService.getTeams,
        [queryParams],
        [currentPage, itemsPerPage, debouncedSearch, sortConfig]
    );

    // 3. Fetch Fastest Registrants
    const { data: fastestResponse } = useFetch(
        registrationService.getFastestRegistrants
    );

    // 4. Fetch Level Counts (Data untuk Pie Chart)
    const { data: levelsResponse, loading: levelLoading } = useFetch(
        teamService.getLevelCounts
    );

    // --- DATA PROCESSING ---

    const getStatusLabel = (status) => {
        switch (status) {
            case 'verified':
                return 'Telah Diverifikasi';
            case 'pending':
                return 'Perlu Verifikasi';
            case 'rejected':
                return 'Ditolak';
            default:
                return status;
        }
    };

    const tableData = useMemo(() => {
        if (!teamsResponse?.data) return [];

        return teamsResponse.data.map((item) => ({
            id: item.team_id,
            team_name: item.team_name || 'Tanpa Nama',
            school_name: item.school_name || 'Tanpa Sekolah',
            level: item.level || '-',
            submitted_at: item.submitted_at
                ? new Date(item.submitted_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                  })
                : '-', // Key ini bernama 'submitted_at'
            status: getStatusLabel(item.status),
            original_status: item.status,
        }));
    }, [teamsResponse]);

    const fastestTeams = useMemo(() => {
        if (!fastestResponse?.data) return [];
        return fastestResponse.data.map((t) => ({
            team_name: t.teams.team_name || 'Tanpa Nama',
            school_name: t.teams.schools.school_name || '-',
            initials: t.teams.team_name
                ? t.teams.team_name.substring(0, 2).toUpperCase()
                : 'NA',
        }));
    }, [fastestResponse]);

    // Proses Data Level Counts agar sesuai format PieChart { labels: [], values: [] }
    const registrationData = useMemo(() => {
        if (!levelsResponse?.data) {
            return {
                labels: ['Memuat...'],
                values: [0],
            };
        }

        const counts = levelsResponse.data;
        const filteredKeys = Object.keys(counts).filter(
            (key) => key !== 'total'
        );
        const filteredValues = filteredKeys.map((key) => counts[key]);

        return {
            labels: filteredKeys,
            values: filteredValues,
        };
    }, [levelsResponse]);

    const cards = [
        {
            color: 'bg-simbaris-secondary',
            title: 'Tim Terdaftar',
            data: stats?.data?.total || 0,
            leftIcon: <PenTool className="text-white" size={20} />,
            rightIcon: <ExternalLink size={18} className="text-gray-400" />,
            navigateTo: '/tim-terdaftar',
        },
        {
            color: 'bg-simbaris-warning',
            title: 'Tim Butuh Verifikasi',
            data: stats?.data?.pending || 0,
            leftIcon: <PenTool className="text-white" size={20} />,
            rightIcon: <ExternalLink size={18} className="text-gray-400" />,
            navigateTo: '/tim-terdaftar',
        },
        {
            color: 'bg-simbaris-hazard',
            title: 'Tim Butuh Revisi',
            data: stats?.data?.rejected || 0,
            leftIcon: <PenTool className="text-white" size={20} />,
            rightIcon: <ExternalLink size={18} className="text-gray-400" />,
            navigateTo: '/tim-terdaftar',
        },
        {
            color: 'bg-simbaris-success',
            title: 'Tim Terverifikasi',
            data: stats?.data?.verified || 0,
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
        { header: 'Jenjang', accessor: 'level' },
        {
            header: 'Waktu Pendaftaran',
            accessor: 'submitted_at', // PERBAIKAN: Accessor disamakan dengan key di tableData
            sortable: true,
        },
        {
            header: 'Status Pendaftaran',
            accessor: 'status',
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
                            ? [1, 2, 3, 4].map((_, index) => (
                                  <SimpleCardSkeleton key={index} />
                              ))
                            : cards.map((card, index) => (
                                  <SimpleCard
                                      key={index}
                                      color={card.color}
                                      title={card.title}
                                      data={card.data}
                                      leftIcon={card.leftIcon}
                                      rightIcon={card.rightIcon}
                                      navigateTo={card.navigateTo}
                                  />
                              ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-4 bg-white rounded-lg shadow-md p-6 col-span-1 row-span-1 md:col-span-2 md:row-span-3 h-fit">
                            <h3 className="font-bold text-xl">Tim Terdaftar</h3>
                            <div className="flex">
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
                                />
                            </div>

                            {/* Logic Loading UI */}
                            {teamsLoading && !teamsResponse ? (
                                <div className="p-8 text-center text-gray-500">
                                    Memuat data tim...
                                </div>
                            ) : (
                                <div
                                    className={
                                        teamsLoading
                                            ? 'opacity-60 pointer-events-none transition-opacity'
                                            : ''
                                    }
                                >
                                    <Table
                                        columns={columns}
                                        data={tableData}
                                        sortConfig={sortConfig}
                                        onSort={handleSort}
                                    />
                                    <Pagination
                                        currentPage={currentPage}
                                        totalItems={teamsResponse?.count || 0}
                                        itemsPerPage={itemsPerPage}
                                        onPageChange={setCurrentPage}
                                        onItemsPerPageChange={(val) => {
                                            setItemsPerPage(val);
                                            setCurrentPage(1);
                                        }}
                                    />
                                </div>
                            )}

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
