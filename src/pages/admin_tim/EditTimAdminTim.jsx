import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import InputField from '../../components/ui/InputField';
import ComboBox from '../../components/ui/Combobox';
import teamService from '../../services/team_service';
import { Save, ArrowLeft, Upload } from 'lucide-react';
import ErrorPanel from '../../components/ui/ErrorPanel';
import SuccessModal from '../../components/ui/SuccessModal';

const EditTimAdminTim = ({ isSidebarOpen }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const fileInputRef = useRef(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        teamName: '',
        coachName: '',
        mentorName: '',
        kontak: '',
        schoolName: '',
        school_Level: '',
        province: '',
        city: '',
        district: '',
    });

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                setIsLoading(true);
                const response = await teamService.getMyTeam();
                const data = response.data;

                setFormData({
                    teamName: data.team_name || '',
                    coachName: data.coach_name || '',
                    mentorName: data.supervisor_name || '',
                    kontak: data.contact || '',
                    schoolName: data.schools?.school_name || '',
                    school_Level: data.schools?.school_level || '',
                    province: data.schools?.province || '',
                    city: data.schools?.city || '',
                    district: data.schools?.subdistrict || '',
                });

                if (data.logo_url || data.team_logo_url) {
                    setLogoPreview(data.logo_url || data.team_logo_url);
                }
            } catch (error) {
                console.error('Error fetching team data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeamData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    // School Logic from RegistrationPage
    const levelOptions = [
        'SD/MI Sederajat',
        'SMP/MTs Sederajat',
        'SMA/SMK/MA Sederajat',
    ];

    const handleSelectLevel = (level) => {
        setFormData((prev) => ({
            ...prev,
            school_Level: level,
        }));
    };

    const handleSubmit = async () => {
        setIsSaving(true);
        const payload = {
            team_name: formData.teamName,
            coach_name: formData.coachName,
            supervisor_name: formData.mentorName,
            contact: formData.kontak,
            schools: {
                school_name: formData.schoolName,
                school_level: formData.school_Level,
                province: formData.province,
                city: formData.city,
                subdistrict: formData.district,
            },
        };

        try {
            if (selectedFile) {
                await teamService.updateTeamLogo(selectedFile);
            }
            await teamService.editMyTeam(payload);
            setIsSuccessModalOpen(true);
        } catch (error) {
            return <ErrorPanel error={error} />;
        } finally {
            setIsSaving(false);
        }
    };
    return (
        <div className="flex bg-gray-100">
            <div
                className={`w-full min-h-screen overflow-hidden pt-16 ${
                    isSidebarOpen ? 'md:ml-64' : 'ml-0'
                } transition-all duration-300`}
            >
                <div className="flex flex-col gap-4 p-6">
                    <header className="flex items-center gap-4 text-simbaris-text font-semibold text-3xl">
                        <button
                            onClick={() => navigate('/tim-saya/detail')}
                            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                        >
                            <ArrowLeft size={28} />
                        </button>
                        Edit Data Tim
                    </header>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Data Tim
                        </h3>
                        {isLoading ? (
                            <div className="animate-pulse flex flex-col md:flex-row gap-8 items-center">
                                <div className="w-56 h-56 bg-gray-200 rounded-full flex-shrink-0"></div>
                                <div className="w-full space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-8 items-center">
                                <div className="flex justify-center">
                                    <div
                                        className="relative w-56 h-56 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden"
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                    >
                                        {logoPreview ? (
                                            <img
                                                src={logoPreview}
                                                alt="Logo Tim"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center text-gray-400">
                                                <Upload className="w-8 h-8 mb-1" />
                                                <span className="text-xs">
                                                    Upload Logo
                                                </span>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                    </div>
                                </div>
                                <div className="flex w-full flex-col ">
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
                                </div>
                            </div>
                        )}
                        <div className="border-t border-gray-200 my-4"></div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            Data Sekolah
                        </h3>
                        {isLoading ? (
                            <div className="animate-pulse space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                                </div>
                            </div>
                        ) : (
                            <div className="fex flex-col gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ComboBox
                                        label="Jenjang Sekolah"
                                        placeholder="Pilih jenjang"
                                        options={levelOptions}
                                        value={formData.school_Level}
                                        onSelect={handleSelectLevel}
                                    />
                                    <InputField
                                        label="Nama Sekolah"
                                        name="schoolName"
                                        value={formData.schoolName}
                                        onChange={handleInputChange}
                                        placeholder="Masukkan nama sekolah"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField
                                        label="Provinsi"
                                        name="province"
                                        value={formData.province}
                                        onChange={handleInputChange}
                                        placeholder="Masukkan provinsi"
                                    />
                                    <InputField
                                        label="Kota"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="Masukkan kota"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField
                                        label="Kecamatan"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleInputChange}
                                        placeholder="Masukkan kecamatan"
                                    />
                                </div>
                            </div>
                        )}
                        <div className="flex justify-end pt-4 gap-4">
                            <Button
                                onClick={() => navigate('/tim-saya/detail')}
                                color="secondary"
                                size="long"
                                text="Kembali"
                            />
                            <Button
                                onClick={handleSubmit}
                                color="accent"
                                size="long"
                                text={
                                    isSaving
                                        ? 'Menyimpan...'
                                        : 'Simpan Perubahan'
                                }
                                leftIcon={<Save className="w-4 h-4" />}
                                disabled={isSaving}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <SuccessModal
                isOpen={isSuccessModalOpen}
                onClose={() => navigate('/tim-saya/detail')}
                type="update"
                message="Data tim berhasil diperbarui."
            />
        </div>
    );
};
export default EditTimAdminTim;
