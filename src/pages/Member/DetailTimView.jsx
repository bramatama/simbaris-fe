import React from "react";

const DetailTimView = ({ isSidebarOpen = true }) => {
    return (
        <div className="flex bg-gray-100 min-h-screen font-inter">
            <div
                className={`w-full overflow-hidden pt-16 ${
                    isSidebarOpen ? "md:ml-64" : "ml-0"
                } transition-all duration-300`}
            >
                <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">

                    {/* HEADER */}
                    <header className="text-gray-900 font-semibold text-3xl pb-2 border-b-2 border-gray-200">
                        Tim Saya
                    </header>

                    {/* GRID LAYOUT: at lg -> 3 kolom dan 2 baris */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6">

                        {/* KIRI — gabung Data Tim + Data Sekolah */}
                        {/* important: lg:col-span-2 + lg:row-span-2 sehingga memanjang vertikal */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 lg:col-span-2 lg:row-span-2 h-full">
                            {/* DATA TIM */}
                            <h2 className="text-xl font-semibold mb-4 text-gray-900">
                                Data Tim
                            </h2>

                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Logo Tim */}
                                <div className="w-48 h-48 border-2 border-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                                    <img
                                        src="/mnt/data/2070f628-8fc1-4b09-9ddd-4ea9ff876bac.png"
                                        alt="Logo Tim"
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                {/* Info Tim */}
                                <div className="flex flex-col gap-3 w-full text-sm">
                                    {[
                                        ["Nama Tim", "Specta Squad"],
                                        ["Nama Pelatih", "Mariposa"],
                                        ["Nama Pembina", "Roman Reigns"],
                                        ["Kontak Pembina/Pelatih", "+62 812 3456 7890"],
                                        ["Email Pembina/Pelatih", "pelatihpembina@gmail.com"],
                                    ].map(([label, value], idx) => (
                                        <div
                                            key={idx}
                                            className="flex justify-between items-center text-base border-b border-gray-300 pb-1"
                                        >
                                            <span className="text-gray-700">{label}</span>
                                            <span className="font-medium text-gray-900 text-right">
                                                {value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>



                            {/* DATA SEKOLAH */}
                            <h2 className="text-xl font-semibold mb-4 text-gray-900">
                                Data Sekolah
                            </h2>

                            <div className="flex flex-col gap-3 text-sm">
                                {[
                                    ["Nama Sekolah", "SMP Negeri 18 Balikpapan"],
                                    ["Jenjang Sekolah", "SMP/MTs Sederajat"],
                                    ["Provinsi", "Kalimantan Timur"],
                                    ["Kota", "Balikpapan"],
                                    ["Kecamatan", "Balikpapan Selatan"],
                                ].map(([label, value], idx) => (
                                    <div
                                        key={idx}
                                        className="flex justify-between items-center text-base border-b border-gray-300 pb-1"
                                    >
                                        <span className="text-gray-700">{label}</span>
                                        <span className="font-medium text-gray-900 text-right">
                                            {value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* KANAN ATAS — NILAI & CATATAN JURI */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 flex flex-col items-center justify-center lg:col-span-1 lg:row-span-1">
                            <h2 className="text-xl font-semibold mb-4 text-gray-900">
                                Nilai dan Catatan Juri
                            </h2>
                            <p className="font-extrabold text-4xl text-gray-300 text-center p-8">
                                COMING SOON
                            </p>
                        </div>

                        {/* KANAN BAWAH — HASIL PERLOMBAAN */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 flex flex-col items-center justify-center lg:col-span-1 lg:row-span-1">
                            <h2 className="text-xl font-semibold mb-4 text-gray-900">
                                Hasil Perlombaan
                            </h2>
                            <p className="font-extrabold text-4xl text-gray-300 text-center p-8">
                                COMING SOON
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailTimView;
