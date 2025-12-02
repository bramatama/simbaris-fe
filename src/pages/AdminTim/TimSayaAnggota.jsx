import React, { useMemo, useRef, useState } from 'react';
import {
    Search,
    Users,
    Mars,
    Venus,
    X,
    Pencil,
    RotateCcw,
    MoreVertical,
    Check,
    UploadCloud,
} from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs';
import Button from '../../components/Button';
import InputField from '../../components/inputs/InputField';
import ComboBox from '../../components/inputs/Combobox';
import Avatar from '../../components/Avatar';

const summaryConfig = [
    {
        key: 'total',
        label: 'Total Anggota',
        color: 'primary',
        icon: <Users size={18} className="text-white" />,
    },
    {
        key: 'male',
        label: 'Anggota Laki-Laki',
        color: 'secondary',
        icon: <Mars size={18} className="text-white" />,
    },
    {
        key: 'female',
        label: 'Anggota Perempuan',
        color: 'accent',
        icon: <Venus size={18} className="text-white" />,
    },
];

const initialMembers = [
    {
        name: 'Tri Setiawan Budiono',
        role: 'L',
        gender: 'Laki-Laki',
        classLevel: 'VII',
        nisn: '123456789',
        email: 'anggota1@gmail.com',
        image: '/images/logo_simbaris_default.png',
    },
    {
        name: 'Bahrul Human Wibowo',
        role: 'P',
        gender: 'Perempuan',
        classLevel: 'VIII',
        nisn: '123456789',
        email: 'anggota2@gmail.com',
        image: '/images/logo_simbaris_default.png',
    },
    {
        name: 'Tri Setiawan Budiono',
        role: 'L',
        gender: 'Laki-Laki',
        classLevel: 'VII',
        nisn: '123456789',
        email: 'anggota3@gmail.com',
        image: '/images/logo_simbaris_default.png',
    },
    {
        name: 'Bahrul Human Wibowo',
        role: 'P',
        gender: 'Perempuan',
        classLevel: 'VII',
        nisn: '123456789',
        email: 'anggota4@gmail.com',
        image: '/images/logo_simbaris_default.png',
    },
    {
        name: 'Tri Setiawan Budiono',
        role: 'L',
        gender: 'Laki-Laki',
        classLevel: 'VII',
        nisn: '123456789',
        email: 'anggota5@gmail.com',
        image: '/images/logo_simbaris_default.png',
    },
    {
        name: 'Bahrul Human Wibowo',
        role: 'P',
        gender: 'Perempuan',
        classLevel: 'VIII',
        nisn: '123456789',
        email: 'anggota6@gmail.com',
        image: '/images/logo_simbaris_default.png',
    },
    {
        name: 'Tri Setiawan Budiono',
        role: 'L',
        gender: 'Laki-Laki',
        classLevel: 'VII',
        nisn: '123456789',
        email: 'anggota7@gmail.com',
        image: '/images/logo_simbaris_default.png',
    },
    {
        name: 'Bahrul Human Wibowo',
        role: 'P',
        gender: 'Perempuan',
        classLevel: 'VIII',
        nisn: '123456789',
        email: 'anggota8@gmail.com',
        image: '/images/logo_simbaris_default.png',
    },
    {
        name: 'Tri Setiawan Budiono',
        role: 'L',
        gender: 'Laki-Laki',
        classLevel: 'VII',
        nisn: '123456789',
        email: 'anggota9@gmail.com',
        image: '/images/logo_simbaris_default.png',
    },
    {
        name: 'Bahrul Human Wibowo',
        role: 'P',
        gender: 'Perempuan',
        classLevel: 'VIII',
        nisn: '123456789',
        email: 'anggota10@gmail.com',
        image: '/images/logo_simbaris_default.png',
    },
    {
        name: 'Tri Setiawan Budiono',
        role: 'L',
        gender: 'Laki-Laki',
        classLevel: 'VII',
        nisn: '123456789',
        email: 'anggota11@gmail.com',
        image: '/images/logo_simbaris_default.png',
    },
    {
        name: 'Bahrul Human Wibowo',
        role: 'P',
        gender: 'Perempuan',
        classLevel: 'VIII',
        nisn: '123456789',
        email: 'anggota12@gmail.com',
        image: '/images/logo_simbaris_default.png',
    },
];

const TimSayaAnggota = ({ isSidebarOpen }) => {
    const [filters, setFilters] = useState({
        search: '',
        gender: '',
        classLevel: '',
    });
    const [selectedMember, setSelectedMember] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [memberData, setMemberData] = useState(initialMembers[0]);
    const [isResetMode, setIsResetMode] = useState(false);
    const [resetMembers, setResetMembers] = useState(initialMembers);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadFile, setUploadFile] = useState(null);
    const [uploadPreview, setUploadPreview] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const emptyMember = {
        name: '',
        role: '',
        gender: '',
        classLevel: '',
        nisn: '',
        email: '',
        image: '',
    };
    const uploadInputRef = useRef(null);

    const filteredMembers = useMemo(() => {
        return initialMembers.filter((m) => {
            const matchSearch = filters.search
                ? m.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                  m.nisn.includes(filters.search)
                : true;
            const matchGender = filters.gender
                ? m.gender === filters.gender
                : true;
            const matchClass = filters.classLevel
                ? m.classLevel === filters.classLevel
                : true;
            return matchSearch && matchGender && matchClass;
        });
    }, [filters]);

    const pageCount = Math.max(1, Math.ceil(filteredMembers.length / pageSize));
    const currentPage = Math.min(page, pageCount);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedMembers = filteredMembers.slice(
        startIndex,
        startIndex + pageSize
    );

    const summaryCounts = useMemo(() => {
        const total = filteredMembers.length;
        const male = filteredMembers.filter(
            (m) => m.gender === 'Laki-Laki'
        ).length;
        const female = filteredMembers.filter(
            (m) => m.gender === 'Perempuan'
        ).length;
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

    const handleResetFieldChange = (index, key) => (eOrValue) => {
        const value = eOrValue?.target ? eOrValue.target.value : eOrValue;
        setResetMembers((prev) => {
            const next = [...prev];
            next[index] = { ...next[index], [key]: value };
            return next;
        });
    };

    const enterResetMode = () => {
        setIsResetMode(true);
        setSelectedMember(null);
        setIsEditing(false);
        setResetMembers(initialMembers);
    };

    const exitResetMode = () => {
        setIsResetMode(false);
    };

    const addResetMember = () => {
        setResetMembers((prev) => [...prev, { ...emptyMember }]);
    };

    const removeResetMember = () => {
        setResetMembers((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
    };

    const handleUploadFile = (file) => {
        if (!file) return;
        setUploadFile(file);
        if (file.type.startsWith('image/')) {
            setUploadPreview(URL.createObjectURL(file));
        } else {
            setUploadPreview('');
        }
    };

    const handleUploadChange = (e) => {
        const file = e.target.files?.[0];
        handleUploadFile(file);
    };

    const handleUploadDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer?.files?.[0];
        handleUploadFile(file);
    };

    const closeUploadModal = () => {
        setShowUploadModal(false);
        setUploadFile(null);
        setUploadPreview('');
        if (uploadInputRef.current) {
            uploadInputRef.current.value = '';
        }
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
                                    {isResetMode
                                        ? 'Atur Ulang Anggota Tim'
                                        : 'Daftar Anggota Tim'}
                                </h2>
                            </div>
                            {!isResetMode && (
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
                                        onClick={enterResetMode}
                                    />
                                </div>
                            )}
                        </div>

                        {isResetMode ? (
                            <div className="space-y-5">
                                <div className="space-y-4">
                                    {resetMembers.map((member, idx) => (
                                        <div
                                            key={`${member.nisn}-${idx}`}
                                            className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white space-y-3"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="text-base font-semibold text-simbaris-text">
                                                    Anggota {idx + 1}
                                                </div>
                                                {idx ===
                                                    resetMembers.length - 1 &&
                                                    resetMembers.length > 1 && (
                                                        <button
                                                            type="button"
                                                            className="text-[#c44536] text-sm font-semibold hover:underline"
                                                            onClick={
                                                                removeResetMember
                                                            }
                                                        >
                                                            - Anggota
                                                        </button>
                                                    )}
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <InputField
                                                    label="Nama Lengkap"
                                                    placeholder="Masukkan Nama Lengkap"
                                                    value={member.name}
                                                    onChange={handleResetFieldChange(
                                                        idx,
                                                        'name'
                                                    )}
                                                />
                                                <InputField
                                                    label="NISN"
                                                    placeholder="Masukkan NISN"
                                                    value={member.nisn}
                                                    onChange={handleResetFieldChange(
                                                        idx,
                                                        'nisn'
                                                    )}
                                                />
                                                <ComboBox
                                                    label="Jenis Kelamin"
                                                    options={[
                                                        'Laki-Laki',
                                                        'Perempuan',
                                                    ]}
                                                    value={member.gender}
                                                    onSelect={handleResetFieldChange(
                                                        idx,
                                                        'gender'
                                                    )}
                                                />
                                                <ComboBox
                                                    label="Kelas"
                                                    options={[
                                                        'VII',
                                                        'VIII',
                                                        'IX',
                                                    ]}
                                                    value={member.classLevel}
                                                    onSelect={handleResetFieldChange(
                                                        idx,
                                                        'classLevel'
                                                    )}
                                                />
                                                <InputField
                                                    label="Email"
                                                    placeholder="Masukkan Email"
                                                    value={member.email}
                                                    onChange={handleResetFieldChange(
                                                        idx,
                                                        'email'
                                                    )}
                                                    className="md:col-span-2"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex items-center gap-4 text-sm font-semibold">
                                        <button
                                            type="button"
                                            className="text-[#3c4cd6] hover:underline"
                                            onClick={addResetMember}
                                        >
                                            + Anggota
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <button
                                            type="button"
                                            className="flex items-center justify-center gap-2 h-11 px-4 rounded-md bg-[#4c45d8] text-white font-medium hover:bg-[#423cc5]"
                                        >
                                            <span role="img" aria-label="edit">
                                                ✏️
                                            </span>{' '}
                                            Edit Form Foto
                                        </button>
                                        <button
                                            type="button"
                                            className="flex items-center justify-center gap-2 h-11 px-4 rounded-md bg-[#35a853] text-white font-medium hover:bg-[#2f9449]"
                                            onClick={() =>
                                                setShowUploadModal(true)
                                            }
                                        >
                                            <span
                                                role="img"
                                                aria-label="upload"
                                            >
                                                ⬆️
                                            </span>{' '}
                                            Upload Form Foto
                                        </button>
                                        <button
                                            type="button"
                                            className="flex items-center justify-center gap-2 h-11 px-4 rounded-md bg-[#c44536] text-white font-medium hover:bg-[#b03d30]"
                                            onClick={exitResetMode}
                                        >
                                            <span
                                                role="img"
                                                aria-label="cancel"
                                            >
                                                ❌
                                            </span>{' '}
                                            Batal
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
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
                                                        : card.color ===
                                                            'secondary'
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
                                                    {summaryCounts[card.key]}{' '}
                                                    Orang
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
                                    <div className="w-full">
                                        <label className="text-sm font-semibold text-simbaris-text">
                                            Cari Anggota
                                        </label>
                                        <div className="mt-1 flex items-center w-full rounded-lg border border-gray-300 px-3 py-2 bg-white shadow-sm h-11">
                                            <Search
                                                className="text-gray-500"
                                                size={18}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Cari anggota..."
                                                value={filters.search}
                                                onChange={(e) =>
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        search: e.target.value,
                                                    }))
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
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    gender: val,
                                                }))
                                            }
                                        />
                                    </div>
                                    <div className="w-full">
                                        <ComboBox
                                            label="Kelas"
                                            options={['VII', 'VIII', 'IX']}
                                            value={filters.classLevel}
                                            onSelect={(val) =>
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    classLevel: val,
                                                }))
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="overflow-x-auto rounded-xl border border-simbaris-primary-light/50 shadow-sm">
                                    <table className="min-w-full text-sm">
                                        <thead>
                                            <tr className="bg-simbaris-primary text-white">
                                                <th className="px-4 py-3 text-left font-semibold">
                                                    Nama
                                                </th>
                                                <th className="px-4 py-3 text-left font-semibold">
                                                    T/L
                                                </th>
                                                <th className="px-4 py-3 text-left font-semibold">
                                                    Jenis Kelamin
                                                </th>
                                                <th className="px-4 py-3 text-left font-semibold">
                                                    Kelas
                                                </th>
                                                <th className="px-4 py-3 text-left font-semibold">
                                                    NISN
                                                </th>
                                                <th className="px-4 py-3 text-left font-semibold">
                                                    Email
                                                </th>
                                                <th className="px-4 py-3 text-left font-semibold">
                                                    Detail
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paginatedMembers.map(
                                                (member, idx) => (
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
                                                                    name={
                                                                        member.name
                                                                    }
                                                                    initials={
                                                                        member
                                                                            .name[0]
                                                                    }
                                                                    imageUrl=""
                                                                />
                                                                <span className="font-semibold text-simbaris-text">
                                                                    {
                                                                        member.name
                                                                    }
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {member.role}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {member.gender}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {member.classLevel}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {member.nisn}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {member.email}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <Button
                                                                text=""
                                                                leftIcon={
                                                                    <MoreVertical
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                }
                                                                type="secondary"
                                                                color="secondary"
                                                                round="full"
                                                                size="default"
                                                                className="w-10 h-10 px-0 gap-0 border border-gray-200 text-gray-500 hover:bg-gray-100"
                                                                aria-label="Detail anggota"
                                                                onClick={() =>
                                                                    openDetail(
                                                                        member
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-700 gap-3">
                                    <span className="text-gray-600">
                                        {startIndex + 1}-
                                        {Math.min(
                                            startIndex + pageSize,
                                            filteredMembers.length
                                        )}{' '}
                                        of {filteredMembers.length}
                                    </span>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-700">
                                                Result per page
                                            </span>
                                            <select
                                                className="h-9 border border-gray-300 rounded-md px-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4c45d8]"
                                                value={pageSize}
                                                onChange={(e) => {
                                                    const nextSize =
                                                        Number(
                                                            e.target.value
                                                        ) || 10;
                                                    setPageSize(nextSize);
                                                    setPage(1);
                                                }}
                                            >
                                                {[5, 10, 20].map((size) => (
                                                    <option
                                                        key={size}
                                                        value={size}
                                                    >
                                                        {size}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                className="h-9 px-3 rounded-md border border-gray-300 text-gray-600 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={currentPage === 1}
                                                onClick={() =>
                                                    handlePageChange(
                                                        currentPage - 1
                                                    )
                                                }
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="button"
                                                className="h-9 min-w-[36px] px-3 rounded-md border border-[#4c45d8] bg-[#4c45d8] text-white font-semibold"
                                            >
                                                {currentPage}
                                            </button>
                                            {currentPage + 1 <= pageCount && (
                                                <button
                                                    type="button"
                                                    className="h-9 min-w-[36px] px-3 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-100"
                                                    onClick={() =>
                                                        handlePageChange(
                                                            currentPage + 1
                                                        )
                                                    }
                                                >
                                                    {currentPage + 1}
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                className="h-9 px-3 rounded-md border border-gray-300 text-gray-600 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={
                                                    currentPage === pageCount
                                                }
                                                onClick={() =>
                                                    handlePageChange(
                                                        currentPage + 1
                                                    )
                                                }
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {showUploadModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-5">
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="text-xl font-semibold text-simbaris-text">
                                Upload Form Foto
                            </h3>
                            <button
                                type="button"
                                className="p-2 text-gray-800 hover:bg-gray-100 rounded-md"
                                aria-label="Close upload modal"
                                onClick={closeUploadModal}
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <div
                            className="border-2 border-dashed border-gray-400 rounded-xl h-72 flex flex-col items-center justify-center text-gray-600 cursor-pointer"
                            onClick={() => uploadInputRef.current?.click()}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleUploadDrop}
                        >
                            <UploadCloud
                                size={42}
                                className="mb-3 text-[#2c2f8a]"
                            />
                            {uploadPreview ? (
                                <div className="flex flex-col items-center gap-2">
                                    <img
                                        src={uploadPreview}
                                        alt="Preview"
                                        className="w-40 h-32 object-cover rounded-md border border-gray-200"
                                    />
                                    <p className="text-xs text-gray-600">
                                        {uploadFile?.name}
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <p className="font-semibold text-simbaris-text">
                                        Click atau drop file di area ini untuk
                                        upload
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Maksimal 5 MB, format JPG/PNG/PDF
                                    </p>
                                </>
                            )}
                            <input
                                ref={uploadInputRef}
                                type="file"
                                accept=".jpg,.jpeg,.png,.pdf"
                                className="hidden"
                                onChange={handleUploadChange}
                            />
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 h-11 px-5 rounded-md bg-[#35a853] text-white font-medium hover:bg-[#2f9449]"
                                onClick={closeUploadModal}
                            >
                                <Check size={16} /> Proses
                            </button>
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 h-11 px-5 rounded-md bg-[#c44536] text-white font-medium hover:bg-[#b03d30]"
                                onClick={closeUploadModal}
                            >
                                <X size={16} /> Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {selectedMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-5">
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-semibold text-simbaris-text">
                                Detail Anggota
                            </h3>
                            <button
                                type="button"
                                className="p-2 text-gray-800 hover:bg-gray-100 rounded-md"
                                aria-label="Close detail anggota"
                                onClick={() => setSelectedMember(null)}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {!isEditing ? (
                            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-3 items-start">
                                <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                                    {[
                                        ['Nama', selectedMember.name],
                                        ['Nama Tim', 'Specta Squad'],
                                        [
                                            'Asal Sekolah',
                                            'SMP Negeri 18 Balikpapan',
                                        ],
                                        [
                                            'Jenjang Sekolah',
                                            'SMP/MTs Sederajat',
                                        ],
                                        ['Kelas', selectedMember.classLevel],
                                        ['NISN', selectedMember.nisn],
                                        [
                                            'Jenis Kelamin',
                                            selectedMember.gender,
                                        ],
                                        ['Email', selectedMember.email],
                                    ].map(([label, value], idx) => (
                                        <div
                                            key={label}
                                            className={`flex items-center justify-between px-4 py-2 text-sm ${
                                                idx !== 7
                                                    ? 'border-b border-gray-200'
                                                    : ''
                                            }`}
                                        >
                                            <span className="text-gray-700 min-w-[140px]">
                                                {label}
                                            </span>
                                            <span className="flex-1 h-px bg-gray-200 mx-3" />
                                            <span className="font-semibold text-simbaris-text text-right">
                                                {value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-44 h-56 rounded-md overflow-hidden border border-gray-200 shadow-sm">
                                        <img
                                            src={selectedMember.image}
                                            alt={selectedMember.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="w-full flex flex-col gap-2 items-center">
                                        <button
                                            type="button"
                                            className="w-48 h-11 rounded-md border-2 border-[#2c2f8a] text-[#2c2f8a] font-medium hover:bg-[#2c2f8a]/10"
                                        >
                                            Lihat Gambar
                                        </button>
                                        <button
                                            type="button"
                                            className="w-48 h-11 rounded-md bg-[#d4b73f] text-white font-semibold hover:bg-[#c3a836]"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-[2.1fr_1fr] gap-3 items-start">
                                    <div className="grid grid-cols-1 gap-3">
                                        <InputField
                                            label="Nama"
                                            value={memberData.name}
                                            onChange={handleFieldChange('name')}
                                        />
                                        <ComboBox
                                            label="Kelas"
                                            options={['VII', 'VIII', 'IX']}
                                            value={memberData.classLevel}
                                            onSelect={handleFieldChange(
                                                'classLevel'
                                            )}
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
                                            onSelect={handleFieldChange(
                                                'gender'
                                            )}
                                        />
                                        <InputField
                                            label="Email"
                                            value={memberData.email}
                                            onChange={handleFieldChange(
                                                'email'
                                            )}
                                        />
                                    </div>
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-44 h-60 rounded-md overflow-hidden border mt-8 border-gray-200 shadow-sm bg-white">
                                            <img
                                                src={memberData.image}
                                                alt={memberData.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="w-full flex flex-col gap-2 items-center">
                                            <button
                                                type="button"
                                                className="flex items-center justify-center gap-2 w-48 h-12 rounded-md bg-[#c44536] text-white font-medium hover:bg-[#b03d30]"
                                                onClick={() =>
                                                    setIsEditing(false)
                                                }
                                            >
                                                <X size={16} /> Batal
                                            </button>
                                            <button
                                                type="button"
                                                className="flex items-center justify-center gap-2 w-48 h-12 rounded-md bg-[#35a853] text-white font-medium hover:bg-[#2f9449]"
                                                onClick={() =>
                                                    setIsEditing(false)
                                                }
                                            >
                                                <Check size={16} /> Simpan
                                            </button>
                                        </div>
                                    </div>
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
