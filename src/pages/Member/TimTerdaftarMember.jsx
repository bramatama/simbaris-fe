import { useState, useMemo, useEffect } from 'react';
import { GraduationCapIcon, Users, SearchIcon } from 'lucide-react';
import SimpleCard from '../../components/SimpleCards';
import InputField from '../../components/inputs/InputField';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import FilterDropdown from '../../components/FilterDropdown';
import {team_service} from '../../services/team_service';

const TimTerdaftarMember = ({ isSidebarOpen = true }) => {
    const [teamData, setTeamData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [loadingTable, setLoadingTable] = useState(false);
    const [errorTable, setErrorTable] = useState(null);

    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        level: '',
        province: '',
        city: '',
        subdistrict: '',
        status: '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({
        key: 'created_at', // Default sort
        direction: 'asc',
    });

    const [stats, setStats] = useState({
        total: 0,
        sma: 0,
        smp: 0,
        sd: 0,
    });
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoadingStats(true);
            try {
                const counts = await team_service.getLevelCounts();
                setStats({
                    total: counts.total || 0,
                    sma: counts.senior_high || 0,
                    smp: counts.junior_high || 0,
                    sd: counts.elementary || 0,
                });
            } catch (error) {
                console.error('Gagal memuat statistik jenjang.', error);
            } finally {
                setLoadingStats(false);
            }
        };
        fetchStats();
    }, []);

    // Effect untuk mengambil data tabel
    useEffect(() => {
        const fetchTeams = async () => {
            setLoadingTable(true);
            setErrorTable(null);
            try {
                const params = {
                    page: currentPage,
                    limit: itemsPerPage,
                    search: search,
                    level: filters.level,
                    province: filters.province,
                    city: filters.city,
                    subdistrict: filters.subdistrict,
                    status: filters.status,
                    sortBy: sortConfig.key,
                    order: sortConfig.direction,
                };

                // Hapus parameter yang kosong agar URL lebih bersih
                Object.keys(params).forEach(
                    (key) =>
                        (params[key] === '' || params[key] === null) &&
                        delete params[key]
                );

                const response = await team_service.getAllTeams(params);
                setTeamData(response.data || []);
                setTotalItems(response.total || 0);
            } catch (err) {
                setErrorTable('Gagal memuat daftar tim.');
                console.error(err);
            } finally {
                setLoadingTable(false);
            }
        };

        // Debounce search input
        const timer = setTimeout(() => {
            fetchTeams();
        }, 500); // Tunda request 500ms setelah user berhenti mengetik

        return () => clearTimeout(timer);
    }, [currentPage, itemsPerPage, filters, search, sortConfig]);

    const levelOptions = useMemo(() => {
        const unique = Array.from(new Set(teamData.map((d) => d.level)));
        return [
            ...unique.map((item) => ({
                label: item,
                value: item,
            })),
        ];
    }, [teamData]);

    const provinceOptions = useMemo(() => {
        const unique = Array.from(new Set(teamData.map((d) => d.province)));
        return [...unique.map((item) => ({ label: item, value: item }))];
    }, [teamData]);

    const cityOptions = useMemo(() => {
        const filtered = filters.province
            ? teamData.filter((d) => d.province === filters.province)
            : teamData;

        const unique = Array.from(new Set(filtered.map((d) => d.city)));

        return [...unique.map((item) => ({ label: item, value: item }))];
    }, [teamData, filters.province]);

    const districtOptions = useMemo(() => {
        let filtered = teamData;

        if (filters.province) {
            filtered = filtered.filter((d) => d.province === filters.province);
        }
        if (filters.city) {
            filtered = filtered.filter((d) => d.city === filters.city);
        }

        const unique = Array.from(new Set(filtered.map((d) => d.subdistrict)));

        return [...unique.map((item) => ({ label: item, value: item }))];
    }, [teamData, filters.province, filters.city]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleFilterChange = (key, value) => {
        setFilters((prev) => {
            let updated = { ...prev, [key]: value };

            if (key === 'province') {
                updated.city = '';
                updated.subdistrict = '';
            }

            if (key === 'city') {
                updated.subdistrict = '';
            }

            return updated;
        });

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
        { header: 'Jenjang', accessor: 'level' },
        { header: 'Provinsi', accessor: 'province' },
        { header: 'Kota', accessor: 'city' },
        { header: 'Kecamatan', accessor: 'subdistrict' },
    ];

    const cards = [
        {
            color: 'bg-simbaris-accent',
            title: 'Tim Terdaftar',
            data: loadingStats ? 'Memuat...' : `${stats.total} Tim`,
            leftIcon: <Users className="text-white" size={20} />,
        },
        {
            color: 'bg-gray-500',
            title: 'SMA/SMK/MA Sederajat',
            data: loadingStats ? 'Memuat...' : `${stats.sma} Tim`,
            leftIcon: <GraduationCapIcon className="text-white" size={20} />,
        },
        {
            color: 'bg-simbaris-secondary',
            title: 'SMP/MTs Sederajat',
            data: loadingStats ? 'Memuat...' : `${stats.smp} Tim`,
            leftIcon: <GraduationCapIcon className="text-white" size={20} />,
        },
        {
            color: 'bg-simbaris-hazard',
            title: 'SD/MI Sederajat',
            data: loadingStats ? 'Memuat...' : `${stats.sd} Tim`,
            leftIcon: <GraduationCapIcon className="text-white" size={20} />,
        },
    ];

    return (
        <div className="flex bg-gray-100">
            <div
                className={`w-full min-h-screen overflow-hidden pt-16 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'} transition-all duration-300`}
            >
                <div className="flex flex-col gap-4 p-6">
                    {/* header */}
                    <header className="text-simbaris-text font-semibold text-3xl">
                        Tim Terdaftar
                    </header>

                    <div className="hidden xl:flex gap-4 mb-4">
                        {cards.map((card, index) => (
                            <SimpleCard key={index} {...card} />
                        ))}
                    </div>

                    <div className="flex flex-col gap-4 bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-simbaris-text">
                            Daftar Tim
                        </h2>

                        {/* search + filters */}
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
                                    options={[
                                        { label: 'Pending', value: 'pending' },
                                        { label: 'Verified', value: 'verified' },
                                        { label: 'Rejected', value: 'rejected' },
                                    ]}
                                    value={filters.status}
                                    onChange={(val) => handleFilterChange('status', val)}
                                />
                                <FilterDropdown
                                    label="Provinsi"
                                    options={provinceOptions}
                                    value={filters.province}
                                    onChange={(val) =>
                                        handleFilterChange('province', val)
                                    }
                                />
                                <FilterDropdown
                                    label="Kota"
                                    options={cityOptions}
                                    value={filters.city}
                                    onChange={(val) =>
                                        handleFilterChange('city', val)
                                    }
                                />
                                <FilterDropdown
                                    label="Kecamatan"
                                    options={districtOptions}
                                    value={filters.subdistrict}
                                    onChange={(val) => handleFilterChange('subdistrict', val)}
                                />
                            </div>
                        </div>

                        {errorTable && <p className="text-center text-red-500">{errorTable}</p>}
                        <Table
                            columns={columns}
                            data={teamData}
                            sortConfig={sortConfig}
                            onSort={handleSort}
                            isLoading={loadingTable}
                        />

                        {/* footer pagination */}
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
            </div>
        </div>
    );
};

export default TimTerdaftarMember;
