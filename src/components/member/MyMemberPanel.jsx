import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ExternalLink, MoreVertical, SearchIcon } from 'lucide-react';

import Table from '../Table';
import Button from '../Button';
import InputField from '../inputs/InputField';
import Pagination from '../Pagination';
import FilterDropdown from '../FilterDropdown';
import MemberModal from '../MemberModal';

const MyMemberPanel = ({ myMemberData, userRole }) => {
    const isMemberPage = location.pathname === '/tim-saya/anggota';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    const [memberData] = useState(myMemberData);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(isMemberPage ? 10 : 5);
    const [filters, setFilters] = useState({ gender: '', member_grade: '' });
    const [search, setSearch] = useState('');
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'asc',
    });

    const genderOptions = useMemo(() => {
        const unique = Array.from(
            new Set(memberData.map((item) => item.gender))
        );
        return [...unique.map((item) => ({ value: item, label: item }))];
    }, [memberData]);

    const memberGradeOptions = useMemo(() => {
        const unique = Array.from(
            new Set(memberData.map((item) => item.member_grade))
        );
        return [...unique.map((item) => ({ value: item, label: item }))];
    }, [memberData]);

    useEffect(() => {
        setItemsPerPage(isMemberPage ? 10 : 5);
        setCurrentPage(1); // Reset ke halaman 1 saat mode berubah
    }, [isMemberPage]);

    const filteredData = useMemo(() => {
        return memberData.filter(
            (member) => {
                const matchSearch =
                    member.member_name
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    member.email
                        .toLowerCase()
                        .split('@')[0]
                        .includes(search.toLowerCase());
                const matchGender = filters.gender
                    ? member.gender === filters.gender
                    : true;
                const matchMemberGrade = filters.member_grade
                    ? member.member_grade === filters.member_grade
                    : true;
                return matchSearch && matchGender && matchMemberGrade;
            },
            [memberData, filters, search]
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

    const columns = useMemo(() => {
        const cols = [
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

        if (isMemberPage) {
            cols.push({
                header: 'Detail',
                accessor: 'actions',
                className: 'text-center',
                cellClassName: 'text-center',
                render: (row) => (
                    <button
                        onClick={() => handleViewDetail(row)}
                        className="text-gray-400 hover:text-blue-600 transition-colors inline-block p-1 rounded-full hover:bg-blue-50"
                    >
                        <MoreVertical size={18} />
                    </button>
                ),
            });
        }

        return cols;
    }, [isMemberPage]);

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
            return updated;
        });
        setCurrentPage(1);
    };

    const handleViewDetail = (row) => {
        const mappedData = {
            ...row,
            member_name: row.member_name,
            team_name: row.team_name,
            school_name: row.school_name,
            level: row.level,
            member_grade: row.member_grade,
            nisn: row.nisn,
            gender: row.gender,
            email: row.email,
        };

        setSelectedMember(mappedData);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMember(null);
    };

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-simbaris-text">
                Daftar Anggota
            </h2>
            <div className="flex flex-col lg:flex-row gap-4">
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
                {isMemberPage && (
                    <div className="flex flex-wrap gap-2">
                        <FilterDropdown
                            label="Jenis Kelamin"
                            options={genderOptions}
                            value={filters.gender}
                            onChange={(val) =>
                                handleFilterChange('gender', val)
                            }
                        />
                        <FilterDropdown
                            label="Kelas"
                            options={memberGradeOptions}
                            value={filters.member_grade}
                            onChange={(val) =>
                                handleFilterChange('member_grade', val)
                            }
                        />
                    </div>
                )}
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
            {!isMemberPage && (
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
            )}
            <MemberModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                memberData={selectedMember}
                title="Detail Anggota"
                userRole={userRole}
            />
        </div>
    );
};

export default MyMemberPanel;
