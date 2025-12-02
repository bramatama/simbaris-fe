import React, { useMemo, useRef, useState } from 'react';
import { UploadCloud, X, Check } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/Button';

const InfoLine = ({ label, value }) => (
    <div className="flex items-center border-b border-gray-200 pb-2 text-sm">
        <span className="text-gray-700 min-w-[140px]">{label}</span>
        <div className="flex-1 h-px bg-gray-200 mx-3" />
        <span className="text-simbaris-text font-semibold text-right whitespace-nowrap">
            {value}
        </span>
    </div>
);

const DetailPendaftaran = ({ isSidebarOpen }) => {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadFile, setUploadFile] = useState(null);
    const [uploadPreview, setUploadPreview] = useState('');
    const uploadInputRef = useRef(null);

    const teamProfile = {
        crest: '/images/logo_simbaris_default.png',
        name: 'Specta Squad',
        school: 'SMP Negeri 18 Balikpapan',
        city: 'Balikpapan',
        coach: 'Mariposa',
        advisor: 'Ronan Rejuns',
        contact: '+62 812 3456 7890',
        email: 'pelatihpembina@gmail.com',
    };

    const registrationInfo = {
        level: 'SMP / MTs Sederajat',
        memberCount: 13,
        price: 'Rp. 500.000',
        uploadTime: '08/08/2025 12:29',
        updatedAt: '-',
        status: 'Dalam Proses Verifikasi',
    };

    const verifierInfo = {
        name: 'Verifikatur',
        time: 'Waktu Verifikasi',
        contact: 'Kontak Verifikatur',
        note: 'Catatan Verifikatur',
    };

    const statusKey = useMemo(
        () => registrationInfo.status.toLowerCase(),
        [registrationInfo.status]
    );
    const isRejected = statusKey.includes('tolak');
    const isAccepted = statusKey.includes('terima');

    const handleUploadFile = (file) => {
        if (!file) return;
        setUploadFile(file);
        if (file.type.startsWith('image/')) {
            setUploadPreview(URL.createObjectURL(file));
        } else {
            setUploadPreview('');
        }
    };

    const handleUploadChange = (e) => {
        const file = e.target.files?.[0];
        handleUploadFile(file);
    };

    const handleUploadDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer?.files?.[0];
        handleUploadFile(file);
    };

    const closeUploadModal = () => {
        setShowUploadModal(false);
        setUploadFile(null);
        setUploadPreview('');
        if (uploadInputRef.current) {
            uploadInputRef.current.value = '';
        }
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
                            Detail Pendaftaran
                        </h1>
                        <Breadcrumbs />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 items-start">
                        {/* Data Tim */}
                        <div className="bg-white rounded-2xl shadow-sm border border-simbaris-primary-light/40 p-6 xl:col-span-2">
                            <h2 className="text-lg font-semibold text-simbaris-text mb-4">
                                Data Tim
                            </h2>
                            <div className="flex flex-col items-center gap-6">
                                <div className="w-52 h-52 rounded-full bg-simbaris-primary-lightest border-2 border-dashed border-simbaris-primary-light flex items-center justify-center overflow-hidden">
                                    <img
                                        src={teamProfile.crest}
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
                                    <InfoLine label="Nama Tim" value={teamProfile.name} />
                                    <InfoLine
                                        label="Nama Sekolah"
                                        value={teamProfile.school}
                                    />
                                    <InfoLine label="Kota" value={teamProfile.city} />
                                    <InfoLine
                                        label="Nama Pelatih"
                                        value={teamProfile.coach}
                                    />
                                    <InfoLine
                                        label="Nama Pembina"
                                        value={teamProfile.advisor}
                                    />
                                    <InfoLine label="Kontak" value={teamProfile.contact} />
                                    <InfoLine label="Email" value={teamProfile.email} />
                                </div>
                            </div>
                        </div>

                        {/* Data Pendaftaran */}
                        <div className="bg-white rounded-2xl shadow-sm border border-simbaris-primary-light/40 p-6 flex flex-col gap-6 h-full">
                            <h2 className="text-lg font-semibold text-simbaris-text">
                                Data Pendaftaran
                            </h2>
                            <div className="space-y-3">
                                <InfoLine label="Jenjang" value={registrationInfo.level} />
                                <InfoLine
                                    label="Jumlah Anggota"
                                    value={registrationInfo.memberCount}
                                />
                                <InfoLine label="Harga" value={registrationInfo.price} />
                                <div className="flex items-center border-b border-gray-200 pb-2 text-sm">
                                    <span className="text-gray-700 min-w-[140px]">
                                        Bukti Pembayaran
                                    </span>
                                    <div className="flex-1 h-px bg-gray-200 mx-3" />
                                    <Button
                                        text="Lihat Gambar"
                                        size="default"
                                        type="secondary"
                                        color="warning"
                                        className="whitespace-nowrap"
                                        onClick={() => setShowUploadModal(true)}
                                    />
                                </div>
                                <InfoLine
                                    label="Waktu Pendaftaran"
                                    value={registrationInfo.uploadTime}
                                />
                                <InfoLine
                                    label="Terakhir di-Update"
                                    value={registrationInfo.updatedAt}
                                />
                            </div>

                            <div className="flex-1 flex flex-col gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-simbaris-text mb-3">
                                        Detail Verifikasi
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between bg-simbaris-secondary-lightest border border-simbaris-secondary-light rounded-xl px-4 py-3">
                                            <span className="text-sm font-semibold text-simbaris-text">
                                                Status
                                            </span>
                                            <span className="text-xs font-semibold text-white bg-simbaris-secondary px-3 py-1 rounded-full">
                                                {registrationInfo.status}
                                            </span>
                                        </div>
                                        <InfoLine
                                            label="Verifikatur"
                                            value={verifierInfo.name}
                                        />
                                        <InfoLine
                                            label="Waktu Verifikasi"
                                            value={verifierInfo.time}
                                        />
                                        <InfoLine
                                            label="Kontak Verifikatur"
                                            value={verifierInfo.contact}
                                        />
                                        <InfoLine
                                            label="Catatan Verifikatur"
                                            value={verifierInfo.note}
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col gap-4">
                                    <div className="bg-simbaris-primary-lightest/70 border border-simbaris-primary-light rounded-xl p-3 h-full min-h-[120px]">
                                        <textarea
                                            rows={3}
                                            placeholder="Catatan / pesan untuk verifikatur"
                                            className="w-full h-full bg-transparent text-sm text-simbaris-text placeholder:text-gray-500 focus:outline-none resize-none"
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-2 border-t border-gray-100">
                                        <Button
                                            text="Hubungi Verifikatur"
                                            size="long"
                                            type="secondary"
                                            color="secondary"
                                            disabled={!(isRejected || isAccepted)}
                                            round="half"
                                        />
                                        <Button
                                            text="Upload Kembali Bukti Pembayaran"
                                            size="long"
                                            color="primary"
                                            onClick={() => setShowUploadModal(true)}
                                            disabled={isAccepted && !isRejected}
                                            round="half"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showUploadModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 relative">
                        <Button
                            text=""
                            leftIcon={<X size={18} />}
                            type="secondary"
                            color="secondary"
                            round="full"
                            size="default"
                            className="absolute top-4 right-4 w-9 h-9 px-0 gap-0 border border-gray-200 text-gray-500 hover:bg-simbaris-primary-lightest"
                            aria-label="Close upload modal"
                            onClick={closeUploadModal}
                        />
                        <h3 className="text-xl font-semibold text-simbaris-text mb-4">
                            Upload Form Foto
                        </h3>
                        <div
                            className="border-2 border-dashed border-gray-400 rounded-xl h-72 flex flex-col items-center justify-center text-gray-600 cursor-pointer"
                            onClick={() => uploadInputRef.current?.click()}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleUploadDrop}
                        >
                            <UploadCloud size={42} className="mb-3 text-[#2c2f8a]" />
                            {uploadPreview ? (
                                <div className="flex flex-col items-center gap-2">
                                    <img
                                        src={uploadPreview}
                                        alt="Preview"
                                        className="w-40 h-32 object-cover rounded-md border border-gray-200"
                                    />
                                    <p className="text-xs text-gray-600">{uploadFile?.name}</p>
                                </div>
                            ) : (
                                <>
                                    <p className="font-semibold text-simbaris-text">
                                        Click atau drop file di area ini untuk upload
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Maksimal 5 MB, format JPG/PNG/PDF
                                    </p>
                                </>
                            )}
                            <input
                                ref={uploadInputRef}
                                type="file"
                                accept=".jpg,.jpeg,.png,.pdf"
                                className="hidden"
                                onChange={handleUploadChange}
                            />
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 h-11 px-5 rounded-md bg-[#35a853] text-white font-medium hover:bg-[#2f9449]"
                                onClick={closeUploadModal}
                            >
                                <Check size={16} /> Proses
                            </button>
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 h-11 px-5 rounded-md bg-[#c44536] text-white font-medium hover:bg-[#b03d30]"
                                onClick={closeUploadModal}
                            >
                                <X size={16} /> Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailPendaftaran;
