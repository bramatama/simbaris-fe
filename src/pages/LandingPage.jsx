import React from 'react';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-start text-black overflow-hidden">
      
      {/* Background Image (tetap di paling bawah) */}
      <img
        src="/images/gedungitk.png" 
        alt="Gedung Institut Teknologi Kalimantan"
        className="absolute inset-0 w-full h-full object-cover opacity-100"
      />

      {/* Layer Putih (Tambahan) - Anda bisa atur opacity-nya di sini */}
      {/* Contoh: opacity-50 atau opacity-75 */}
      <div className="absolute inset-0 bg-white opacity-50"></div> {/* <-- Layer putih yang Anda minta */}

      {/* Overlay Hitam (di atas layer putih) */}
      <div className="absolute inset-0 bg-black opacity-5"></div>

      {/* Konten Utama (di paling atas) */}
      <div className="relative z-10 p-6 md:p-8 pl-8 md:pl-16 lg:pl-24 max-w-5xl flex flex-col items-start justify-center">
        
        {/* Logo SIMBARIS */}
        <img
          src="/images/logosimbarisfull.png"
          alt="Logo SIMBARIS"
          className="w-64 md:w-72 h-auto mb-6 sm:mb-8"
        />

        {/* Teks Deskripsi Acara */}
        {/* Perhatikan: Teks di gambar referensi sebenarnya berwarna putih, bukan hitam */}
        <h2 className="text-xl md:text-2xl font-semibold text-black mb-1 drop-shadow-md">
          LKBB SPECTA
        </h2>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-wide mb-2 text-black drop-shadow-lg">
          LOMBA KETERAMPILAN
          <br className="hidden sm:inline" /> 
          BARIS-BERBARIS
        </h1>
        
        <p className="text-lg md:text-xl font-medium text-black mb-3 drop-shadow-md">
          Institut Teknologi Kalimantan
        </p>

        <p className="text-sm sm:text-base md:text-lg text-black mt-2 drop-shadow-md">
          Tingkat SD/MI - SMP/Mts - SMA/SMK/MA
          <br />
          <span className="font-bold">Kalimantan Open</span>
        </p>

        {/* Tombol Aksi Sesuai Palet Warna */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          
          {/* Tombol Primary: #0C305E */}
          <button className="btn bg-[#0C305E] hover:bg-blue-950 border-none rounded-md text-base sm:text-lg font-bold px-8 h-12 text-white normal-case shadow-lg">
            Daftarkan Timmu!
          </button>
          
          {/* Tombol Accent: #EA7A2E */}
          <button className="btn bg-[#EA7A2E] hover:bg-orange-600 border-none rounded-md text-base sm:text-lg font-bold px-8 h-12 text-white normal-case shadow-lg">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;