import { useState, useMemo } from 'react';
import { GraduationCapIcon, Users, SearchIcon } from 'lucide-react';
import SimpleCard from '../../components/SimpleCards';
import InputField from '../../components/inputs/InputField';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import FilterDropdown from '../../components/FilterDropdown';
import registrantList from '../../dummy/registrantList';

const TimTerdaftarMember = ({ isSidebarOpen = true }) => {
    const [data] = useState(registrantList);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        level: '',
        province: '',
        city: '',
        district: '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'asc',
    });

    const stats = useMemo(() => {
        const counts = { total: data.length, sma: 0, smp: 0, sd: 0 };
        data.forEach((item) => {
            if (item.level === 'SMA/SMK/MA Sederajat') counts.sma++;
            else if (item.level === 'SMP/MTs Sederajat') counts.smp++;
            else if (item.level === 'SD/MI Sederajat') counts.sd++;
        });
        return counts;
    }, [data]);

    const levelOptions = useMemo(() => {
        const unique = Array.from(new Set(data.map((d) => d.level)));
        return [
            ...unique.map((item) => ({
                label: item,
                value: item,
            })),
        ];
    }, [data]);

    const provinceOptions = useMemo(() => {
        const unique = Array.from(new Set(data.map((d) => d.province)));
        return [...unique.map((item) => ({ label: item, value: item }))];
    }, [data]);

    const cityOptions = useMemo(() => {
        const filtered = filters.province
            ? data.filter((d) => d.province === filters.province)
            : data;

        const unique = Array.from(new Set(filtered.map((d) => d.city)));

        return [...unique.map((item) => ({ label: item, value: item }))];
    }, [data, filters.province]);

    const districtOptions = useMemo(() => {
        let filtered = data;

        if (filters.province) {
            filtered = filtered.filter((d) => d.province === filters.province);
        }
        if (filters.city) {
            filtered = filtered.filter((d) => d.city === filters.city);
        }

        const unique = Array.from(new Set(filtered.map((d) => d.district)));

        return [...unique.map((item) => ({ label: item, value: item }))];
    }, [data, filters.province, filters.city]);

    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const matchSearch =
                item.team.toLowerCase().includes(search.toLowerCase()) ||
                item.level.toLowerCase().includes(search.toLowerCase()) ||
                item.school.toLowerCase().includes(search.toLowerCase()) ||
                item.city.toLowerCase().includes(search.toLowerCase()) ||
                item.province.toLowerCase().includes(search.toLowerCase()) ||
                item.district.toLowerCase().includes(search.toLowerCase());
            const matchLevel = filters.level
                ? item.level === filters.level
                : true;
            const matchProvince = filters.province
                ? item.province === filters.province
                : true;
            const matchCity = filters.city ? item.city === filters.city : true;
            const matchDistrict = filters.district
                ? item.district === filters.district
                : true;
            return (
                matchSearch &&
                matchLevel &&
                matchProvince &&
                matchCity &&
                matchDistrict
            );
        });
    }, [data, search, filters]);

    const sortedData = useMemo(() => {
        let sortableItems = [...filteredData];
        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
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
                updated.district = '';
            }

            if (key === 'city') {
                updated.district = '';
            }

            return updated;
        });

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
        { header: 'Provinsi', accessor: 'province', sortable: true },
        { header: 'Kota', accessor: 'city', sortable: true },
        { header: 'Kecamatan', accessor: 'district', sortable: true },
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
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h1 className="text-xl font-bold text-gray-900">
                                Daftar Tim
                            </h1>
                        </div>

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
                                    value={filters.district}
                                    onChange={(val) =>
                                        handleFilterChange('district', val)
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

                        {/* footer pagination */}
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

export default TimTerdaftarMember;
