import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import Button from '../../components/Button';
import MyDataPanel from '../../components/member/dashboard_member/MyDataPanel';
import { myData } from '../../dummy/singleMemberData';

const DashboardMember = ({ isSidebarOpen = true }) => {
    const teamMembers = [
        { nama: "Tri Setiawan Budiono", jenisKelamin: "Laki-Laki", kelas: "VII", nisn: "1234567890", email: "anggota1@gmail.com" },
        { nama: "Bahrul Hilman Wibowo", jenisKelamin: "Perempuan", kelas: "VIII", nisn: "1234567890", email: "anggota2@gmail.com" },
        { nama: "Tri Setiawan Budiono", jenisKelamin: "Laki-Laki", kelas: "VII", nisn: "1234567890", email: "anggota3@gmail.com" },
        { nama: "Bahrul Hilman Wibowo", jenisKelamin: "Perempuan", kelas: "VII", nisn: "1234567890", email: "anggota4@gmail.com" },
        { nama: "Tri Setiawan Budiono", jenisKelamin: "Laki-Laki", kelas: "VII", nisn: "1234567890", email: "anggota5@gmail.com" },
    ];

    const totalItems = 13;
    const itemsPerPage = 5;
    // Menggunakan state untuk currentPage agar fungsionalitas pagination bisa dijalankan (walaupun hanya simulasi)
    const [currentPage, setCurrentPage] = useState(1); 
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // Fungsi untuk render tombol angka pagination
    const renderPaginationButtons = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`h-8 w-8 text-sm font-medium transition-colors duration-150 border-y border-gray-300
                        ${i === currentPage
                            ? 'bg-[#3454D1] text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    {i}
                </button>
            );
        }

        return (
            <div className="flex items-center">
                {pages}
            </div>
        );
    };

    const LinkIcon = <ExternalLink className="w-4 h-4 mr-1" />;
    
    // Warna sekunder untuk styling header tabel dan tombol aktif
    const secondaryColor = "#3454D1";

    return (
        <div className="flex bg-gray-100">
            <div
                className={`w-full min-h-screen overflow-hidden pt-16 ${
                    isSidebarOpen ? 'md:ml-64' : 'ml-0'
                } transition-all duration-300`}
            >
                <div className="flex flex-col gap-4 p-6">
                    {/* HEADER */}
                    <header className="text-simbaris-text font-semibold text-3xl">
                        Dashboard
                    </header>

                    
                    <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2 border border-gray-200">
                            <MyDataPanel myData={myData} />
                        </div>

                        {/* ===================== */}
                        {/* DATA TIM (kanan atas, 1/3 kolom) */}
                        {/* ===================== */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                            <h2 className="text-xl font-semibold mb-6 text-gray-900">
                                Data Tim
                            </h2>

                            {/* Detail Data Tim (Label Kiri, Value Kanan, Underline) */}
                            <div className="flex flex-col gap-3 text-sm mb-4">
                                <div className="flex justify-between items-center text-base border-b border-gray-300 pb-1">
                                    <span className="font-normal text-gray-700">
                                        Nama Tim
                                    </span>
                                    <span className="font-medium text-gray-900 text-right">
                                        Specta Squad
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-base border-b border-gray-300 pb-1">
                                    <span className="font-normal text-gray-700">
                                        Nama Sekolah
                                    </span>
                                    <span className="font-medium text-gray-900 text-right">
                                        SMP Negeri 18 Balikpapan Selatan
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-base border-b border-gray-300 pb-1">
                                    <span className="font-normal text-gray-700">
                                        Kota
                                    </span>
                                    <span className="font-medium text-gray-900 text-right">
                                        Balikpapan
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <Button
                                    text={
                                        <span className="flex items-center">
                                            {LinkIcon} Lihat Selengkapnya
                                        </span>
                                    }
                                    size="default"
                                    round="half"
                                    color="secondary"
                                />
                            </div>
                        </div>

                        {/* ===================== */}
                        {/* DAFTAR ANGGOTA (kiri bawah, 2/3 kolom) */}
                        {/* ===================== */}
                        <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2 border border-gray-200">
                            <h2 className="text-xl font-semibold mb-4 text-gray-900">
                                Daftar Anggota Tim
                            </h2>

                            {/* Search Box sesuai desain */}
                            <div className="mb-4 flex relative items-center">
                                {/* Search Icon */}
                                <svg
                                    className="w-5 h-5 text-gray-400 absolute left-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    ></path>
                                </svg>
                                <input
                                    type="text"
                                    className={`w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:ring-[${secondaryColor}] focus:border-[${secondaryColor}] transition`}
                                    placeholder="Cari..."
                                />
                            </div>

                            {/* Tabel Anggota */}
                            <div className="overflow-x-auto border border-gray-200 rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                                    <thead
                                        className={`text-xs text-white uppercase bg-[${secondaryColor}]`}
                                    >
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-3 py-3 rounded-tl-lg"
                                            >
                                                Nama
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3"
                                            >
                                                Jenis Kelamin
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3"
                                            >
                                                Kelas
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3"
                                            >
                                                NISN
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3 rounded-tr-lg"
                                            >
                                                Email
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Menggandakan data dummy agar terlihat seperti di desain */}
                                        {[...teamMembers, ...teamMembers]
                                            .slice(0, 5)
                                            .map((member, index) => (
                                                <tr
                                                    key={index}
                                                    className={`
                                                    ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} 
                                                    border-b border-gray-200 last:border-b-0
                                                `}
                                                >
                                                    <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                        {member.nama}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {member.jenisKelamin}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {member.kelas}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {member.nisn}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {member.email}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination dan "Lihat Selengkapnya" */}
                            <div className="flex justify-between items-center mt-4 flex-wrap gap-y-4">
                                <span className="text-xs text-gray-500 order-1">
                                    {`${(currentPage - 1) * itemsPerPage + 1}–${Math.min(currentPage * itemsPerPage, totalItems)} of ${totalItems}`}
                                </span>

                                {/* Pagination Controls (Result per page dan tombol angka) */}
                                <div className="flex items-center order-3 w-full sm:w-auto sm:order-2 justify-end">
                                    <div className="flex items-center text-sm mr-4">
                                        <span className="text-gray-700 mr-2 hidden sm:inline">
                                            Result per page
                                        </span>
                                        <select className="border border-gray-300 rounded-lg p-1 shadow-sm">
                                            <option>5</option>
                                            <option>10</option>
                                        </select>
                                    </div>

                                    {/* Tombol Back */}
                                    <button
                                        onClick={() =>
                                            setCurrentPage((prev) =>
                                                Math.max(1, prev - 1)
                                            )
                                        }
                                        disabled={currentPage === 1}
                                        className="h-8 px-2 text-sm bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-l-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Back
                                    </button>

                                    {/* Tombol Angka */}
                                    {renderPaginationButtons()}

                                    {/* Tombol Next */}
                                    <button
                                        onClick={() =>
                                            setCurrentPage((prev) =>
                                                Math.min(totalPages, prev + 1)
                                            )
                                        }
                                        disabled={currentPage === totalPages}
                                        className="h-8 px-2 text-sm bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-r-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>

                                {/* Lihat Selengkapnya Button */}
                                <div className="order-2 sm:order-3 w-full flex justify-end">
                                    <Button
                                        text={
                                            <span className="flex items-center">
                                                {LinkIcon} Lihat Selengkapnya
                                            </span>
                                        }
                                        size="default"
                                        round="half"
                                        color="secondary"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ===================== */}
                        {/* COMING SOON (kanan bawah, 1/3 kolom) */}
                        {/* ===================== */}
                        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center border border-gray-200">
                            <h2 className="text-xl font-semibold mb-4 text-gray-900">
                                Nilai dan Catatan Juri
                            </h2>
                            <p className="font-extrabold text-5xl text-gray-300 text-center p-8">
                                COMING SOON
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardMember;