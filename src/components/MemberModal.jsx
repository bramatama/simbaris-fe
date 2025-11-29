import { useEffect, useRef, useState } from 'react';
import { X, Eye, PenLine } from 'lucide-react';
import Button from './Button';

const MemberModal = ({
    isOpen,
    onClose,
    memberData,
    title = 'Detail Anggota',
    userRole,
}) => {
    const modalRef = useRef(null);
    const [showFullImage, setShowFullImage] = useState(false); // State untuk lightbox

    // Menutup modal jika klik di luar area konten
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Jika sedang preview gambar full, jangan tutup modal utama
            // Biarkan user menutup gambar dulu
            if (showFullImage) return;

            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose, showFullImage]);

    const handleViewImage = () => {
        if (memberData?.photo_url) {
            setShowFullImage(true); // Buka preview internal
        }
    };

    if (!isOpen || !memberData) return null;

    const hasPhoto = !!memberData.photo_url;

    return (
        <>
            {/* --- LIGHTBOX (PREVIEW GAMBAR FULL) --- */}
            {/* Render di luar modal utama dengan z-index lebih tinggi (60 vs 50) */}
            {showFullImage && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 transition-opacity animate-in fade-in duration-200"
                    onClick={() => setShowFullImage(false)} // Klik background untuk tutup
                >
                    {/* Tombol Close Lightbox */}
                    <button
                        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2 bg-black/20 rounded-full"
                        onClick={() => setShowFullImage(false)}
                    >
                        <X size={32} />
                    </button>

                    {/* Gambar Full */}
                    <img
                        src={memberData.photo_url}
                        alt={`Full Preview ${memberData.member_name}`}
                        className="max-w-full max-h-full object-contain rounded-md shadow-2xl"
                        onClick={(e) => e.stopPropagation()} // Mencegah klik gambar menutup lightbox
                    />
                </div>
            )}
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 transition-opacity animate-in fade-in duration-200">
                {/* Modal Container */}
                <div
                    ref={modalRef}
                    className="bg-white rounded-lg shadow-xl w-full h-full md:h-fit max-w-4xl overflow-auto relative"
                >
                    {/* --- Header --- */}
                    <div className="flex justify-between items-center p-6 pb-4">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                        >
                            <X size={28} />
                        </button>
                    </div>

                    {/* --- Content --- */}
                    <div className="p-6 pt-2">
                        <div className="flex flex-col-reverse md:flex-row gap-8">
                            {/* Kolom Kiri: Detail Data */}
                            <div className="flex-1 space-y-4">
                                <DetailRow
                                    label="Nama"
                                    value={memberData.member_name}
                                />
                                <DetailRow
                                    label="Nama Tim"
                                    value={memberData.team_name}
                                />
                                <DetailRow
                                    label="Asal Sekolah"
                                    value={memberData.school_name}
                                />
                                <DetailRow
                                    label="Jenjang Sekolah"
                                    value={memberData.level}
                                />
                                <DetailRow
                                    label="Kelas"
                                    value={memberData.member_grade}
                                />
                                <DetailRow
                                    label="NISN"
                                    value={memberData.nisn}
                                />
                                <DetailRow
                                    label="Jenis Kelamin"
                                    value={memberData.gender}
                                />
                                <DetailRow
                                    label="Email"
                                    value={memberData.email}
                                />
                            </div>

                            {/* Kolom Kanan: Foto & Aksi */}
                            <div className="md:w-48 w-full flex flex-col gap-4 shrink-0">
                                {/* Foto Anggota */}
                                <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                    {memberData.photo_url ? (
                                        <img
                                            src={memberData.photo_url}
                                            alt={`Foto ${memberData.member_name}`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50 flex-col gap-2">
                                            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                                            <span className="text-xs">
                                                No Photo
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Tombol Aksi */}
                                <div className="flex flex-col gap-3">
                                    <Button
                                        text="Lihat Gambar"
                                        leftIcon={<Eye size={18} />}
                                        size="default"
                                        type="secondary"
                                        className="w-full"
                                        onClick={handleViewImage}
                                        disabled={!hasPhoto}
                                    />
                                    {title === 'Detail Anggota' &&
                                        userRole === 'admin_tim' && (
                                            <Button
                                                text="Edit"
                                                leftIcon={<PenLine size={18} />}
                                                size="default"
                                                color="accent"
                                                className="w-full"
                                            />
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// Helper Component untuk Baris Data
const DetailRow = ({ label, value }) => (
    <div className="flex justify-between items-end border-b border-gray-300 pb-3">
        <span className="text-xs md:text-sm text-gray-800">{label}</span>
        <span className="text-xs md:text-sm font-medium text-gray-900 text-right">
            {value || '-'}
        </span>
    </div>
);

export default MemberModal;
