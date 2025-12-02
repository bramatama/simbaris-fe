import { useState, useMemo } from 'react';
import { PenTool, ExternalLink, SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import Button from '../../components/Button';
import PieChart from '../../components/panitia/dashboard_panitia/PieChart';
import FastestRegistrantsPanel from '../../components/panitia/dashboard_panitia/FastestRegistrationPanel';
import SimpleCard from '../../components/SimpleCards';
import Table from '../../components/Table';
import InputField from '../../components/inputs/InputField';

import registrantList from '../../dummy/registrantList';
import Pagination from '../../components/Pagination';

const DashboardPanitia = ({ isSidebarOpen }) => {
    const [registrantData] = useState(registrantList);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [search, setSearch] = useState('');

    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'asc',
    });

    // Data Dummy untuk jumlah pendaftar
    const registrationData = {
        labels: ['SD / MI', 'SMP / MTs', 'SMA / SMK / MA'],
        values: [5, 5, 5],
    };

    const filteredData = useMemo(() => {
        return registrantData.filter((item) => {
            const matchSearch =
                item.team.toLowerCase().includes(search.toLowerCase()) ||
                item.school.toLowerCase().includes(search.toLowerCase());
            return matchSearch;
        });
    }, [registrantData, search]);

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

    // Data Dummy untuk pendaftar tercepat
    const fastestTeams = [
        { name: 'Garuda Muda', school: 'SMA Negeri 1', initials: 'GM' },
        { name: 'Elang Perkasa', school: 'SMP Bintang Timur', initials: 'EP' },
        { name: 'Macan Putih', school: 'SMA Harapan Bangsa', initials: 'MP' },
    ];

    const cards = [
        {
            color: 'bg-simbaris-secondary',
            title: 'Tim Terdaftar',
            data: '15 Data',
            leftIcon: <PenTool className="text-white" size={20} />,
            rightIcon: <ExternalLink size={18} className="text-gray-400" />,
            navigateTo: '/tim-terdaftar',
        },
        {
            color: 'bg-simbaris-warning',
            title: 'Tim Butuh Verifikasi',
            data: '8 Data',
            leftIcon: <PenTool className="text-white" size={20} />,
            rightIcon: <ExternalLink size={18} className="text-gray-400" />,
            navigateTo: '/tim-terdaftar',
        },
        {
            color: 'bg-simbaris-hazard',
            title: 'Tim Butuh Revisi',
            data: '2 Data',
            leftIcon: <PenTool className="text-white" size={20} />,
            rightIcon: <ExternalLink size={18} className="text-gray-400" />,
            navigateTo: '/tim-terdaftar',
        },
        {
            color: 'bg-simbaris-success',
            title: 'Tim Terverifikasi',
            data: '5 Data',
            leftIcon: <PenTool className="text-white" size={20} />,
            rightIcon: <ExternalLink size={18} className="text-gray-400" />,
            navigateTo: '/tim-terdaftar',
        },
    ];

    const columns = [
        {
            header: 'Nama Tim',
            accessor: 'team',
            sortable: true,
            cellClassName: 'text-gray-900 font-medium',
        },
        { header: 'Nama Sekolah', accessor: 'school', sortable: true },
        { header: 'Jenjang', accessor: 'level' },
        {
            header: 'Waktu Pendaftaran',
            accessor: 'submitted_at',
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
                        {cards.map((card, index) => (
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
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari Tim atau Sekolah..."
                                    className="h-11"
                                />
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
                                        teams={fastestTeams}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white flex flex-col items-center rounded-lg shadow-md py-4 px-6 md:row-span-2">
                            <div className="h-full w-full max-w-[350px] p-4">
                                <PieChart
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
