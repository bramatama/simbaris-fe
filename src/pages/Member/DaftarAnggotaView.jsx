import React, { useState, useMemo } from "react";
import { ExternalLink } from "lucide-react";



const Button = ({ text, onClick, size = "default", round = "half", className = "", color = "secondary" }) => {
  const sizeClasses = {
    default: "px-4 py-2 text-sm",
    long: "px-6 py-2 text-sm w-full",
    icon: "p-2",
  };
  const roundClasses = { half: "rounded-lg", full: "rounded-full" };
  const colorClasses = color === "secondary" ? "bg-[#3454D1] hover:bg-[#253C94] text-white" : "bg-gray-500 hover:bg-gray-600 text-white";

  return (
    <button onClick={onClick} className={`${colorClasses} font-medium transition-all duration-200 shadow-md ${sizeClasses[size]} ${roundClasses[round]} ${className}`}>
      {text}
    </button>
  );
};

const DaftarAnggotaView = ({ isSidebarOpen = true }) => {
  const myData = {
    nama: "Tom Green",
    namaTim: "Specta Squad",
    asalSekolah: "SMP Negeri 18 Balikpapan Selatan",
    jenjang: "SMP/MTs Sederajat",
    kelas: "VII",
    nisn: "1234567890",
    jenisKelamin: "Laki-Laki",
    email: "tom.green@example.com",
    foto: "https://placehold.co/160x160/3454D1/ffffff?text=TG",
  };


  const initialMembers = [
    { id: 1, nama: "Tri Setiawan Budiono", namaTim: "Specta Squad", asalSekolah: "SMP Negeri 18", jenjang: "SMP", kelas: "VII", nisn: "1234567890", jenisKelamin: "Laki-Laki", email: "anggota1@gmail.com", foto: "https://placehold.co/128x128/3454D1/fff?text=TS" },
    { id: 2, nama: "Bahrul Hilman Wibowo", namaTim: "Specta Squad", asalSekolah: "SMP Negeri 18", jenjang: "SMP", kelas: "VIII", nisn: "1234567891", jenisKelamin: "Perempuan", email: "anggota2@gmail.com", foto: "https://placehold.co/128x128/3454D1/fff?text=BH" },
    { id: 3, nama: "Rizky Januar", namaTim: "Specta Squad", asalSekolah: "SMP Negeri 18", jenjang: "SMP", kelas: "VII", nisn: "1234567892", jenisKelamin: "Laki-Laki", email: "anggota3@gmail.com", foto: "https://placehold.co/128x128/3454D1/fff?text=RJ" },
    { id: 4, nama: "Cindy Kurnia", namaTim: "Specta Squad", asalSekolah: "SMP Negeri 18", jenjang: "SMP", kelas: "IX", nisn: "1234567893", jenisKelamin: "Perempuan", email: "anggota4@gmail.com", foto: "https://placehold.co/128x128/3454D1/fff?text=CK" },
    { id: 5, nama: "Andi Pratama", namaTim: "Specta Squad", asalSekolah: "SMP Negeri 18", jenjang: "SMP", kelas: "VIII", nisn: "1234567894", jenisKelamin: "Laki-Laki", email: "anggota5@gmail.com", foto: "https://placehold.co/128x128/3454D1/fff?text=AP" },
    { id: 6, nama: "Sari Dewi", namaTim: "Specta Squad", asalSekolah: "SMP Negeri 18", jenjang: "SMP", kelas: "VII", nisn: "1234567895", jenisKelamin: "Perempuan", email: "anggota6@gmail.com", foto: "https://placehold.co/128x128/3454D1/fff?text=SD" },

  ];


  const [members] = useState(initialMembers);
  const [search, setSearch] = useState("");
  const [filterGender, setFilterGender] = useState("semua");
  const [filterKelas, setFilterKelas] = useState("semua");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // modals
  const [showMyModal, setShowMyModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showMemberModal, setShowMemberModal] = useState(false);

  // ---------------------------
  // Filtering logic
  // ---------------------------
  const filteredMembers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return members.filter((m) => {
      const matchesSearch =
        q === "" ||
        (m.nama && m.nama.toLowerCase().includes(q)) ||
        (m.email && m.email.toLowerCase().includes(q)) ||
        (m.nisn && m.nisn.includes(q));
      const matchesGender = filterGender === "semua" || m.jenisKelamin === filterGender;
      const matchesKelas = filterKelas === "semua" || m.kelas === filterKelas;
      return matchesSearch && matchesGender && matchesKelas;
    });
  }, [members, search, filterGender, filterKelas]);

  const totalItems = filteredMembers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const paginatedMembers = filteredMembers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // helpers
  const openMemberModal = (member) => {
    setSelectedMember(member);
    setShowMemberModal(true);
  };
  const handleSearchChange = (v) => {
    setSearch(v);
    setCurrentPage(1);
  };
  const handleGenderChange = (v) => {
    setFilterGender(v);
    setCurrentPage(1);
  };
  const handleKelasChange = (v) => {
    setFilterKelas(v);
    setCurrentPage(1);
  };

  const renderPaginationButtons = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button key={i} onClick={() => setCurrentPage(i)} className={`h-8 w-8 text-sm font-medium transition-colors duration-150 border-y border-gray-300 ${i === currentPage ? "bg-[#3454D1] text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}>
          {i}
        </button>
      );
    }
    return <div className="flex items-center">{pages}</div>;
  };

  return (
    <div className="flex bg-gray-100 min-h-screen font-inter">
      <div className={`w-full overflow-hidden pt-16 ${isSidebarOpen ? "md:ml-64" : "ml-0"} transition-all duration-300`}>
        <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">
          {/* Header */}
          <header className="text-gray-900 font-semibold text-3xl pb-2 border-b-2 border-gray-200">Tim Saya</header>

          {/* Data Saya card (full width, like DashboardMember's style) */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Data Saya</h2>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-32 h-32 flex-shrink-0 rounded-full overflow-hidden shadow-lg border-4 border-[#3454D1]">
                <img src={myData.foto} alt="Foto Profil" className="w-full h-full object-cover" />
              </div>

              <div className="flex flex-col gap-3 text-sm flex-grow min-w-0">
                <div className="flex justify-between items-center text-base border-b border-gray-300 pb-1">
                  <span className="font-normal text-gray-700">Nama</span>
                  <span className="font-medium text-gray-900 truncate">{myData.nama}</span>
                </div>
                <div className="flex justify-between items-center text-base border-b border-gray-300 pb-1">
                  <span className="font-normal text-gray-700">Nama Tim</span>
                  <span className="font-medium text-gray-900 truncate">{myData.namaTim}</span>
                </div>
                <div className="flex justify-between items-center text-base border-b border-gray-300 pb-1">
                  <span className="font-normal text-gray-700">Asal Sekolah</span>
                  <span className="font-medium text-gray-900 truncate">{myData.asalSekolah}</span>
                </div>
                <div className="flex justify-between items-center text-base border-b border-gray-300 pb-1">
                  <span className="font-normal text-gray-700">Jenjang Sekolah</span>
                  <span className="font-medium text-gray-900 truncate">{myData.jenjang}</span>
                </div>
                <div className="flex justify-between items-center text-base border-b border-gray-300 pb-1">
                  <span className="font-normal text-gray-700">Kelas</span>
                  <span className="font-medium text-gray-900 truncate">{myData.kelas}</span>
                </div>
                <div className="flex justify-between items-center text-base border-b border-gray-300 pb-1">
                  <span className="font-normal text-gray-700">NISN</span>
                  <span className="font-medium text-gray-900 truncate">{myData.nisn}</span>
                </div>
                <div className="flex justify-between items-center text-base border-b border-gray-300 pb-1">
                  <span className="font-normal text-gray-700">Jenis Kelamin</span>
                  <span className="font-medium text-gray-900 truncate">{myData.jenisKelamin}</span>
                </div>
                <div className="flex justify-between items-center text-base pb-1">
                  <span className="font-normal text-gray-700">Email</span>
                  <span className="font-medium text-gray-900 truncate">{myData.email}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button text={<span className="flex items-center"><ExternalLink className="w-4 h-4 mr-1" /> Lihat Selengkapnya</span>} color="secondary" onClick={() => setShowMyModal(true)} />
            </div>
          </div>

          {/* Daftar Anggota Tim */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Daftar Anggota Tim</h2>

            {/* Search + filters */}
            <div className="mb-4 flex gap-3 items-center">
              <div className="relative flex-1">
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input type="text" value={search} onChange={(e) => handleSearchChange(e.target.value)} className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:ring-[#3454D1] focus:border-[#3454D1]" placeholder="Cari nama, email atau NISN..." />
              </div>

              <select value={filterGender} onChange={(e) => handleGenderChange(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option value="semua">Jenis Kelamin</option>
                <option value="Laki-Laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>

              <select value={filterKelas} onChange={(e) => handleKelasChange(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option value="semua">Kelas</option>
                <option value="VII">VII</option>
                <option value="VIII">VIII</option>
                <option value="IX">IX</option>
              </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-white uppercase bg-[#3454D1]">
                  <tr>
                    <th className="px-3 py-3 rounded-l-lg">Nama</th>
                    <th className="px-3 py-3">Jenis Kelamin</th>
                    <th className="px-3 py-3">Kelas</th>
                    <th className="px-3 py-3">NISN</th>
                    <th className="px-3 py-3">Email</th>
                    <th className="px-3 py-3 rounded-r-lg text-center">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMembers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-6 text-gray-500">Tidak ada data anggota.</td>
                    </tr>
                  ) : (
                    paginatedMembers.map((m, idx) => (
                      <tr key={m.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b border-gray-200`}>
                        <td className="px-3 py-2 font-medium">{m.nama}</td>
                        <td className="px-3 py-2">{m.jenisKelamin}</td>
                        <td className="px-3 py-2">{m.kelas}</td>
                        <td className="px-3 py-2">{m.nisn}</td>
                        <td className="px-3 py-2">{m.email}</td>
                        <td className="px-3 py-2 text-center">
                          <button onClick={() => openMemberModal(m)} className="inline-flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100" aria-label="Detail anggota">⋮</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 flex-wrap gap-y-4">
              <span className="text-xs text-gray-500">{totalItems === 0 ? "0 data" : `${(currentPage - 1) * itemsPerPage + 1}–${Math.min(currentPage * itemsPerPage, totalItems)} dari ${totalItems}`}</span>

              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="h-8 px-3 border border-gray-300 bg-white rounded-lg disabled:opacity-40">Back</button>
                {renderPaginationButtons()}
                <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="h-8 px-3 border border-gray-300 bg-white rounded-lg disabled:opacity-40">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Data Saya */}
      {showMyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-[680px] max-w-full p-6 relative">
            <button onClick={() => setShowMyModal(false)} className="absolute top-3 right-3 text-gray-500 hover:text-black">✕</button>
            <h3 className="text-lg font-semibold mb-4">Data Saya</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Nama</span><span className="font-medium">{myData.nama}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Nama Tim</span><span className="font-medium">{myData.namaTim}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Asal Sekolah</span><span className="font-medium">{myData.asalSekolah}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Jenjang Sekolah</span><span className="font-medium">{myData.jenjang}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Kelas</span><span className="font-medium">{myData.kelas}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">NISN</span><span className="font-medium">{myData.nisn}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Jenis Kelamin</span><span className="font-medium">{myData.jenisKelamin}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Email</span><span className="font-medium">{myData.email}</span></div>
              </div>

              <div className="flex flex-col items-center">
                <img src={myData.foto} alt="foto" className="w-40 h-40 object-cover rounded-lg border" />
                <button className="mt-3 px-4 py-1 border rounded-lg text-sm">Lihat Gambar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Detail Anggota */}
      {showMemberModal && selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-[680px] max-w-full p-6 relative">
            <button onClick={() => setShowMemberModal(false)} className="absolute top-3 right-3 text-gray-500 hover:text-black">✕</button>
            <h3 className="text-lg font-semibold mb-4">Detail Anggota</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Nama</span><span className="font-medium">{selectedMember.nama}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Nama Tim</span><span className="font-medium">{selectedMember.namaTim}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Asal Sekolah</span><span className="font-medium">{selectedMember.asalSekolah}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Jenjang Sekolah</span><span className="font-medium">{selectedMember.jenjang}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Kelas</span><span className="font-medium">{selectedMember.kelas}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">NISN</span><span className="font-medium">{selectedMember.nisn}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Jenis Kelamin</span><span className="font-medium">{selectedMember.jenisKelamin}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Email</span><span className="font-medium">{selectedMember.email}</span></div>
              </div>

              <div className="flex flex-col items-center">
                <img src={selectedMember.foto} alt="foto" className="w-40 h-40 object-cover rounded-lg border" />
                <button className="mt-3 px-4 py-1 border rounded-lg text-sm">Lihat Gambar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DaftarAnggotaView;
