import React, { useMemo, useState } from 'react';
import {
    Search,
    Users,
    Mars,
    Venus,
    X,
    Pencil,
    RotateCcw,
    MoreVertical,
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/Button';
import InputField from '../components/inputs/InputField';
import ComboBox from '../components/inputs/Combobox';
import Avatar from '../components/Avatar';

const summaryConfig = [
    { key: 'total', label: 'Total Anggota', color: 'primary', icon: <Users size={18} className="text-white" /> },
    { key: 'male', label: 'Anggota Laki-Laki', color: 'secondary', icon: <Mars size={18} className="text-white" /> },
    { key: 'female', label: 'Anggota Perempuan', color: 'accent', icon: <Venus size={18} className="text-white" /> },
];

const initialMembers = [
    { name: 'Tri Setiawan Budiono', role: 'L', gender: 'Laki-Laki', classLevel: 'VII', nisn: '123456789', email: 'anggota1@gmail.com', image: '/images/logo_simbaris_default.png' },
    { name: 'Bahrul Human Wibowo', role: 'P', gender: 'Perempuan', classLevel: 'VIII', nisn: '123456789', email: 'anggota2@gmail.com', image: '/images/logo_simbaris_default.png' },
    { name: 'Tri Setiawan Budiono', role: 'L', gender: 'Laki-Laki', classLevel: 'VII', nisn: '123456789', email: 'anggota3@gmail.com', image: '/images/logo_simbaris_default.png' },
    { name: 'Bahrul Human Wibowo', role: 'P', gender: 'Perempuan', classLevel: 'VII', nisn: '123456789', email: 'anggota4@gmail.com', image: '/images/logo_simbaris_default.png' },
    { name: 'Tri Setiawan Budiono', role: 'L', gender: 'Laki-Laki', classLevel: 'VII', nisn: '123456789', email: 'anggota5@gmail.com', image: '/images/logo_simbaris_default.png' },
    { name: 'Bahrul Human Wibowo', role: 'P', gender: 'Perempuan', classLevel: 'VIII', nisn: '123456789', email: 'anggota6@gmail.com', image: '/images/logo_simbaris_default.png' },
    { name: 'Tri Setiawan Budiono', role: 'L', gender: 'Laki-Laki', classLevel: 'VII', nisn: '123456789', email: 'anggota7@gmail.com', image: '/images/logo_simbaris_default.png' },
    { name: 'Bahrul Human Wibowo', role: 'P', gender: 'Perempuan', classLevel: 'VIII', nisn: '123456789', email: 'anggota8@gmail.com', image: '/images/logo_simbaris_default.png' },
    { name: 'Tri Setiawan Budiono', role: 'L', gender: 'Laki-Laki', classLevel: 'VII', nisn: '123456789', email: 'anggota9@gmail.com', image: '/images/logo_simbaris_default.png' },
    { name: 'Bahrul Human Wibowo', role: 'P', gender: 'Perempuan', classLevel: 'VIII', nisn: '123456789', email: 'anggota10@gmail.com', image: '/images/logo_simbaris_default.png' },
    { name: 'Tri Setiawan Budiono', role: 'L', gender: 'Laki-Laki', classLevel: 'VII', nisn: '123456789', email: 'anggota11@gmail.com', image: '/images/logo_simbaris_default.png' },
    { name: 'Bahrul Human Wibowo', role: 'P', gender: 'Perempuan', classLevel: 'VIII', nisn: '123456789', email: 'anggota12@gmail.com', image: '/images/logo_simbaris_default.png' },
];

const TimSayaAnggota = ({ isSidebarOpen }) => {
    const [filters, setFilters] = useState({ search: '', gender: '', classLevel: '' });
    const [selectedMember, setSelectedMember] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [memberData, setMemberData] = useState(initialMembers[0]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const filteredMembers = useMemo(() => {
        return initialMembers.filter((m) => {
            const matchSearch = filters.search
                ? m.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                  m.nisn.includes(filters.search)
                : true;
            const matchGender = filters.gender ? m.gender === filters.gender : true;
            const matchClass = filters.classLevel ? m.classLevel === filters.classLevel : true;
            return matchSearch && matchGender && matchClass;
        });
    }, [filters]);

    const pageCount = Math.max(1, Math.ceil(filteredMembers.length / pageSize));
    const currentPage = Math.min(page, pageCount);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedMembers = filteredMembers.slice(startIndex, startIndex + pageSize);

    const summaryCounts = useMemo(() => {
        const total = filteredMembers.length;
        const male = filteredMembers.filter((m) => m.gender === 'Laki-Laki').length;
        const female = filteredMembers.filter((m) => m.gender === 'Perempuan').length;
        return { total, male, female };
    }, [filteredMembers]);

    const openDetail = (member) => {
        setMemberData(member);
        setSelectedMember(member);
        setIsEditing(false);
    };

    const handlePageChange = (nextPage) => {
        if (nextPage < 1 || nextPage > pageCount) return;
        setPage(nextPage);
    };

    const handleFieldChange = (key) => (eOrValue) => {
        const value = eOrValue?.target ? eOrValue.target.value : eOrValue;
        setMemberData((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="flex bg-simbaris-primary-lightest/50">
            <div
                className={`w-full min-h-screen overflow-hidden pt-16 ${
                    isSidebarOpen ? 'md:ml-64' : 'ml-0'
                } transition-all duration-300`}
            >
                <div className="flex flex-col gap-4 p-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-simbaris-text font-semibold text-3xl">
                            Tim Saya
                        </h1>
                        <Breadcrumbs />
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-simbaris-primary-light/40 p-6 space-y-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-semibold text-simbaris-text">
                                    Daftar Anggota Tim
                                </h2>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button
                                    text="Edit"
                                    size="default"
                                    color="accent"
                                    leftIcon={<Pencil size={16} />}
                                    round="half"
                                />
                                <Button
                                    text="Atur Ulang Anggota"
                                    size="default"
                                    color="hazard"
                                    leftIcon={<RotateCcw size={16} />}
                                    round="half"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {summaryConfig.map((card) => (
                                <div
                                    key={card.key}
                                    className="flex items-center bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                                >
                                    <div
                                        className={`h-full w-16 flex items-center justify-center ${
                                            card.color === 'primary'
                                                ? 'bg-simbaris-primary'
                                                : card.color === 'secondary'
                                                ? 'bg-simbaris-secondary'
                                                : 'bg-simbaris-accent'
                                        }`}
                                    >
                                        {card.icon}
                                    </div>
                                    <div className="flex-1 px-4 py-3">
                                        <div className="text-sm font-semibold text-simbaris-text">
                                            {card.label}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {summaryCounts[card.key]} Orang
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
                            <div className="w-full">
                                <label className="text-sm font-semibold text-simbaris-text">
                                    Cari Anggota
                                </label>
                                <div className="mt-1 flex items-center w-full rounded-lg border border-gray-300 px-3 py-2 bg-white shadow-sm h-11">
                                    <Search className="text-gray-500" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Cari anggota..."
                                        value={filters.search}
                                        onChange={(e) =>
                                            setFilters((prev) => ({ ...prev, search: e.target.value }))
                                        }
                                        className="flex-1 ml-2 focus:outline-none text-sm"
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <ComboBox
                                    label="Jenis Kelamin"
                                    options={['Laki-Laki', 'Perempuan']}
                                    value={filters.gender}
                                    onSelect={(val) =>
                                        setFilters((prev) => ({ ...prev, gender: val }))
                                    }
                                />
                            </div>
                            <div className="w-full">
                                <ComboBox
                                    label="Kelas"
                                    options={['VII', 'VIII', 'IX']}
                                    value={filters.classLevel}
                                    onSelect={(val) =>
                                        setFilters((prev) => ({ ...prev, classLevel: val }))
                                    }
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-xl border border-simbaris-primary-light/50 shadow-sm">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="bg-simbaris-primary text-white">
                                        <th className="px-4 py-3 text-left font-semibold">Nama</th>
                                        <th className="px-4 py-3 text-left font-semibold">T/L</th>
                                        <th className="px-4 py-3 text-left font-semibold">
                                            Jenis Kelamin
                                        </th>
                                        <th className="px-4 py-3 text-left font-semibold">Kelas</th>
                                        <th className="px-4 py-3 text-left font-semibold">NISN</th>
                                        <th className="px-4 py-3 text-left font-semibold">Email</th>
                                        <th className="px-4 py-3 text-left font-semibold">Detail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedMembers.map((member, idx) => (
                                        <tr
                                            key={`${member.name}-${idx}`}
                                            className={`${
                                                idx % 2 === 0
                                                    ? 'bg-white'
                                                    : 'bg-simbaris-primary-lightest/60'
                                            } border-t border-gray-100`}
                                        >
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <Avatar
                                                        name={member.name}
                                                        initials={member.name[0]}
                                                        imageUrl=""
                                                    />
                                                    <span className="font-semibold text-simbaris-text">
                                                        {member.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">{member.role}</td>
                                            <td className="px-4 py-3">{member.gender}</td>
                                            <td className="px-4 py-3">{member.classLevel}</td>
                                            <td className="px-4 py-3">{member.nisn}</td>
                                            <td className="px-4 py-3">{member.email}</td>
                                            <td className="px-4 py-3">
                                                <button
                                                    onClick={() => openDetail(member)}
                                                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 border border-gray-200 text-gray-500"
                                                    aria-label="Detail anggota"
                                                >
                                                    <MoreVertical size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-600">
                            <span>
                                {startIndex + 1}-{Math.min(startIndex + pageSize, filteredMembers.length)} of {filteredMembers.length}
                            </span>
                            <div className="flex items-center gap-2">
                                <ComboBox
                                    options={['5', '10', '20']}
                                    value={String(pageSize)}
                                    onSelect={(val) => {
                                        const nextSize = Number(val) || 10;
                                        setPageSize(nextSize);
                                        setPage(1);
                                    }}
                                    className="w-24"
                                />
                                <div className="flex items-center gap-1">
                                    <Button
                                        text="< Back"
                                        size="default"
                                        type="secondary"
                                        color="secondary"
                                        round="half"
                                        disabled={currentPage === 1}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    />
                                    <Button
                                        text={String(currentPage)}
                                        size="default"
                                        color="primary"
                                        round="half"
                                    />
                                    {currentPage < pageCount && (
                                        <Button
                                            text={String(currentPage + 1)}
                                            size="default"
                                            type="secondary"
                                            color="secondary"
                                            round="half"
                                            onClick={() => handlePageChange(currentPage + 1)}
                                        />
                                    )}
                                    <Button
                                        text="Next >"
                                        size="default"
                                        type="secondary"
                                        color="secondary"
                                        round="half"
                                        disabled={currentPage === pageCount}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {selectedMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 relative">
                        <button
                            onClick={() => setSelectedMember(null)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-simbaris-text"
                            aria-label="Close detail anggota"
                        >
                            <X size={20} />
                        </button>
                        <h3 className="text-lg font-semibold text-simbaris-text mb-4">
                            Detail Anggota
                        </h3>

                        {!isEditing ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-2 space-y-3">
                                    {[
                                        ['Nama', selectedMember.name],
                                        ['Nama Tim', 'Specta Squad'],
                                        ['Asal Sekolah', 'SMP Negeri 18 Balikpapan'],
                                        ['Jenjang Sekolah', 'SMP/MTs Sederajat'],
                                        ['Kelas', selectedMember.classLevel],
                                        ['NISN', selectedMember.nisn],
                                        ['Jenis Kelamin', selectedMember.gender],
                                        ['Email', selectedMember.email],
                                    ].map(([label, value]) => (
                                        <div
                                            key={label}
                                            className="flex items-center border-b border-gray-200 pb-2 text-sm"
                                        >
                                            <span className="text-gray-700 min-w-[140px]">{label}</span>
                                            <div className="flex-1 h-px bg-gray-200 mx-3" />
                                            <span className="font-semibold text-simbaris-text">
                                                {value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-200">
                                        <img
                                            src={selectedMember.image}
                                            alt={selectedMember.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <Button
                                        text="Lihat Gambar"
                                        size="default"
                                        type="secondary"
                                        color="secondary"
                                        round="half"
                                    />
                                    <div className="flex gap-3">
                                    <Button
                                            text="Edit"
                                            size="default"
                                            color="warning"
                                            round="half"
                                            onClick={() => setIsEditing(true)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                                    <div className="md:col-span-2 grid grid-cols-1 gap-3">
                                        <InputField
                                            label="Nama"
                                            value={memberData.name}
                                            onChange={handleFieldChange('name')}
                                        />
                                        <ComboBox
                                            label="Kelas"
                                            options={['VII', 'VIII', 'IX']}
                                            value={memberData.classLevel}
                                            onSelect={handleFieldChange('classLevel')}
                                        />
                                        <InputField
                                            label="NISN"
                                            value={memberData.nisn}
                                            onChange={handleFieldChange('nisn')}
                                        />
                                        <ComboBox
                                            label="Jenis Kelamin"
                                            options={['Laki-Laki', 'Perempuan']}
                                            value={memberData.gender}
                                            onSelect={handleFieldChange('gender')}
                                        />
                                        <InputField
                                            label="Email"
                                            value={memberData.email}
                                            onChange={handleFieldChange('email')}
                                        />
                                    </div>
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-200">
                                            <img
                                                src={memberData.image}
                                                alt={memberData.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3 mt-2">
                                    <Button
                                        text="Batal"
                                        type="secondary"
                                        color="hazard"
                                        round="half"
                                        size="default"
                                        className="px-6 min-w-[100px]"
                                        onClick={() => setIsEditing(false)}
                                    />
                                    <Button
                                        text="Simpan"
                                        color="success"
                                        round="half"
                                        size="default"
                                        className="px-6 min-w-[100px]"
                                        onClick={() => setIsEditing(false)}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimSayaAnggota;
