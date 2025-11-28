import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button';
import { ExternalLink } from 'lucide-react';

const MyDataPanel = ({ myData, onButtonClick }) => {
    const isMemberPage = location.pathname === '/tim-saya/anggota';
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-simbaris-text">
                Data Saya
            </h2>
            <div className="flex flex-col items-center md:flex-row gap-6">
                {/* Logo Tim */}
                <div className="shrink-0">
                    <div className="w-48 h-48 border-2 border-gray-300 rounded-full flex items-center justify-center overflow-hidden bg-white">
                        {myData.photo_url ? (
                            <img
                                src={myData.photo_url}
                                className="w-full h-full object-contain rounded-full"
                            />
                        ) : (
                            <div className="text-gray-300 text-6xl font-bold">
                                ?
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 w-full space-y-4">
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">Nama</span>
                        <span className="text-sm font-medium text-gray-900 text-right">
                            {myData.member_name}
                        </span>
                    </div>
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">NISN</span>
                        <span className="text-sm font-medium text-gray-900 text-right">
                            {myData.nisn}
                        </span>
                    </div>
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">Kelas</span>
                        <span className="text-sm font-medium text-gray-900 text-right">
                            {myData.member_grade}
                        </span>
                    </div>
                    {isMemberPage && (
                        <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                            <span className="text-sm text-gray-600">
                                Jenis Kelamin
                            </span>
                            <span className="text-sm font-medium text-gray-900 text-right">
                                {myData.gender}
                            </span>
                        </div>
                    )}
                    <div className="flex w-full justify-end items-center">
                            <Button
                                text="Lihat Selengkapnya"
                                size="long"
                                type="primary"
                                color="secondary"
                                onClick={onButtonClick}
                                leftIcon={<ExternalLink size={18} />}
                            ></Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyDataPanel;
