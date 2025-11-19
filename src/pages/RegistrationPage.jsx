import React, { useState, useRef, useMemo } from 'react';
import Button from '../components/Button';
import InputField from '../components/inputs/InputField';
import StepsIndicator from '../components/registration/StepsIndicator';
import ComboBox from '../components/inputs/Combobox';
import schoolList from '../dummy/schoolList';
import {
    Users,
    User,
    ScrollText,
    CircleUserRound,
    Binary,
    Upload,
} from 'lucide-react';

const defaultMember = {
    fullName: '',
    nik: '',
    nisn: '',
    grade: '',
    birthPlace: '',
};

const RegistrationPage = () => {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        schoolName: '',
        schoolLevel: '',
        province: '',
        city: '',
        district: '',
        teamName: '',
        coachName: '',
        mentorName: '',
        kontak: '',
        email: '',
        members: Array.from({ length: 13 }, () => ({ ...defaultMember })),
        payment: {
            method: '',
            proofImage: null,
        },
    });

    const [selectedBank, setSelectedBank] = useState(null);
    const [teamCode, setTeamCode] = useState('XXXX-XXXX-XXXX');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleMemberChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedMembers = [...prev.members];
            updatedMembers[index] = {
                ...updatedMembers[index],
                [field]: value,
            };
            return {
                ...prev,
                members: updatedMembers,
            };
        });
    };

    const handleAddMember = () => {
        setFormData((prev) => ({
            ...prev,
            members: [...prev.members, { ...defaultMember }],
        }));
    };

    const handleRemoveMember = (indexToRemove) => {
        if (formData.members.length > 13) {
            setFormData((prev) => ({
                ...prev,
                members: prev.members.filter(
                    (_, index) => index !== indexToRemove
                ),
            }));
        }
    };

    const registrationSteps = [
        {
            title: 'Data Tim',
            description: 'Input Data Tim dan Sekolah Asal Tim',
            icon: <Users className="w-4 h-4" />,
        },
        {
            title: 'Data Anggota Tim',
            description: 'Input Data Masing-Masing Anggota Tim',
            icon: <User className="w-4 h-4" />,
        },
        {
            title: 'Pembayaran',
            description: 'Metode Pembayaran dan Bukti Pembayaran',
            icon: <ScrollText className="w-4 h-4" />,
        },
        {
            title: 'Akun Tim',
            description: 'Pembuatan Akun Tim',
            icon: <CircleUserRound className="w-4 h-4" />,
        },
        {
            title: 'Kode Tim',
            description: 'Menerima Kode Tim untuk Proses Login',
            icon: <Binary className="w-4 h-4" />,
        },
    ];

    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        if (currentStep < registrationSteps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // ---------- Derived option lists (memoized) ----------
    // Jenjang unik
    const levelOptions = useMemo(() => {
        return Array.from(new Set(schoolList.map((s) => s.level))).sort();
    }, []);

    // Sekolah yang sesuai dengan jenjang (jika jenjang dipilih)
    const schoolsByLevel = useMemo(() => {
        if (!formData.schoolLevel) return schoolList;
        return schoolList.filter((s) => s.level === formData.schoolLevel);
    }, [formData.schoolLevel]);

    // Provinsi berdasarkan sekolah yang ada pada konteks (filtered by jenjang kalau ada)
    const provinceOptions = useMemo(() => {
        const setProv = new Set(schoolsByLevel.map((s) => s.province));
        return Array.from(setProv).sort();
    }, [schoolsByLevel]);

    // Kota berdasarkan provinsi & jenjang
    const cityOptions = useMemo(() => {
        const filtered = formData.province
            ? schoolsByLevel.filter((s) => s.province === formData.province)
            : schoolsByLevel;
        return Array.from(new Set(filtered.map((s) => s.city))).sort();
    }, [schoolsByLevel, formData.province]);

    // Kecamatan berdasarkan kota & kontekst jenjang
    const districtOptions = useMemo(() => {
        const filtered = formData.city
            ? schoolsByLevel.filter((s) => s.city === formData.city)
            : schoolsByLevel;
        return Array.from(new Set(filtered.map((s) => s.district))).sort();
    }, [schoolsByLevel, formData.city]);

    // Sekolah (nama) berdasarkan jenjang, provinsi, kota, kecamatan
    const schoolNameOptions = useMemo(() => {
        let filtered = schoolsByLevel;
        if (formData.province)
            filtered = filtered.filter((s) => s.province === formData.province);
        if (formData.city)
            filtered = filtered.filter((s) => s.city === formData.city);
        if (formData.district)
            filtered = filtered.filter((s) => s.district === formData.district);
        return Array.from(new Set(filtered.map((s) => s.school_name))).sort();
    }, [schoolsByLevel, formData.province, formData.city, formData.district]);

    // ---------- Handlers untuk autofill dan filter chain ----------
    const handleSelectLevel = (level) => {
        setFormData((prev) => ({
            ...prev,
            schoolLevel: level,
            // reset dependent fields when jenjang changes
            schoolName: '',
            province: '',
            city: '',
            district: '',
        }));
    };

    const handleSelectSchool = (schoolName) => {
        const s = schoolList.find((x) => x.school_name === schoolName);
        if (s) {
            setFormData((prev) => ({
                ...prev,
                schoolName: s.school_name,
                schoolLevel: s.level || prev.schoolLevel,
                province: s.province || prev.province,
                city: s.city || prev.city,
                district: s.district || prev.district,
            }));
        } else {
            setFormData((prev) => ({ ...prev, schoolName }));
        }
    };

    const handleSelectProvince = (province) => {
        setFormData((prev) => ({
            ...prev,
            province,
            // if province changed, clear city and district because they may not belong
            city: '',
            district: '',
            // but keep schoolName only if it still matches (we keep it empty to be safe)
            schoolName: '',
        }));
    };

    const handleSelectCity = (city) => {
        // find a school that matches this city to determine its province (autofill province)
        const s = schoolList.find(
            (x) =>
                x.city === city &&
                (!formData.schoolLevel || x.level === formData.schoolLevel)
        );
        setFormData((prev) => ({
            ...prev,
            city,
            province: s?.province || prev.province,
            district: '',
            schoolName: '',
        }));
    };

    const handleSelectDistrict = (district) => {
        const s = schoolList.find(
            (x) =>
                x.district === district &&
                (!formData.schoolLevel || x.level === formData.schoolLevel)
        );
        setFormData((prev) => ({
            ...prev,
            district,
            city: s?.city || prev.city,
            province: s?.province || prev.province,
            schoolName: '',
        }));
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12 flex flex-col gap-10 items-center">
            <div className="w-full max-w-6xl px-4 md:px-0">
                <StepsIndicator
                    steps={registrationSteps}
                    currentStep={currentStep}
                />
            </div>

            <div className="w-full max-w-7xl">
                {currentStep === 1 && (
                    <form className="bg-white p-4 mx-4 md:p-8 md:mx-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            DATA TIM
                        </h2>

                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="w-full lg:w-1/3 flex flex-col items-center">
                                <div
                                    className="border-2 border-dashed border-gray-300 rounded-full p-8 text-center cursor-pointer h-60 w-60 md:h-80 md:w-80 flex items-center justify-center"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    <div className="flex flex-col items-center justify-center h-full">
                                        {selectedFile ? (
                                            <div className="mb-4">
                                                <img
                                                    src={URL.createObjectURL(
                                                        selectedFile
                                                    )}
                                                    alt="Preview"
                                                    className="object-contain max-h-48"
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <div className="mb-4">
                                                    <Upload className="w-12 h-12 text-gray-400" />
                                                </div>
                                                <p className="mb-2 font-medium">
                                                    Upload Logo (Required)
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Drop File or Click to Upload
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-2/3 space-y-4">
                                {/* Team Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField
                                        label="Nama Tim"
                                        name="teamName"
                                        value={formData.teamName}
                                        onChange={handleInputChange}
                                        placeholder="Masukkan nama tim"
                                    />
                                    <InputField
                                        label="Nama Pelatih"
                                        name="coachName"
                                        value={formData.coachName}
                                        onChange={handleInputChange}
                                        placeholder="Masukkan nama pelatih"
                                    />
                                </div>

                                {/* Contact Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField
                                        label="Nama Pembina"
                                        name="mentorName"
                                        value={formData.mentorName}
                                        onChange={handleInputChange}
                                        placeholder="Masukkan nama pembina"
                                    />
                                    <InputField
                                        label="Kontak Pelatih / Pembina"
                                        name="kontak"
                                        value={formData.kontak}
                                        onChange={handleInputChange}
                                        placeholder="Masukkan nomor kontak"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField
                                        label="Email Pelatih / Pembina"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        type="email"
                                        placeholder="Masukkan email"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Jenjang */}
                                    <ComboBox
                                        label="Jenjang Sekolah"
                                        placeholder="Pilih jenjang"
                                        options={levelOptions}
                                        value={formData.schoolLevel}
                                        onSelect={handleSelectLevel}
                                    />

                                    {/* Sekolah (nama) */}
                                    <ComboBox
                                        label="Nama Sekolah"
                                        placeholder="Pilih sekolah"
                                        options={schoolNameOptions}
                                        value={formData.schoolName}
                                        onSelect={handleSelectSchool}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Provinsi */}
                                    <ComboBox
                                        label="Provinsi"
                                        placeholder="Pilih provinsi"
                                        options={provinceOptions}
                                        value={formData.province}
                                        onSelect={handleSelectProvince}
                                    />

                                    {/* Kota */}
                                    <ComboBox
                                        label="Kota"
                                        placeholder="Pilih kota"
                                        options={cityOptions}
                                        value={formData.city}
                                        onSelect={handleSelectCity}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Kecamatan */}
                                    <ComboBox
                                        label="Kecamatan"
                                        placeholder="Pilih kecamatan"
                                        options={districtOptions}
                                        value={formData.district}
                                        onSelect={handleSelectDistrict}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                )}

                {currentStep === 2 && (
                    <div className="bg-white p-4 mx-4 md:p-8 md:mx-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            DATA ANGGOTA TIM
                        </h2>
                        <div className="space-y-8">
                            {formData.members.map((member, index) => (
                                <div key={index} className="space-y-4">
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Anggota {index + 1}
                                        </h3>
                                        {index >= 13 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveMember(index)
                                                }
                                                className="text-red-600 hover:text-red-800 font-medium"
                                            >
                                                - Anggota
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputField
                                            label="Nama Lengkap"
                                            value={member.fullName}
                                            onChange={(e) =>
                                                handleMemberChange(
                                                    index,
                                                    'fullName',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Masukkan nama lengkap"
                                        />
                                        <InputField
                                            label="NISN"
                                            value={member.nisn}
                                            onChange={(e) =>
                                                handleMemberChange(
                                                    index,
                                                    'nisn',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Masukkan NISN"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputField
                                            label="Jenis Kelamin"
                                            value={member.grade}
                                            onChange={(e) =>
                                                handleMemberChange(
                                                    index,
                                                    'grade',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Masukkan jenis kelamin"
                                        />
                                        <InputField
                                            label="Kelas"
                                            value={member.birthPlace}
                                            onChange={(e) =>
                                                handleMemberChange(
                                                    index,
                                                    'birthPlace',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Masukkan kelas"
                                        />
                                    </div>
                                </div>
                            ))}

                            {formData.members.length < 18 && (
                                <button
                                    type="button"
                                    onClick={handleAddMember}
                                    className="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                                >
                                    + Anggota
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="space-y-6 bg-white p-4 mx-4 md:p-8 md:mx-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            PEMBAYARAN
                        </h2>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold">
                                Total Pembayaran:
                            </h3>
                            <p className="text-2xl font-bold text-blue-900">
                                Rp. 500.000
                            </p>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold mb-2">
                                Instruksi Pembayaran
                            </h3>
                            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                                <li>Pilih metode pembayaran yang tersedia</li>
                                <li>Transfer sesuai dengan total pembayaran</li>
                                <li>
                                    Simpan bukti transfer (screenshot atau foto)
                                </li>
                                <li>Upload bukti transfer di form ini</li>
                                <li>
                                    Admin akan memverifikasi pembayaran dalam
                                    1x24 jam
                                </li>
                                <li>
                                    Setelah Tim dibuat, pemberian Kode Tim untuk
                                    login akan diberikan dan Tim dapat masuk ke
                                    halaman Dashboard yang masih berupa Ruang
                                    Tunggu
                                </li>
                                <li>
                                    Setelah verifikasi, Halaman Dashboard Tim
                                    siap digunakan
                                </li>
                            </ol>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold">
                                Metode Pembayaran:
                            </h3>

                            <div className="border rounded-lg p-4">
                                <div
                                    className={`flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between cursor-pointer p-2 rounded ${formData.payment.method === 'manual' ? 'bg-blue-50' : ''}`}
                                    onClick={() => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            payment: {
                                                ...prev.payment,
                                                method: 'manual',
                                            },
                                        }));
                                    }}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="font-medium">
                                            Transfer Bank Manual
                                        </span>
                                    </div>
                                    <div className="flex gap-2 self-end md:self-auto">
                                        <img
                                            src="/mandiri-logo.png"
                                            alt="Mandiri"
                                            className="h-8"
                                        />
                                        <img
                                            src="/bni-logo.png"
                                            alt="BNI"
                                            className="h-8"
                                        />
                                    </div>
                                </div>

                                {formData.payment.method === 'manual' && (
                                    <div className="mt-4 space-y-4">
                                        <div
                                            className="flex items-center gap-4 p-3 border rounded cursor-pointer hover:bg-gray-50"
                                            onClick={() =>
                                                setSelectedBank('mandiri')
                                            }
                                        >
                                            <img
                                                src="/mandiri-logo.png"
                                                alt="Mandiri"
                                                className="h-8"
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium">
                                                    Bank Mandiri - Siti Maemunah
                                                </p>
                                                <p className="text-gray-600">
                                                    0101010101
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            className="flex items-center gap-4 p-3 border rounded cursor-pointer hover:bg-gray-50"
                                            onClick={() =>
                                                setSelectedBank('bni')
                                            }
                                        >
                                            <img
                                                src="/bni-logo.png"
                                                alt="BNI"
                                                className="h-8"
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium">
                                                    Bank BNI - Siti Maemunah
                                                </p>
                                                <p className="text-gray-600">
                                                    1010101010
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="border rounded-lg p-4">
                                <div
                                    className={`flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between cursor-pointer p-2 rounded ${formData.payment.method === 'qris' ? 'bg-blue-50' : ''}`}
                                    onClick={() => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            payment: {
                                                ...prev.payment,
                                                method: 'qris',
                                            },
                                        }));
                                    }}
                                >
                                    <span className="font-medium">QRIS</span>
                                    <img
                                        src="/images/csan-qr-a.jpg"
                                        alt="QRIS"
                                        className="h-8"
                                    />
                                </div>

                                {formData.payment.method === 'qris' && (
                                    <div className="mt-4 flex justify-center">
                                        <img
                                            src="/images/csan-qr-a.jpg"
                                            alt="QRIS Code"
                                            className="max-w-xs"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mt-6">
                                <h3 className="font-semibold mb-4">
                                    Bukti Pembayaran
                                </h3>
                                <div
                                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
                                    onClick={() =>
                                        document
                                            .getElementById('proofUpload')
                                            .click()
                                    }
                                >
                                    <input
                                        id="proofUpload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    payment: {
                                                        ...prev.payment,
                                                        proofImage: file,
                                                    },
                                                }));
                                            }
                                        }}
                                    />
                                    {formData.payment.proofImage ? (
                                        <img
                                            src={URL.createObjectURL(
                                                formData.payment.proofImage
                                            )}
                                            alt="Payment Proof"
                                            className="max-h-40 mx-auto"
                                        />
                                    ) : (
                                        <div className="text-gray-500">
                                            <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                                            <p>Click to upload payment proof</p>
                                            <p className="text-sm">
                                                or drag and drop
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 4 && (
                    <div className="max-w-sm mx-auto bg-white rounded-lg p-6 md:p-8 shadow-md">
                        <div className="flex justify-center mb-6">
                            <img
                                src="/images/logo_simbaris_lined.png"
                                alt="SIMBARIS"
                                className="h-8"
                            />
                        </div>

                        <div className="space-y-2">
                            <InputField
                                label=""
                                name="teamAccount"
                                value={formData.teamAccount}
                                onChange={handleInputChange}
                                placeholder="Nama Tim"
                                type="text"
                            />
                            <InputField
                                label=""
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                                type="password"
                            />
                            <InputField
                                label=""
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Konfirmasi Password"
                                type="password"
                            />

                            <div className="flex flex-col-reverse md:flex-row md:justify-end pt-8 gap-4 mt-6">
                                <Button
                                    onClick={handlePrev}
                                    color="primary"
                                    variant="outline"
                                    size="default"
                                    text="← Kembali"
                                    className="w-full md:w-40"
                                />
                                <Button
                                    onClick={handleNext}
                                    disabled={
                                        currentStep === registrationSteps.length
                                    }
                                    color="accent"
                                    size="default"
                                    text="Buat Akun!"
                                    className="w-full md:w-40"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 5 && (
                    <div className="max-w-md mx-auto bg-white rounded-lg p-6 md:p-8 shadow-md text-center">
                        <div className="mb-6">
                            <div className="flex justify-center mb-4">
                                <div className="rounded-full bg-green-100 p-2">
                                    <svg
                                        className="w-6 h-6 text-green-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold mb-2">
                                Welcome to SIMBARIS!
                            </h2>
                            <p className="text-green-600 mb-8">
                                Registration successfull
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-blue-900 mb-4">
                                Ini Kode Tim Anda
                            </h3>
                            <div className="bg-blue-900 text-white py-4 px-6 rounded-lg text-2xl font-bold mb-2">
                                {teamCode}
                            </div>
                            <p className="text-sm text-gray-600">
                                Simpan kode ini untuk setiap proses login
                            </p>
                        </div>

                        <div className="mt-8">
                            <Button
                                onClick={() =>
                                    (window.location.href = '/login')
                                }
                                color="primary"
                                size="default"
                                className="w-full"
                                text="Proses ke Halaman Login"
                            />
                        </div>
                    </div>
                )}

                {currentStep !== 4 && currentStep !== 5 && (
                    <div className="flex flex-col-reverse md:flex-row md:justify-end gap-4 mt-8 mx-4 md:mx-8">
                        <Button
                            onClick={handlePrev}
                            disabled={currentStep === 1}
                            color="primary"
                            variant="outline"
                            size="default"
                            text="← Kembali"
                            className="w-full md:w-40"
                        />
                        <Button
                            onClick={handleNext}
                            disabled={currentStep === registrationSteps.length}
                            color="accent"
                            size="default"
                            text="Selanjutnya →"
                            className="w-full md:w-40"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegistrationPage;
