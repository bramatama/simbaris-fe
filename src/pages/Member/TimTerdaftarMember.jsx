import React, { useMemo, useState } from 'react';
import SimpleCards from '../../components/dashboard_panitia/SimpleCards';

const TimTerdaftarMember = ({ isSidebarOpen = true }) => {
  const initialData = [
    { id: 1, namaTim: 'Human Torch', sekolah: 'SMP Negeri 29 Samarinda', jenjang: 'SMP/MTs Sederajat', provinsi: 'Kalimantan Timur', kota: 'Samarinda', kecamatan: 'Samarinda Ulu' },
    { id: 2, namaTim: 'Garuda Muda', sekolah: 'SMP Negeri 89 Balikpapan', jenjang: 'SMP/MTs Sederajat', provinsi: 'Kalimantan Timur', kota: 'Balikpapan', kecamatan: 'Balikpapan Utara' },
    { id: 3, namaTim: 'Elang Perkasa', sekolah: 'SD Negeri 087 Pontianak', jenjang: 'SD/MI Sederajat', provinsi: 'Kalimantan Barat', kota: 'Pontianak', kecamatan: 'Pontianak Kota' },
    { id: 4, namaTim: 'Ksatria Muda', sekolah: 'SMP Negeri 99 Singkawang', jenjang: 'SMP/MTs Sederajat', provinsi: 'Kalimantan Barat', kota: 'Singkawang', kecamatan: 'Singkawang Tengah' },
    { id: 5, namaTim: 'Arjuna', sekolah: 'SMA Negeri 10 Balikpapan', jenjang: 'SMA/SMK/MA Sederajat', provinsi: 'Kalimantan Timur', kota: 'Balikpapan', kecamatan: 'Balikpapan Kota' },
    { id: 6, namaTim: 'Budiono Siregar', sekolah: 'SD Negeri 1 Palangkaraya', jenjang: 'SD/MI Sederajat', provinsi: 'Kalimantan Tengah', kota: 'Palangkaraya', kecamatan: 'Jekan Raya' },
    { id: 7, namaTim: 'Bina Bangsa', sekolah: 'SD Negeri 77 Balikpapan', jenjang: 'SD/MI Sederajat', provinsi: 'Kalimantan Timur', kota: 'Balikpapan', kecamatan: 'Balikpapan Barat' },
    { id: 8, namaTim: 'Ksatria Nusantara', sekolah: 'SMP Nusantara Pontianak', jenjang: 'SMP/MTs Sederajat', provinsi: 'Kalimantan Barat', kota: 'Pontianak', kecamatan: 'Pontianak Selatan' },
    { id: 9, namaTim: 'Harimau Sakti', sekolah: 'MAN 5 Balikpapan', jenjang: 'SMA/SMK/MA Sederajat', provinsi: 'Kalimantan Timur', kota: 'Balikpapan', kecamatan: 'Balikpapan Timur' },
    { id: 10, namaTim: 'Nusantara Maju', sekolah: 'SMP Negeri 5 Samarinda', jenjang: 'SMP/MTs Sederajat', provinsi: 'Kalimantan Timur', kota: 'Samarinda', kecamatan: 'Samarinda Ilir' },
    { id: 11, namaTim: 'Putra Sejati', sekolah: 'SMP Negeri 12 Pontianak', jenjang: 'SMP/MTs Sederajat', provinsi: 'Kalimantan Barat', kota: 'Pontianak', kecamatan: 'Pontianak Kota' },
    { id: 12, namaTim: 'Pelita', sekolah: 'SMA Negeri 2 Balikpapan', jenjang: 'SMA/SMK/MA Sederajat', provinsi: 'Kalimantan Timur', kota: 'Balikpapan', kecamatan: 'Balikpapan Kota' },
    { id: 13, namaTim: 'Matahari', sekolah: 'SD Negeri 2 Samarinda', jenjang: 'SD/MI Sederajat', provinsi: 'Kalimantan Timur', kota: 'Samarinda', kecamatan: 'Samarinda Ulu' },
    { id: 14, namaTim: 'Pelangi', sekolah: 'SMP Negeri 45 Pontianak', jenjang: 'SMP/MTs Sederajat', provinsi: 'Kalimantan Barat', kota: 'Pontianak', kecamatan: 'Pontianak Selatan' },
    { id: 15, namaTim: 'Semangat', sekolah: 'SMA Negeri 5 Palangkaraya', jenjang: 'SMA/SMK/MA Sederajat', provinsi: 'Kalimantan Tengah', kota: 'Palangkaraya', kecamatan: 'Jekan Raya' },
  ];

  // search + filters state
  const [query, setQuery] = useState('');
  const [filterJenjang, setFilterJenjang] = useState('semua');
  const [filterProvinsi, setFilterProvinsi] = useState('semua');
  const [filterKota, setFilterKota] = useState('semua');
  const [filterKecamatan, setFilterKecamatan] = useState('semua');

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);

  // derive dropdown options from data
  const jenjangOptions = useMemo(() => ['semua', ...Array.from(new Set(initialData.map(d => d.jenjang)))], []);
  const provinsiOptions = useMemo(() => ['semua', ...Array.from(new Set(initialData.map(d => d.provinsi)))], []);
  const kotaOptions = useMemo(() => ['semua', ...Array.from(new Set(initialData.map(d => d.kota)))], []);
  const kecOptions = useMemo(() => ['semua', ...Array.from(new Set(initialData.map(d => d.kecamatan)))], []);

  // filtering logic
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return initialData.filter(item => {
      const matchesQuery = q === '' ||
        item.namaTim.toLowerCase().includes(q) ||
        item.sekolah.toLowerCase().includes(q) ||
        item.jenjang.toLowerCase().includes(q) ||
        item.provinsi.toLowerCase().includes(q) ||
        item.kota.toLowerCase().includes(q) ||
        item.kecamatan.toLowerCase().includes(q);

      const matchesJenjang = filterJenjang === 'semua' || item.jenjang === filterJenjang;
      const matchesProv = filterProvinsi === 'semua' || item.provinsi === filterProvinsi;
      const matchesKota = filterKota === 'semua' || item.kota === filterKota;
      const matchesKec = filterKecamatan === 'semua' || item.kecamatan === filterKecamatan;

      return matchesQuery && matchesJenjang && matchesProv && matchesKota && matchesKec;
    });
  }, [query, filterJenjang, filterProvinsi, filterKota, filterKecamatan]);

  // pagination helpers
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / resultsPerPage));
  const paginated = filtered.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);

  const changeResultsPerPage = (v) => {
    setResultsPerPage(Number(v));
    setCurrentPage(1);
  }

  // small responsive helpers for table columns collapse on small screens

  return (
    <div className="flex bg-gray-100 min-h-screen font-inter">
      <div className={`w-full overflow-hidden pt-16 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'} transition-all duration-300`}>
        <div className="p-6 max-w-7xl mx-auto">

          {/* header */}
          <header className="text-gray-900 font-semibold text-3xl pb-2 border-b-2 border-gray-200 mb-6">Tim Terdaftar</header>

          {/* top cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <SimpleCards title="Total Tim Terdaftar" count={15} color="orange" />
            <SimpleCards title="SMA/SMK/MA Sederajat" count={5} color="gray" />
            <SimpleCards title="SMP/MTs Sederajat" count={5} color="blue" />
            <SimpleCards title="SD/MI Sederajat" count={5} color="red" />
          </div>

          {/* search + filters */}
          <div className="flex flex-col lg:flex-row gap-3 items-start mb-4">
            <div className="relative w-full lg:w-2/4">
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input value={query} onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }} placeholder="Cari nama tim, sekolah, kota..." className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:ring-[#3454D1] focus:border-[#3454D1]" />
            </div>

            <div className="flex gap-2 flex-wrap">
              <select value={filterJenjang} onChange={(e) => { setFilterJenjang(e.target.value); setCurrentPage(1); }} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                {jenjangOptions.map((j) => <option key={j} value={j}>{j === 'semua' ? 'Jenjang' : j}</option>)}
              </select>

              <select value={filterProvinsi} onChange={(e) => { setFilterProvinsi(e.target.value); setCurrentPage(1); }} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                {provinsiOptions.map((p) => <option key={p} value={p}>{p === 'semua' ? 'Provinsi' : p}</option>)}
              </select>

              <select value={filterKota} onChange={(e) => { setFilterKota(e.target.value); setCurrentPage(1); }} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                {kotaOptions.map((k) => <option key={k} value={k}>{k === 'semua' ? 'Kota' : k}</option>)}
              </select>

              <select value={filterKecamatan} onChange={(e) => { setFilterKecamatan(e.target.value); setCurrentPage(1); }} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                {kecOptions.map((c) => <option key={c} value={c}>{c === 'semua' ? 'Kecamatan' : c}</option>)}
              </select>
            </div>
          </div>

          {/* table */}
          <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-white uppercase bg-[#3454D1]">
                <tr>
                  <th className="px-3 py-3">Nama Tim</th>
                  <th className="px-3 py-3">Nama Sekolah</th>
                  <th className="px-3 py-3">Jenjang</th>
                  <th className="px-3 py-3">Provinsi</th>
                  <th className="px-3 py-3">Kota</th>
                  <th className="px-3 py-3">Kecamatan</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-500">Tidak ada data</td>
                  </tr>
                ) : (
                  paginated.map((row, idx) => (
                    <tr key={row.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-200 hover:bg-gray-50`}>
                      <td className="px-3 py-2 font-medium whitespace-nowrap">{row.namaTim}</td>
                      <td className="px-3 py-2">{row.sekolah}</td>
                      <td className="px-3 py-2">{row.jenjang}</td>
                      <td className="px-3 py-2">{row.provinsi}</td>
                      <td className="px-3 py-2">{row.kota}</td>
                      <td className="px-3 py-2">{row.kecamatan}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* footer pagination */}
          <div className="flex items-center justify-between gap-4 mt-4">
            <div className="text-xs text-gray-500">{totalItems === 0 ? '0 data' : `${(currentPage - 1) * resultsPerPage + 1}–${Math.min(currentPage * resultsPerPage, totalItems)} of ${totalItems}`}</div>

            <div className="flex items-center gap-3">
              <div className="flex items-center text-sm">
                <span className="text-gray-700 mr-2 hidden sm:inline">Result per page</span>
                <select value={resultsPerPage} onChange={(e) => changeResultsPerPage(e.target.value)} className="border border-gray-300 rounded-lg p-1 shadow-sm text-sm">
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>

              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="h-8 px-3 text-sm bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-l-lg disabled:opacity-50">Back</button>

              {/* page numbers (compact) */}
              <div className="hidden sm:flex items-center">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => setCurrentPage(i + 1)} className={`h-8 w-8 text-sm font-medium transition-colors duration-150 border-y border-gray-300 ${currentPage === i + 1 ? 'bg-[#3454D1] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                    {i + 1}
                  </button>
                ))}
              </div>

              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="h-8 px-3 text-sm bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-r-lg disabled:opacity-50">Next</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TimTerdaftarMember;
