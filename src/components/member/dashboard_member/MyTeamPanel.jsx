import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import { ExternalLink } from 'lucide-react';

const myTeamPanel = ({ teamData }) => {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-simbaris-text">
                Data Tim
            </h2>
            <div className="flex flex-col items-center md:flex-row gap-6">
                {/* Info Tim */}
                <div className="flex-1 w-full space-y-4">
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">Nama Tim</span>
                        <span className="text-sm font-medium text-gray-900 text-right">
                            {teamData.team_name}
                        </span>
                    </div>
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">
                            Nama Sekolah
                        </span>
                        <span className="text-sm font-medium text-gray-900 text-right">
                            {teamData.school_name}
                        </span>
                    </div>
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">Kota</span>
                        <span className="text-sm font-medium text-gray-900 text-right">
                            {teamData.city}
                        </span>
                    </div>
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

export default myTeamPanel;
