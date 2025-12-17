import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Check, FileUp, Image as ImageIcon } from 'lucide-react';
import Button from '../ui/Button'; // Pastikan path ini sesuai dengan lokasi Button.jsx Anda

const UploadModal = ({ isOpen, onClose, onProcess }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null); // State untuk URL preview
    const fileInputRef = useRef(null);

    // Efek untuk membuat dan membersihkan URL preview
    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }

        // Hanya buat preview jika file adalah gambar
        if (file.type.startsWith('image/')) {
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);

            // Bersihkan URL saat komponen di-unmount atau file berubah
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreviewUrl(null);
        }
    }, [file]);

    // Jika modal tertutup, jangan render apa-apa
    if (!isOpen) return null;

    // --- Event Handlers untuk Drag & Drop ---
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
            setFile(droppedFiles[0]); // Ambil file pertama saja
        }
    };

    // Handler untuk klik area upload
    const handleClickUpload = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    return (
        // Overlay (Background Gelap)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 transition-opacity duration-300">
            {/* Modal Container */}
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all duration-300 scale-100">
                {/* --- Header --- */}
                <div className="flex justify-between items-center p-6 pb-2">
                    <h2 className="text-xl font-bold text-simbaris-text">
                        Upload Form Foto
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* --- Content (Upload Area) --- */}
                <div className="p-6">
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={handleClickUpload}
                        className={`
                            border-2 border-dashed rounded-lg h-80 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 overflow-hidden relative
                            ${
                                isDragging
                                    ? 'border-simbaris-primary bg-simbaris-primary-lightest'
                                    : 'border-gray-400 hover:bg-gray-50'
                            }
                        `}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                            accept="image/*" // Batasi hanya gambar (opsional)
                        />

                        {previewUrl ? (
                            // Tampilan Pratinjau Gambar
                            <div className="w-full h-full relative group">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-full object-contain"
                                />
                                {/* Overlay saat hover pada preview */}
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <ImageIcon
                                        size={48}
                                        className="text-white mb-2"
                                    />
                                    <p className="text-white font-semibold text-sm px-4 text-center truncate max-w-full">
                                        {file.name}
                                    </p>
                                    <p className="text-gray-300 text-xs mt-1">
                                        Klik untuk mengganti
                                    </p>
                                </div>
                            </div>
                        ) : (
                            // Tampilan Default (Belum ada file)
                            <div className="text-center p-6">
                                {/* Ikon Upload Kustom (Gabungan Icon agar mirip gambar) */}
                                <div className="mb-3 inline-flex items-center justify-center">
                                    <FileUp
                                        size={48}
                                        strokeWidth={1.5}
                                        className="text-simbaris-text"
                                    />
                                </div>
                                <p className="text-sm font-bold text-simbaris-text">
                                    Click to upload
                                </p>
                                <p className="text-sm text-gray-500">
                                    or Drag and Drop
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- Footer (Action Buttons) --- */}
                <div className="flex justify-center gap-4 pb-8 px-6">
                    <Button
                        color="success"
                        leftIcon={<Check size={18} />}
                        onClick={() => onProcess(file)}
                        disabled={!file}
                        size={'default'}
                        text="Lanjutkan"
                    ></Button>
                    <Button
                        color="hazard"
                        leftIcon={<X size={18} />}
                        onClick={onClose}
                        size={'default'}
                        text="Batal"
                    ></Button>
                </div>
            </div>
        </div>
    );
};

export default UploadModal;
