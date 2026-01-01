import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import InputField from '../../components/ui/InputField';
import StepsIndicator from '../../components/registration/StepsIndicator';
import ComboBox from '../../components/ui/Combobox';
import UploadModal from '../../components/registration/UploadModal';
import AuditModal from '../../components/registration/AuditModal';
import authService from '../../services/auth_service';
import teamService from '../../services/team_service';
import memberService from '../../services/member_service';
import registrationService from '../../services/registration_service';
import schoolService from '../../services/school_service';
import { CheckCircle } from 'lucide-react';

import {
    Users,
    User,
    ScrollText,
    CircleUserRound,
    Binary,
    Upload,
    Pen,
    PenLine,
    Save,
    Loader2,
    Check,
} from 'lucide-react';
import SuccessModal from '../../components/ui/SuccessModal';

const defaultMember = {
    member_name: '',
    nisn: '',
    member_grade: '',
    gender: '',
    email: '',
};

const gradeOptionsByLevel = {
    'SD/MI Sederajat': ['1', '2', '3', '4', '5', '6'],
    'SMP/MTs Sederajat': ['7', '8', '9'],
    'SMA/SMK/MA Sederajat': ['10', '11', '12'],
};

const RegistrationPage = () => {
    const nav = useNavigate();
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        schoolName: '',
        school_Level: '',
        province: '',
        city: '',
        subdistrict: '',
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
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const [schools, setSchools] = useState([]);
    const [membersSaved, setMembersSaved] = useState(false);
    const [photoUploaded, setPhotoUploaded] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await schoolService.getSchools();
                setSchools(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                console.error('Failed to fetch schools:', err);
            }
        };
        fetchSchools();
    }, []);

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
            setMembersSaved(false);
            setPhotoUploaded(false);
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

    const step3Validation = useMemo(() => {
        return formData.members.some(
            (member) =>
                !member.member_name ||
                !member.nisn ||
                !member.gender ||
                !member.member_grade ||
                !member.email
        );
    }, [formData.members]);

    const registrationSteps = [
        {
            title: 'Buat Akun',
            description: 'Pembuatan Akun Tim',
            icon: <CircleUserRound className="w-4 h-4" />,
        },
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
            title: 'Kode Tim',
            description: 'Menerima Kode Tim untuk Proses Login',
            icon: <Binary className="w-4 h-4" />,
        },
    ];

    const [currentStep, setCurrentStep] = useState(1);

    const handleSignUpMembers = async () => {
        setError('');
        try {
            if (currentStep === 3) {
                const filledMembers = formData.members.filter(
                    (m) =>
                        m.member_name &&
                        m.nisn &&
                        m.gender &&
                        m.member_grade &&
                        m.email
                );
                if (filledMembers.length < 13) {
                    throw new Error('Minimal 13 anggota tim');
                }

                setIsLoading(true);
                const membersPayload = formData.members
                    .filter((m) => m.member_name)
                    .map((m) => ({
                        member_name: m.member_name,
                        nisn: m.nisn,
                        gender: m.gender,
                        member_grade: m.member_grade,
                        email: m.email,
                    }));
                console.log('RAW MEMBERS:', formData.members);
                console.log('PAYLOAD MEMBERS:', membersPayload);

                const response =
                    await memberService.signupBulkMembers(membersPayload);
                const result = response.data;

                setMembersSaved(true);

                if (result.failed_count > 0) {
                    const failedList = result.failed_members
                        .map((m) => `${m.email} (${m.reason})`)
                        .join(', ');
                    setSuccessMessage(
                        `Data Anggota Berhasil Disimpan, namun terdapat ${result.failed_count} anggota yang gagal: ${failedList}. Mohon periksa ulang dan simpan kembali.`
                    );
                } else {
                    setSuccessMessage('Data Anggota Berhasil Ditambahkan');
                }
                setShowSuccess(true);
            }
        } catch (err) {
            console.error(err);
            let msg = 'Terjadi kesalahan saat menyimpan anggota';
            if (err.response?.data?.detail) {
                const detail = err.response.data.detail;
                if (typeof detail === 'object') {
                    msg = detail.message || 'Gagal menyimpan data';
                    if (detail.errors && Array.isArray(detail.errors)) {
                        const errorList = detail.errors
                            .map((e) => `${e.email}: ${e.reason}`)
                            .join(', ');
                        msg += `: ${errorList}`;
                    }
                } else {
                    msg = detail;
                }
            } else if (err.message) {
                msg = err.message;
            }
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNext = async () => {
        setError('');
        try {
            if (currentStep === 1) {
                if (
                    !formData.email ||
                    !formData.password ||
                    !formData.confirmPassword
                ) {
                    throw new Error('Mohon lengkapi data akun');
                }
                if (formData.password !== formData.confirmPassword) {
                    throw new Error('Password konfirmasi tidak sama');
                }

                setIsLoading(true);
                const user = await authService.registerTeamAdmin({
                    email: formData.email,
                    password: formData.password,
                });
                console.log('REGISTER RESPONSE:', user);
                setIsLoading(false);
                setCurrentStep(currentStep + 1);
            } else if (currentStep === 2) {
                if (
                    !formData.teamName ||
                    !formData.schoolName ||
                    !formData.coachName ||
                    !formData.kontak ||
                    !formData.school_Level ||
                    !formData.province ||
                    !formData.city ||
                    !formData.subdistrict
                ) {
                    throw new Error('Mohon lengkapi data tim wajib');
                }

                setIsLoading(true);
                const teamPayload = {
                    team_name: formData.teamName,
                    coach_name: formData.coachName,
                    supervisor_name: formData.mentorName,
                    contact: formData.kontak,
                    school_name: formData.schoolName,
                    school_level: formData.school_Level,
                    city: formData.city,
                    province: formData.province,
                    subdistrict: formData.subdistrict,
                };
                await teamService.createTeam(teamPayload);

                if (selectedFile) {
                    await teamService.uploadTeamLogo(selectedFile);
                }
                setIsLoading(false);
                setCurrentStep(currentStep + 1);
            } else if (currentStep === 3) {
                setIsLoading(false);
                setCurrentStep(currentStep + 1);
            } else if (currentStep === 4) {
                if (!formData.payment.proofImage) {
                    throw new Error('Mohon upload bukti pembayaran');
                }

                setIsLoading(true);
                await registrationService.uploadPaymentProof(
                    formData.payment.proofImage
                );

                // Fetch code before changing step to ensure we have it and token is valid
                const codeData = await teamService.getTeamCode();
                setTeamCode(codeData.data.team_code);

                setIsLoading(false);
                setCurrentStep(currentStep + 1);
            }
        } catch (err) {
            setIsLoading(false);
            console.error(err);
            const msg =
                err?.detail ||
                err?.response?.data?.detail ||
                err?.response?.data?.message ||
                err.message ||
                'Terjadi kesalahan';
            setError(msg);
            window.scrollTo(0, 0);
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const levelOptions = useMemo(() => {
        if (!Array.isArray(schools)) return [];
        return Array.from(new Set(schools.map((s) => s.school_level)))
            .filter((level) => level)
            .sort();
    }, [schools]);

    const schoolsByLevel = useMemo(() => {
        if (!Array.isArray(schools)) return [];
        if (!formData.school_Level) return schools;
        return schools.filter((s) => s.school_level === formData.school_Level);
    }, [formData.school_Level, schools]);

    const provinceOptions = useMemo(() => {
        const setProv = new Set(schoolsByLevel.map((s) => s.province));
        return Array.from(setProv).sort();
    }, [schoolsByLevel]);

    const cityOptions = useMemo(() => {
        const filtered = formData.province
            ? schoolsByLevel.filter((s) => s.province === formData.province)
            : schoolsByLevel;
        return Array.from(new Set(filtered.map((s) => s.city))).sort();
    }, [schoolsByLevel, formData.province]);

    const districtOptions = useMemo(() => {
        const filtered = formData.city
            ? schoolsByLevel.filter((s) => s.city === formData.city)
            : schoolsByLevel;
        return Array.from(new Set(filtered.map((s) => s.subdistrict))).sort();
    }, [schoolsByLevel, formData.city]);

    const schoolNameOptions = useMemo(() => {
        let filtered = schoolsByLevel;
        if (formData.province)
            filtered = filtered.filter((s) => s.province === formData.province);
        if (formData.city)
            filtered = filtered.filter((s) => s.city === formData.city);
        if (formData.subdistrict)
            filtered = filtered.filter(
                (s) => s.subdistrict === formData.subdistrict
            );
        return Array.from(new Set(filtered.map((s) => s.school_name))).sort();
    }, [
        schoolsByLevel,
        formData.province,
        formData.city,
        formData.subdistrict,
    ]);

    const handleSelectLevel = (level) => {
        setFormData((prev) => ({
            ...prev,
            school_Level: level,
            schoolName: '',
            province: '',
            city: '',
            subdistrict: '',
        }));
    };

    const handleSelectSchool = (schoolName) => {
        const s = schools.find((x) => x.school_name === schoolName);
        if (s) {
            setFormData((prev) => ({
                ...prev,
                schoolName: s.school_name,
                school_Level: s.school_level || prev.school_Level,
                province: s.province || prev.province,
                city: s.city || prev.city,
                subdistrict: s.subdistrict || prev.subdistrict,
            }));
        } else {
            setFormData((prev) => ({ ...prev, schoolName }));
        }
    };

    const handleSelectProvince = (province) => {
        setFormData((prev) => ({
            ...prev,
            province,
            city: '',
            subdistrict: '',
            schoolName: '',
        }));
    };

    const handleSelectCity = (city) => {
        const s = schools.find(
            (x) =>
                x.city === city &&
                (!formData.school_Level ||
                    x.school_level === formData.school_Level)
        );
        setFormData((prev) => ({
            ...prev,
            city,
            province: s?.province || prev.province,
            subdistrict: '',
            schoolName: '',
        }));
    };

    const handleSelectDistrict = (subdistrict) => {
        const s = schools.find(
            (x) =>
                x.subdistrict === subdistrict &&
                (!formData.school_Level ||
                    x.school_level === formData.school_Level)
        );
        setFormData((prev) => ({
            ...prev,
            subdistrict,
            city: s?.city || prev.city,
            province: s?.province || prev.province,
            schoolName: '',
        }));
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleProcessUpload = async (file) => {
        if (file) {
            try {
                setIsUploading(true);
                await registrationService.uploadRawPhoto(file);
                setIsModalOpen(false);
                setIsAuditModalOpen(true);
            } catch (e) {
                console.error(e);
                alert('Gagal mengupload file.');
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleAuditSuccess = () => {
        setIsAuditModalOpen(false);
        setPhotoUploaded(true);
        setSuccessMessage('Verifikasi Foto Berhasil');
        setShowSuccess(true);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12 flex flex-col gap-10 items-center">
            <div className="w-full max-w-6xl px-4 md:px-0">
                <StepsIndicator
                    steps={registrationSteps}
                    currentStep={currentStep}
                />
            </div>

            {error && (
                <div className="w-full max-w-6xl bg-red-100 border border-simbaris-hazard-light text-simbaris-hazard px-2 py-3 rounded">
                    <span>
                        {error}
                        {error &&
                            error.includes('terdaftar') &&
                            '. Coba hubungi Panitia untuk pemulihan akun atau coba untuk Login'}
                    </span>
                </div>
            )}

            <div className="w-full max-w-7xl">
                {currentStep === 1 && (
                    <div className="flex items-center justify-center mt-10 bg-transparent">
                        <div className="bg-white p-11 mx-4 md:px-24 md:py-16 md:mx-8 rounded-lg shadow-md">
                            <div className="flex justify-center mb-6">
                                <img
                                    src="/images/logo_simbaris_lined.png"
                                    alt="SIMBARIS"
                                    className="w-48 md:w-auto"
                                />
                            </div>
                            <div className="space-y-2">
                                <InputField
                                    label=""
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    type="email"
                                    className="text-sm md:text-base"
                                />
                                <InputField
                                    label=""
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Password"
                                    type="password"
                                    className="text-sm md:text-base"
                                />
                                <InputField
                                    label=""
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Konfirmasi Password"
                                    type="password"
                                    className="text-sm md:text-base"
                                />

                                <div className="flex flex-col-reverse md:flex-row md:justify-end pt-8 gap-4 mt-6">
                                    <Button
                                        onClick={() =>
                                            nav('/', { replace: true })
                                        }
                                        color="primary"
                                        variant="outline"
                                        size="default"
                                        text="← Kembali"
                                        disabled={isLoading}
                                        className="w-full text-sm md:text-base"
                                    />
                                    <Button
                                        onClick={handleNext}
                                        color="accent"
                                        size="default"
                                        text={
                                            isLoading
                                                ? 'Membuat Akun'
                                                : 'Buat Akun!'
                                        }
                                        disabled={isLoading}
                                        leftIcon={
                                            isLoading ? (
                                                <Loader2
                                                    size={18}
                                                    className="animate-spin"
                                                />
                                            ) : null
                                        }
                                        className={`w-full text-sm md:text-base`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
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
                                    {/* Jenjang */}
                                    <ComboBox
                                        label="Jenjang Sekolah"
                                        placeholder="Pilih jenjang"
                                        options={levelOptions}
                                        value={formData.school_Level}
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
                                        value={formData.subdistrict}
                                        onSelect={handleSelectDistrict}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                )}

                {currentStep === 3 && (
                    <div className="bg-white p-4 mx-4 md:p-8 md:mx-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            DATA ANGGOTA TIM
                        </h2>
                        <div className="space-y-2">
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
                                            value={member.member_name}
                                            onChange={(e) =>
                                                handleMemberChange(
                                                    index,
                                                    'member_name',
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
                                        <ComboBox
                                            label="Jenis Kelamin"
                                            placeholder="Pilih jenis kelamin"
                                            options={['Laki-Laki', 'Perempuan']}
                                            value={member.gender}
                                            onSelect={(val) =>
                                                handleMemberChange(
                                                    index,
                                                    'gender',
                                                    val
                                                )
                                            }
                                        />
                                        <ComboBox
                                            label="Kelas"
                                            placeholder="Pilih kelas"
                                            options={
                                                gradeOptionsByLevel[
                                                    formData.school_Level
                                                ] || []
                                            }
                                            value={member.member_grade}
                                            onSelect={(val) =>
                                                handleMemberChange(
                                                    index,
                                                    'member_grade',
                                                    val
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputField
                                            label="Email"
                                            value={member.email}
                                            type="email"
                                            onChange={(e) =>
                                                handleMemberChange(
                                                    index,
                                                    'email',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Masukkan Email"
                                        />
                                    </div>
                                </div>
                            ))}
                            <div className="flex-col flex gap-3 md:flex-row md:justify-between">
                                {formData.members.length < 18 && (
                                    <button
                                        type="button"
                                        onClick={handleAddMember}
                                        className="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                                    >
                                        + Anggota
                                    </button>
                                )}
                                <div className="flex flex-col gap-3 md:flex-row items-center ">
                                    <Button
                                        disabled={
                                            step3Validation ||
                                            isLoading ||
                                            membersSaved
                                        }
                                        color="accent"
                                        size="long"
                                        text={
                                            membersSaved
                                                ? 'Data Anggota Tersimpan'
                                                : 'Simpan Data Anggota'
                                        }
                                        onClick={handleSignUpMembers}
                                        className="w-fit"
                                        leftIcon={
                                            isLoading ? (
                                                <Loader2
                                                    className="animate-spin"
                                                    size={18}
                                                />
                                            ) : membersSaved ? (
                                                <CheckCircle />
                                            ) : (
                                                <Save size={18} />
                                            )
                                        }
                                    />
                                    <a
                                        href="https://www.canva.com/design/DAG5kSicvtY/BXo_38G0V_om296veat4Fg/edit?utm_content=DAG5kSicvtY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button
                                            color="secondary"
                                            size="long"
                                            text="Edit Form Foto"
                                            leftIcon={<PenLine size={18} />}
                                        />
                                    </a>
                                    <Button
                                        onClick={handleOpenModal}
                                        disabled={
                                            step3Validation ||
                                            !membersSaved ||
                                            photoUploaded
                                        }
                                        color="success"
                                        size="long"
                                        text={
                                            photoUploaded
                                                ? 'Verifikasi Foto Berhasil'
                                                : 'Upload Form Foto'
                                        }
                                        leftIcon={
                                            photoUploaded ? (
                                                <CheckCircle size={18} />
                                            ) : (
                                                <Upload size={18} />
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <UploadModal
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            onProcess={handleProcessUpload}
                            title={'Upload Form Foto'}
                            isLoading={isUploading}
                        />
                        <AuditModal
                            isOpen={isAuditModalOpen}
                            onClose={() => setIsAuditModalOpen(false)}
                            onSaveSuccess={handleAuditSuccess}
                            isLoading={isUploading}
                        />
                    </div>
                )}

                {currentStep === 4 && (
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
                                    <div className="flex gap-2 ">
                                        <img
                                            src="/images/logo_mandiri.png"
                                            alt="Mandiri"
                                            className="h-8"
                                        />
                                        <img
                                            src="/images/logo_bni.png"
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
                                                src="/images/logo_mandiri.png"
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
                                                src="/images/logo_bni.png"
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
                                            className="max-w-3xl"
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
                                Simpan kode ini untuk proses login anggota tim.
                            </p>
                        </div>

                        <div className="mt-8">
                            <Button
                                onClick={() => {
                                    window.location.href = '/login';
                                    localStorage.removeItem(
                                        'registration_token'
                                    );
                                }}
                                color="primary"
                                size="default"
                                className="w-full"
                                text="Proses ke Halaman Login"
                            />
                        </div>
                    </div>
                )}

                {currentStep !== 1 && currentStep !== 5 && (
                    <div className="flex flex-col-reverse md:flex-row md:justify-end gap-4 mt-8 mx-4 md:mx-8">
                        <Button
                            onClick={handlePrev}
                            disabled={currentStep === 1 || isLoading}
                            color="secondary"
                            type="secondary"
                            size="default"
                            text={isLoading ? 'Loading...' : '← Kembali'}
                            leftIcon={
                                isLoading ? (
                                    <Loader2
                                        className="animate-spin"
                                        size={18}
                                    />
                                ) : null
                            }
                            className="w-full md:w-40"
                        />
                        <Button
                            onClick={handleNext}
                            disabled={
                                currentStep === registrationSteps.length ||
                                isLoading ||
                                (currentStep === 3 &&
                                    (!membersSaved || !photoUploaded))
                            }
                            color="accent"
                            size="default"
                            text={isLoading ? 'Loading...' : 'Selanjutnya →'}
                            leftIcon={
                                isLoading ? (
                                    <Loader2
                                        className="animate-spin"
                                        size={18}
                                    />
                                ) : null
                            }
                            className="w-full md:w-40"
                        />
                    </div>
                )}
            </div>
            <SuccessModal
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                title={'Berhasil Menambahkan'}
                message={successMessage}
            />
        </div>
    );
};

export default RegistrationPage;
