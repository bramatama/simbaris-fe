import React, { useState, useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import Button from '../ui/Button';
import registrationService from '../../services/registration_service';

const AuditModal = ({ isOpen, onClose, onSaveSuccess }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [data, setData] = useState({ photos: [], members: [] });
    const [assignments, setAssignments] = useState({});

    useEffect(() => {
        if (isOpen) {
            fetchData();
        }
    }, [isOpen]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const result = await registrationService.getPhotoResults();
            setData(result.data);

            // Initialize assignments with the member_id returned from backend (if any)
            const initialAssignments = {};
            if (result.data.photos) {
                result.data.photos.forEach((photo) => {
                    initialAssignments[photo.photo_id] = photo.member_id || '';
                });
            }
            setAssignments(initialAssignments);
        } catch (error) {
            console.error('Failed to fetch photo results', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAssignmentChange = (photoId, memberId) => {
        setAssignments((prev) => ({
            ...prev,
            [photoId]: memberId,
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const payload = {
                photos: data.photos.map((photo) => ({
                    photo_id: photo.photo_id,
                    member_id: assignments[photo.photo_id],
                    original_member_id: photo.member_id,
                })),
            };

            await registrationService.auditPhotos(payload);
            onSaveSuccess();
        } catch (error) {
            console.error('Failed to save audit', error);
            alert('Gagal menyimpan verifikasi foto.');
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">
                        Verifikasi Hasil Foto
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-40">
                            <Loader2
                                className="animate-spin text-blue-600"
                                size={32}
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {data.photos &&
                                data.photos.map((photo) => (
                                    <div
                                        key={photo.photo_id}
                                        className="border border-gray-200 rounded-xl p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow bg-white"
                                    >
                                        <div className="aspect-square bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                                            <img
                                                src={photo.file_url}
                                                alt="Detected face"
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Anggota Terdeteksi
                                            </label>
                                            <select
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                                value={
                                                    assignments[
                                                        photo.photo_id
                                                    ] || ''
                                                }
                                                onChange={(e) =>
                                                    handleAssignmentChange(
                                                        photo.photo_id,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    -- Pilih Anggota --
                                                </option>
                                                {data.members &&
                                                    data.members.map(
                                                        (member) => (
                                                            <option
                                                                key={
                                                                    member.member_id
                                                                }
                                                                value={
                                                                    member.member_id
                                                                }
                                                            >
                                                                {
                                                                    member.member_name
                                                                }
                                                            </option>
                                                        )
                                                    )}
                                            </select>
                                        </div>
                                    </div>
                                ))}
                            {(!data.photos || data.photos.length === 0) && (
                                <div className="col-span-full text-center py-10 text-gray-500">
                                    Tidak ada foto yang terdeteksi.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                    <Button
                        type="secondary"
                        color="secondary"
                        onClick={onClose}
                        text="Batal"
                    />
                    <Button
                        color="primary"
                        onClick={handleSave}
                        disabled={isLoading || isSaving}
                        text={isSaving ? 'Menyimpan...' : 'Simpan Verifikasi'}
                        leftIcon={
                            isSaving ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                <Save size={18} />
                            )
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default AuditModal;
