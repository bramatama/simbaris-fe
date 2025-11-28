import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { SearchIcon } from 'lucide-react';


import Table from '../../Table';
import Button from '../../Button';
import InputField from '../../inputs/InputField';
import Pagination from '../../Pagination';

const MyMemberPanel = ({ myMemberData }) => {
    const [memberData] = useState(myMemberData);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'asc',
    });

    const filteredData = useMemo(() => {
        return memberData.filter(
            (member) => {
                const matchSearch =
                    member.member_name
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    member.email.toLowerCase().includes(search.toLowerCase());
                return matchSearch;
            },
            [memberData, search]
        );
    });

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

    const columns = [
        {
            header: 'Nama',
            accessor: 'member_name',
            sortable: true,
            cellClassName: 'text-gray-900 font-medium',
        },
        { header: 'Jenis Kelamin', accessor: 'gender' },
        { header: 'Kelas', accessor: 'member_grade', sortable: true },
        { header: 'NISN', accessor: 'nisn', sortable: true },
        { header: 'Email', accessor: 'email' },
    ];

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-simbaris-text">
                Data Saya
            </h2>
            <div className="flex">
                <InputField
                    leftIcon={
                        <SearchIcon size={18} className="text-gray-400" />
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
                <Link to="/tim-saya/anggota">
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
    );
};

export default MyMemberPanel;
