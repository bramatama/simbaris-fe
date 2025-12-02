import { Link } from 'react-router-dom';
import Button from '../Button';
import { ExternalLink, Eye } from 'lucide-react';

const MyRegistrationPanel = ({ teamData }) => {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-simbaris-text">
                Detail Pendaftaran
            </h2>
            <div className="flex flex-col items-center md:flex-row gap-6">
                {/* Info Tim */}
                <div className="flex flex-col w-full gap-4">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">Jenjang</span>
                        <span className="text-sm font-medium text-gray-900 text-right px-2 py-1">
                            {teamData.level}
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">
                            Jumlah Anggota
                        </span>
                        <span className="text-sm font-medium text-gray-900 text-right px-2 py-1">
                            {teamData.member_count}
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">Harga</span>
                        <span className="text-sm font-medium text-gray-900 text-right px-2 py-1">
                            400000
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">
                            Bukti Pembayaran
                        </span>
                        <button className="flex items-center gap-2 text-simbaris-accent font-medium bg-simbaris-accent-lightest px-2 py-1 rounded-md text-sm border border-simbaris-accent-light">
                            <Eye />
                            Lihat Gambar
                        </button>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">
                            Waktu Pendaftaran
                        </span>
                        <span className="text-sm font-medium text-gray-900 text-right px-2 py-1">
                            {teamData.submitted_at}
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">
                            Terakhir di-Update
                        </span>
                        <span className="text-sm font-medium text-gray-900 text-right px-2 py-1">
                            {teamData.last_updated}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-simbaris-text">
                    Status
                </h2>
                <button className="flex items-center gap-2 text-simbaris-secondary font-medium bg-simbaris-secondary-lightest px-2 py-1 rounded-md text-md border border-simbaris-secondary-light">
                    Dalam Proses Verifikasi
                </button>
            </div>
            <div className="flex flex-col w-full gap-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-sm text-gray-600">Verifikatur</span>
                    <span className="text-sm font-medium text-gray-900 text-right px-2 py-2">
                        -
                    </span>
                </div>
            </div>
            <div className="flex w-full justify-end items-center">
                <Link to="/tim-saya/detail">
                    <Button
                        text="Lihat Selengkapnya"
                        size="long"
                        type="primary"
                        color="secondary"
                        leftIcon={<ExternalLink size={18} />}
                    ></Button>
                </Link>
            </div>
        </div>
    );
};

export default MyRegistrationPanel;
