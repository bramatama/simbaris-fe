import React, { useMemo, useState } from 'react';
import { CheckCircle2, Clock3, Download, FileText } from 'lucide-react';
import Avatar from '../../components/Avatar';
import Breadcrumbs from '../../components/Breadcrumbs';
import Button from '../../components/Button';
import ComboBox from '../../components/inputs/Combobox';
import InputField from '../../components/inputs/InputField';

const InfoRow = ({ label, value }) => (
    <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="text-sm font-semibold text-simbaris-text">
            {value}
        </span>
    </div>
);

const DashboardAdminTim = ({ isSidebarOpen }) => {
    const [filters, setFilters] = useState({
        category: '',
        gender: '',
        search: '',
    });

    const teamProfile = {
        crest: '/images/logo_simbaris_default.png',
        name: 'Name Tim',
        status: 'Siap Verifikasi',
        school: 'SMK Negeri 10 Semarang',
        schedule: '03/11/2024',
        coach: 'Harvey Specter',
    };

    const memberList = [
        {
            name: 'Lee Deae',
            role: 'Ketua',
            category: 'SMA',
            idNumber: '15656567985',
            gender: 'Pria',
            phone: '08983919890',
            email: 'anggota@mail.com',
        },
        {
            name: 'Seda Micheal',
            role: 'Anggota',
            category: 'SMP',
            idNumber: '12579564588',
            gender: 'Pria',
            phone: '08128391890',
            email: 'anggota@mail.com',
        },
        {
            name: 'Noviaska Zain',
            role: 'Anggota',
            category: 'SMA',
            idNumber: '96558827945',
            gender: 'Wanita',
            phone: '08138899000',
            email: 'anggota@mail.com',
        },
        {
            name: 'Athalla Syafira',
            role: 'Anggota',
            category: 'SMA',
            idNumber: '12345678911',
            gender: 'Wanita',
            phone: '087811223344',
            email: 'anggota@mail.com',
        },
        {
            name: 'Rashika Fikri',
            role: 'Anggota',
            category: 'SMA',
            idNumber: '12341234765',
            gender: 'Pria',
            phone: '08121212999',
            email: 'anggota@mail.com',
        },
        {
            name: 'Savanna Diaz',
            role: 'Anggota',
            category: 'SMA',
            idNumber: '98765432100',
            gender: 'Wanita',
            phone: '08989898989',
            email: 'anggota@mail.com',
        },
    ];

    const registrationInfo = {
        category: 'SMP/MTs (2-3 Beregu)',
        totalMember: 13,
        submissionDate: '03/11/2024',
        paymentType: 'BRI Virtual Account',
        vaNumber: '8810525850223',
    };

    const statusSteps = [
        { label: 'Upload Berkas', done: true },
        { label: 'Verifikasi Berkas', done: true },
        { label: 'Pembayaran', done: true },
        { label: 'Verifikasi Pembayaran', done: false, current: true },
    ];

    const filteredMembers = useMemo(() => {
        return memberList.filter((member) => {
            const matchCategory = filters.category
                ? member.category
                      .toLowerCase()
                      .includes(filters.category.toLowerCase())
                : true;
            const matchGender = filters.gender
                ? member.gender
                      .toLowerCase()
                      .includes(filters.gender.toLowerCase())
                : true;
            const matchSearch = filters.search
                ? `${member.name} ${member.idNumber}`
                      .toLowerCase()
                      .includes(filters.search.toLowerCase())
                : true;

            return matchCategory && matchGender && matchSearch;
        });
    }, [filters, memberList]);

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
                            Dashboard
                        </h1>
                        <Breadcrumbs />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                        <div className="space-y-4 xl:col-span-2">
                            <div className="bg-white rounded-2xl shadow-sm border border-simbaris-primary-light/40">
                                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                                    <h2 className="text-lg font-semibold text-simbaris-text">
                                        Data Tim
                                    </h2>
                                    <span className="text-xs font-semibold text-simbaris-primary bg-simbaris-primary-lightest px-3 py-1 rounded-full">
                                        {teamProfile.status}
                                    </span>
                                </div>

                                <div className="px-5 py-4 flex flex-col gap-6 lg:flex-row lg:items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-20 h-20 rounded-full bg-simbaris-primary-lightest flex items-center justify-center overflow-hidden border border-simbaris-primary-light">
                                            <img
                                                src={teamProfile.crest}
                                                alt="Logo tim"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src =
                                                        '/images/logo_simbaris_icon.png';
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
                                        <InfoRow
                                            label="Nama Tim"
                                            value={teamProfile.name}
                                        />
                                        <InfoRow
                                            label="Sekolah Tim"
                                            value={teamProfile.school}
                                        />
                                        <InfoRow
                                            label="Nama Pelatih"
                                            value={teamProfile.coach}
                                        />
                                        <InfoRow
                                            label="Jadwal"
                                            value={teamProfile.schedule}
                                        />
                                    </div>

                                    <div className="flex justify-end lg:justify-start">
                                        <Button
                                            text="Lihat Selengkapnya"
                                            size="default"
                                            color="secondary"
                                            type="secondary"
                                            className="whitespace-nowrap"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-simbaris-primary-light/40">
                                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                                    <h2 className="text-lg font-semibold text-simbaris-text">
                                        Daftar Anggota Tim
                                    </h2>
                                    <span className="text-sm text-gray-500">
                                        {filteredMembers.length} anggota
                                    </span>
                                </div>

                                <div className="px-5 py-4 space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <ComboBox
                                            label="Kategori Kelas"
                                            options={[
                                                'SMP',
                                                'SMA',
                                                'SD',
                                            ]}
                                            placeholder="Pilih kategori"
                                            value={filters.category}
                                            onSelect={(value) =>
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    category: value,
                                                }))
                                            }
                                        />
                                        <ComboBox
                                            label="Jenis Kelamin"
                                            options={[
                                                'Pria',
                                                'Wanita',
                                            ]}
                                            placeholder="Pilih jenis kelamin"
                                            value={filters.gender}
                                            onSelect={(value) =>
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    gender: value,
                                                }))
                                            }
                                        />
                                        <InputField
                                            label="Cari Anggota"
                                            placeholder="Nama atau NISN"
                                            helperText=""
                                            value={filters.search}
                                            onChange={(e) =>
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    search: e.target.value,
                                                }))
                                            }
                                        />
                                    </div>

                                    <div className="overflow-x-auto rounded-xl border border-simbaris-primary-light/50">
                                        <table className="min-w-full text-sm">
                                            <thead>
                                                <tr className="text-left text-white bg-simbaris-primary">
                                                    <th className="px-4 py-3 font-semibold">
                                                        Nama
                                                    </th>
                                                    <th className="px-4 py-3 font-semibold">
                                                        Role
                                                    </th>
                                                    <th className="px-4 py-3 font-semibold">
                                                        Kategori
                                                    </th>
                                                    <th className="px-4 py-3 font-semibold">
                                                        NISN
                                                    </th>
                                                    <th className="px-4 py-3 font-semibold">
                                                        Kontak
                                                    </th>
                                                    <th className="px-4 py-3 font-semibold">
                                                        Email
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredMembers.map(
                                                    (member, index) => (
                                                        <tr
                                                            key={`${member.name}-${index}`}
                                                            className={`border-t border-gray-100 ${
                                                                index % 2 === 0
                                                                    ? 'bg-white'
                                                                    : 'bg-simbaris-primary-lightest/60'
                                                            } hover:bg-simbaris-primary-lightest transition-colors`}
                                                        >
                                                            <td className="px-4 py-3">
                                                                <div className="flex items-center gap-3">
                                                                    <Avatar
                                                                        name={
                                                                            member.name
                                                                        }
                                                                        initials={
                                                                            member
                                                                                .name
                                                                                .split(
                                                                                    ' '
                                                                                )[0][0]
                                                                        }
                                                                    />
                                                                    <div className="flex flex-col">
                                                                        <span className="font-semibold text-simbaris-text">
                                                                            {
                                                                                member.name
                                                                            }
                                                                        </span>
                                                                        <span className="text-xs text-gray-500">
                                                                            {
                                                                                member.gender
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <span className="text-xs font-semibold text-simbaris-primary bg-simbaris-primary-lightest px-3 py-1 rounded-full">
                                                                    {
                                                                        member.role
                                                                    }
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                {member.category}
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                {
                                                                    member.idNumber
                                                                }
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                {
                                                                    member.phone
                                                                }
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                {
                                                                    member.email
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                        <span className="text-xs text-gray-500">
                                            Menampilkan {filteredMembers.length}{' '}
                                            dari {memberList.length} anggota
                                        </span>
                                        <div className="flex items-center gap-3">
                                            <Button
                                                text="Unduh Data"
                                                size="default"
                                                type="secondary"
                                                color="secondary"
                                                leftIcon={
                                                    <Download size={16} />
                                                }
                                                className="whitespace-nowrap"
                                            />
                                            <Button
                                                text="Lihat Selengkapnya"
                                                size="default"
                                                color="primary"
                                                className="whitespace-nowrap"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-white rounded-2xl shadow-sm border border-simbaris-primary-light/40 p-5 flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-simbaris-text">
                                        Nilai dan Catatan Juri
                                    </h2>
                                    <Clock3 className="text-simbaris-secondary" />
                                </div>
                                <div className="flex flex-col gap-2 text-simbaris-primary font-semibold text-2xl text-center py-10 bg-simbaris-secondary-lightest rounded-xl border border-simbaris-secondary-light">
                                    <span>COMING SOON</span>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-simbaris-primary-light/40 p-5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-simbaris-text">
                                        Detail Pendaftaran
                                    </h2>
                                    <FileText className="text-simbaris-secondary" />
                                </div>
                                <div className="grid grid-cols-1 gap-3 bg-simbaris-primary-lightest/60 rounded-xl p-4 border border-simbaris-primary-light/40">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">
                                            Jenjang
                                        </span>
                                        <span className="font-semibold text-simbaris-text">
                                            {registrationInfo.category}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">
                                            Jumlah Anggota
                                        </span>
                                        <span className="font-semibold text-simbaris-text">
                                            {registrationInfo.totalMember} Orang
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">
                                            Harga
                                        </span>
                                        <span className="font-semibold text-simbaris-text">
                                            Rp. 500.000
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">
                                            Bukti Pembayaran
                                        </span>
                                        <Button
                                            text="Lihat Gambar"
                                            size="default"
                                            type="secondary"
                                            color="secondary"
                                            className="h-9"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">
                                            Waktu Pendaftaran
                                        </span>
                                        <span className="font-semibold text-simbaris-text">
                                            08/08/2025 12:29
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">
                                            Terakhir di-Update
                                        </span>
                                        <span className="font-semibold text-simbaris-text">
                                            -
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    text="Unduh Bukti Pendaftaran"
                                    size="full"
                                    leftIcon={<Download size={18} />}
                                />
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-simbaris-primary-light/40 p-5 space-y-4">
                                <h2 className="text-lg font-semibold text-simbaris-text">
                                    Status
                                </h2>
                                <div className="flex items-center justify-between bg-simbaris-secondary-lightest border border-simbaris-secondary-light rounded-xl px-4 py-3">
                                    <span className="text-sm font-semibold text-simbaris-text">
                                        {statusSteps[3].label}
                                    </span>
                                    <span className="text-xs font-semibold text-white bg-simbaris-secondary px-3 py-1 rounded-full">
                                        Dalam Proses Verifikasi
                                    </span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    {statusSteps.map((step) => (
                                        <div
                                            key={step.label}
                                            className="flex items-center gap-3"
                                        >
                                            {step.done ? (
                                                <CheckCircle2 className="text-simbaris-primary" />
                                            ) : (
                                                <Clock3 className="text-simbaris-secondary" />
                                            )}
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-simbaris-text">
                                                    {step.label}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {step.done
                                                        ? 'Selesai'
                                                        : step.current
                                                        ? 'Dalam proses verifikasi'
                                                        : 'Menunggu'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    text="Lihat Selengkapnya"
                                    size="full"
                                    type="secondary"
                                    color="secondary"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DashboardAdminTim;
