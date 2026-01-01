# Dokumentasi Fitur & Service Architecture

Dokumen ini berisi rangkuman fitur aplikasi berdasarkan routing (`App.jsx`) dan penjelasan teknis mengenai layer komunikasi data (Services).

## 1. Fitur Aplikasi & Halaman (`App.jsx`)

Aplikasi ini menggunakan React Router untuk navigasi dan membagi akses berdasarkan status autentikasi (`authUser`) dan peran pengguna (`role`).

### A. Halaman Publik (Public Routes)
Halaman-halaman ini dapat diakses tanpa login:
*   **Landing Page** (`/`): Halaman utama aplikasi.
*   **Login** (`/login`): Halaman masuk untuk pengguna.
*   **Pendaftaran** (`/pendaftaran`): Halaman registrasi awal (kemungkinan untuk membuat akun admin tim).
*   **Lupa Password**:
    *   `Confirm Email` (`/confirm-email`)
    *   `Restore Password` (`/restore-password`)

### B. Halaman Terproteksi (Protected Routes)
Halaman ini memerlukan token autentikasi yang valid. Jika pengguna belum login, akan diarahkan kembali ke `/login`.

*   **Dashboard** (`/dashboard/*`): Halaman utama setelah login. Konten bervariasi tergantung `userRole` (Committee, Team Admin, atau Member).
*   **Manajemen Tim Saya** (Khusus Team Admin/Member):
    *   **Detail Tim** (`/tim-saya/detail`): Melihat informasi tim sendiri.
    *   **Edit Tim** (`/tim-saya/detail/edit`): Mengubah data tim (Logo, Nama, dll).
    *   **Anggota Tim** (`/tim-saya/anggota`): Daftar anggota dalam tim.
    *   **Detail Anggota** (`/tim-saya/anggota/:memberId`): Detail spesifik satu anggota.
*   **Manajemen Pendaftaran (Committee/Admin)**:
    *   **Detail Pendaftaran** (`/detail-pendaftaran`): Melihat status pendaftaran tim sendiri.
    *   **List Tim Terdaftar** (`/tim-terdaftar`): Panitia melihat daftar seluruh tim yang mendaftar.
    *   **Detail Tim Terdaftar** (`/tim-terdaftar/detail/:registrationId`): Panitia melihat detail pendaftaran spesifik untuk verifikasi.

### C. Fitur Sistem & UI Logic
*   **Session Management**:
    *   Mendeteksi token kadaluarsa secara otomatis.
    *   Menampilkan `ExpiredSessionModal` jika sesi habis.
    *   Auto-redirect jika mengakses halaman login saat sudah terautentikasi.
*   **User Hydration**:
    *   Normalisasi data user dari API (menangani perbedaan struktur data antara `committee`, `team_admin`, dan `member`).
    *   Menghasilkan inisial nama dan avatar URL secara dinamis.
*   **Layouting**:
    *   **Sidebar & Header**: Tampil secara kondisional (disembunyikan di halaman Login/Landing).
    *   **Loading State**: Menangani transisi pengecekan token dengan spinner loading.

---

## 2. Service Layer Architecture (Fetching Data)

Aplikasi menggunakan pola **Service Repository** dengan `axios` sebagai HTTP client. Semua request API terpusat di folder `src/services`.

### A. Core Configuration (`api.js`)
File ini adalah fondasi komunikasi HTTP.
*   **Base URL**: `/api`
*   **Request Interceptor**:
    *   Secara otomatis menyisipkan Header `Authorization`.
    *   **Logika Dual Token**:
        *   Jika request memiliki config `authType: 'registration'`, maka menggunakan `registration_token` (biasanya untuk flow pendaftaran awal sebelum login penuh).
        *   Jika tidak, menggunakan `access_token` (Bearer Token standar untuk user yang sudah login).
*   **Response Interceptor**:
    *   Menangani error global.
    *   **Auto Logout**: Jika menerima status **401 Unauthorized** (kecuali pada endpoint login), sistem akan menghapus local storage dan memicu event `session-expired` untuk menendang user keluar.

### B. Penjelasan Per-Service

#### 1. Auth Service (`auth_service.js`)
Menangani autentikasi dan manajemen akun pengguna.
*   **Fitur**: Login, Logout, Register Team Admin, Reset/Update Password, Get Current User (`/me`).
*   **Storage**: Menyimpan `access_token`, `refresh_token`, dan data `user` di LocalStorage.

#### 2. Registration Service (`registration_service.js`)
Menangani alur pendaftaran lomba dan verifikasi.
*   **Fitur**:
    *   Melihat statistik pendaftaran.
    *   Upload bukti pembayaran (`uploadPaymentProof`).
    *   Upload foto mentah & audit foto.
    *   **Admin**: Verifikasi status pendaftaran (Verify/Reject) via `updateStatus`.
    *   **User**: Membatalkan pendaftaran (`cancelRegistration`).

#### 3. Member Service (`member_service.js`)
Menangani data individu/anggota tim.
*   **Fitur**:
    *   Mendapatkan data diri (`getMyData`).
    *   Mendaftarkan anggota secara massal (`signupBulkMembers`) - *Menggunakan authType registration*.
    *   Edit dan replace data anggota.
    *   Statistik gender.

#### 4. School Service (`school_service.js`)
Menangani data referensi sekolah.
*   **Fitur**:
    *   List sekolah dan detail sekolah.
    *   Membuat sekolah baru (`createSchool`) - *Menggunakan authType registration*.
    *   Statistik jenjang sekolah.

#### 5. Team Service (`team_service.js`)
Menangani entitas Tim.
*   **Fitur**:
    *   Membuat Tim (`createTeam`).
    *   Upload & Update Logo Tim.
    *   Mendapatkan Kode Tim (`getTeamCode`).
    *   Edit informasi tim sendiri.
