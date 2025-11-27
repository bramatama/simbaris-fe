import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/Button';
import InputField from '../components/inputs/InputField';
import ComboBox from '../components/inputs/Combobox';

const infoRow = (label, value) => (
    <div className="flex items-center border-b border-gray-200 py-2 text-sm">
        <span className="text-gray-700 min-w-[140px]">{label}</span>
        <div className="flex-1 h-px bg-gray-200 mx-3" />
        <span className="text-simbaris-text font-semibold text-right whitespace-nowrap">
            {value}
        </span>
    </div>
);

const TimSayaDetail = ({ isSidebarOpen }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [teamData, setTeamData] = useState({
        crest: '/images/logo_simbaris_default.png',
        namaTim: 'Specta Squad',
        namaPelatih: 'Mariposa',
        namaPembina: 'Roman Reigns',
        kontak: '+62 812 3456 7890',
        email: 'pelatihpembina@gmail.com',
        namaSekolah: 'SMP Negeri 18 Balikpapan',
        jenjang: 'SMP/MTs Sederajat',
        provinsi: 'Kalimantan Timur',
        kota: 'Balikpapan',
        kecamatan: 'Balikpapan Selatan',
    });

    const jenjangOptions = ['SD/MI', 'SMP/MTs Sederajat', 'SMA/SMK/MA'];
    const provinsiOptions = ['Kalimantan Timur', 'Jawa Tengah', 'DKI Jakarta'];
    const kotaOptions = ['Balikpapan', 'Samarinda', 'Semarang', 'Jakarta'];
    const kecamatanOptions = ['Balikpapan Selatan', 'Balikpapan Utara', 'Others'];

    const handleChange = (key) => (eOrValue) => {
        const value = eOrValue?.target ? eOrValue.target.value : eOrValue;
        setTeamData((prev) => ({ ...prev, [key]: value }));
    };

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
                            Tim Saya
                        </h1>
                        <Breadcrumbs />
                    </div>

                    {!isEditing ? (
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 items-start">
                            <div className="bg-white rounded-2xl shadow-sm border border-simbaris-primary-light/40 p-6 xl:col-span-2">
                                <h2 className="text-lg font-semibold text-simbaris-text mb-4">
                                    Data Tim
                                </h2>
                                <div className="flex flex-col items-center gap-6">
                                    <div className="w-52 h-52 rounded-full bg-simbaris-primary-lightest border-2 border-dashed border-simbaris-primary-light flex items-center justify-center overflow-hidden">
                                        <img
                                            src={teamData.crest}
                                            alt="Logo tim"
                                            className="w-36 h-36 object-contain"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src =
                                                    '/images/logo_simbaris_icon.png';
                                            }}
                                        />
                                    </div>
                                    <div className="w-full space-y-3">
                                        {infoRow('Nama Tim', teamData.namaTim)}
                                        {infoRow('Nama Pelatih', teamData.namaPelatih)}
                                        {infoRow('Nama Pembina', teamData.namaPembina)}
                                        {infoRow('Kontak Pelatih/Pembina', teamData.kontak)}
                                        {infoRow('Email Pelatih/Pembina', teamData.email)}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold text-simbaris-text mb-3">
                                        Data Sekolah
                                    </h3>
                                    <div className="w-full space-y-3">
                                        {infoRow('Nama Sekolah', teamData.namaSekolah)}
                                        {infoRow('Jenjang Sekolah', teamData.jenjang)}
                                        {infoRow('Provinsi', teamData.provinsi)}
                                        {infoRow('Kota', teamData.kota)}
                                        {infoRow('Kecamatan', teamData.kecamatan)}
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <Button
                                        text="Edit"
                                        color="primary"
                                        size="long"
                                        round="half"
                                        type="primary"
                                        onClick={() => setIsEditing(true)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white rounded-2xl shadow-sm border border-simbaris-primary-light/40 p-6 flex flex-col gap-4">
                                    <h3 className="text-lg font-semibold text-simbaris-text">
                                        Nilai dan Catatan Juri
                                    </h3>
                                    <div className="flex flex-col justify-center items-center text-2xl font-semibold text-simbaris-primary py-10 border border-dashed border-simbaris-primary-light rounded-xl">
                                        COMING SOON
                                    </div>
                                </div>
                                <div className="bg-white rounded-2xl shadow-sm border border-simbaris-primary-light/40 p-6 flex flex-col gap-4">
                                    <h3 className="text-lg font-semibold text-simbaris-text">
                                        Hasil Perlombaan
                                    </h3>
                                    <div className="flex flex-col justify-center items-center text-2xl font-semibold text-simbaris-primary py-10 border border-dashed border-simbaris-primary-light rounded-xl">
                                        COMING SOON
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-sm border border-simbaris-primary-light/40 p-6">
                            <h2 className="text-lg font-semibold text-simbaris-text mb-4">
                                Edit Data Tim
                            </h2>
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
                                <div className="flex flex-col items-center gap-4 lg:col-span-2 xl:col-span-1">
                                    <div className="w-52 h-52 rounded-full bg-simbaris-primary-lightest border-2 border-dashed border-simbaris-primary-light flex items-center justify-center overflow-hidden">
                                        <img
                                            src={teamData.crest}
                                            alt="Logo tim"
                                            className="w-36 h-36 object-contain"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src =
                                                    '/images/logo_simbaris_icon.png';
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="lg:col-span-3 xl:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField
                                        label="Nama Tim"
                                        value={teamData.namaTim}
                                        onChange={handleChange('namaTim')}
                                    />
                                    <InputField
                                        label="Nama Pelatih"
                                        value={teamData.namaPelatih}
                                        onChange={handleChange('namaPelatih')}
                                    />
                                    <InputField
                                        label="Nama Pembina"
                                        value={teamData.namaPembina}
                                        onChange={handleChange('namaPembina')}
                                    />
                                    <InputField
                                        label="Kontak Pelatih/Pembina"
                                        value={teamData.kontak}
                                        onChange={handleChange('kontak')}
                                    />
                                    <InputField
                                        label="Email Pelatih/Pembina"
                                        value={teamData.email}
                                        onChange={handleChange('email')}
                                    />
                                    <InputField
                                        label="Nama Sekolah"
                                        value={teamData.namaSekolah}
                                        onChange={handleChange('namaSekolah')}
                                    />
                                    <ComboBox
                                        label="Jenjang Sekolah"
                                        options={jenjangOptions}
                                        value={teamData.jenjang}
                                        onSelect={handleChange('jenjang')}
                                    />
                                    <ComboBox
                                        label="Provinsi"
                                        options={provinsiOptions}
                                        value={teamData.provinsi}
                                        onSelect={handleChange('provinsi')}
                                    />
                                    <ComboBox
                                        label="Kota"
                                        options={kotaOptions}
                                        value={teamData.kota}
                                        onSelect={handleChange('kota')}
                                    />
                                    <ComboBox
                                        label="Kecamatan"
                                        options={kecamatanOptions}
                                        value={teamData.kecamatan}
                                        onSelect={handleChange('kecamatan')}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <Button
                                    text="Simpan"
                                    color="success"
                                    size="default"
                                    round="half"
                                    onClick={() => setIsEditing(false)}
                                />
                                <Button
                                    text="Batal"
                                    type="secondary"
                                    color="hazard"
                                    size="default"
                                    round="half"
                                    onClick={() => setIsEditing(false)}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TimSayaDetail;
