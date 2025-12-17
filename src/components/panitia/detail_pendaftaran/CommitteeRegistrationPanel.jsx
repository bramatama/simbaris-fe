import { useLocation } from 'react-router-dom';
import Button from '../../ui/Button';
import { Phone, Eye, Trash2Icon } from 'lucide-react';

const CommitteeRegistrationPanel = ({ registrationData, onViewImage }) => {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-simbaris-text">
                Detail Pendaftaran
            </h2>
            <div className={`flex flex-col w-full gap-4`}>
                {/* Info Tim */}
                <div className={`flex flex-col w-full gap-4`}>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">Jenjang</span>
                        <span className="text-sm font-medium text-gray-900 text-right px-2 py-1">
                            {registrationData.level}
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">
                            Jumlah Anggota
                        </span>
                        <span className="text-sm font-medium text-gray-900 text-right px-2 py-1">
                            {registrationData.member_count}
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">Harga</span>
                        <span className="text-sm font-medium text-gray-900 text-right px-2 py-1">
                            {registrationData.price}
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">
                            Bukti Pembayaran
                        </span>
                        <button
                            onClick={onViewImage}
                            className="flex items-center gap-2 text-simbaris-accent font-medium bg-simbaris-accent-lightest px-2 py-1 rounded-md text-sm border border-simbaris-accent-light"
                        >
                            <Eye />
                            Lihat Gambar
                        </button>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">
                            Waktu Pendaftaran
                        </span>
                        <span className="text-sm font-medium text-gray-900 text-right px-2 py-1">
                            {registrationData.submitted_at}
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">
                            Terakhir di-Update
                        </span>
                        <span className="text-sm font-medium text-gray-900 text-right px-2 py-1">
                            {registrationData.last_updated}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-simbaris-text">
                    Detail Verifikasi
                </h2>
                <div
                    className={`flex items-center gap-4 text-simbaris-secondary font-medium bg-simbaris-secondary-lightest px-2 py-1 rounded-md text-md border border-simbaris-secondary-light`}
                >
                    {registrationData.status}
                </div>
            </div>
            <div className={`flex flex-col w-full gap-4`}>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-sm text-gray-600">Verifikatur</span>
                    <span className="text-sm font-medium text-gray-900 text-right px-2 py-2">
                        {registrationData.committee_name || "-"}
                    </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-sm text-gray-600">
                        Waktu Verifikasi
                    </span>
                    <span className="text-sm font-medium text-gray-900 text-right px-2 py-2">
                        {registrationData.verified_at || "-"}
                    </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-sm text-gray-600">
                        Kontak Verifikatur
                    </span>
                    <span className="text-sm font-medium text-gray-900 text-right px-2 py-2">
                        {registrationData.committee_contact || '-'}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                        Catatan Verifikatur
                    </span>
                </div>
                <div className="flex justify-between text-sm border border-gray-400 rounded-lg min-h-24 p-2">
                    {registrationData.verification_message || ""}
                </div>
            </div>
            <div className="flex w-full justify-between items-center gap-2">
                <Button
                    text="Hapus Tim"
                    size="long"
                    type="primary"
                    color="hazard"
                    leftIcon={<Trash2Icon size={18} />}
                ></Button>
                <Button
                    text="Hubungi Tim"
                    size="long"
                    type="primary"
                    color="accent"
                    leftIcon={<Phone size={18} />}
                ></Button>
                <Button
                    text="Perbarui Status"
                    size="long"
                    type="primary"
                    color="secondary"
                ></Button>
            </div>
        </div>
    );
};

export default CommitteeRegistrationPanel;
