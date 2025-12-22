import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Check, FileUp, Image as ImageIcon } from 'lucide-react';
import Button from '../ui/Button'; // Pastikan path ini sesuai dengan lokasi Button.jsx Anda

const UploadModal = ({
    isOpen,
    onClose,
    onProcess,
    title,
    isLoading = false,
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null); // State untuk URL preview
    const [progress, setProgress] = useState(0); // State untuk fake progress
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

    // Efek untuk simulasi progress bar saat loading
    useEffect(() => {
        let interval;
        if (isLoading) {
            setProgress(0);
            interval = setInterval(() => {
                setProgress((prev) => {
                    // Mentok di 95% sampai proses selesai (isLoading false)
                    if (prev >= 95) return 95;
                    return prev + Math.floor(Math.random() * 10) + 1;
                });
            }, 500);
        } else {
            setProgress(0);
        }
        return () => clearInterval(interval);
    }, [isLoading]);

    // Jika modal tertutup, jangan render apa-apa
    if (!isOpen) return null;

    // --- Event Handlers untuk Drag & Drop ---
    const handleDragOver = (e) => {
        if (isLoading) return;
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        if (isLoading) return;
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
            setFile(droppedFiles[0]); // Ambil file pertama saja
        }
    };

    // Handler untuk klik area upload
    const handleClickUpload = () => {
        if (isLoading) return;
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    return (
        // Overlay (Background Gelap)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all duration-300">
            {/* Modal Container */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* --- Header --- */}
                <div className="flex justify-between items-center p-6 pb-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-simbaris-text">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className={`text-gray-400 hover:text-gray-600 transition-colors focus:outline-none ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* --- Content (Upload Area) --- */}
                <div className="p-6 pt-6">
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={handleClickUpload}
                        className={`
                            border-2 border-dashed rounded-xl h-80 flex flex-col items-center justify-center transition-all duration-200 overflow-hidden relative
                            ${
                                isDragging
                                    ? 'border-simbaris-primary bg-blue-50'
                                    : isLoading
                                      ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-70'
                                      : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400 cursor-pointer'
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

                        {isLoading ? (
                            // Tampilan Loading Progress
                            <div className="flex flex-col items-center justify-center w-full h-full animate-in fade-in duration-300">
                                <div className="w-64 bg-gray-100 rounded-full h-3 mb-4 overflow-hidden border border-gray-200">
                                    <div
                                        className="bg-blue-500 h-full rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                                <p className="text-lg font-bold text-gray-700">
                                    {progress}%
                                </p>
                                <p className="text-sm text-gray-500">
                                    Sedang mengunggah berkas...
                                </p>
                            </div>
                        ) : previewUrl ? (
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
                        disabled={!file || isLoading}
                        size={'default'}
                        text={isLoading ? 'Mengunggah...' : 'Lanjutkan'}
                    ></Button>
                    <Button
                        color="hazard"
                        leftIcon={<X size={18} />}
                        onClick={onClose}
                        disabled={isLoading}
                        size={'default'}
                        text="Batal"
                    ></Button>
                </div>
            </div>
        </div>
    );
};

export default UploadModal;
