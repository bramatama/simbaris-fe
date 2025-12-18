import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { ExternalLink } from 'lucide-react';

const MyTeamDataPanel = ({ teamData, isLoading = false }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold text-simbaris-text">
                    Data Tim
                </h2>
                {isLoading ? (
                    <div className="flex flex-col gap-4 animate-pulse">
                        <div className="flex flex-col items-center md:flex-row gap-6">
                            <div className="shrink-0">
                                <div className="w-48 h-48 rounded-full bg-gray-200"></div>
                            </div>
                            <div className="flex-1 w-full space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="flex justify-between items-end border-b border-gray-200 pb-2"
                                    >
                                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                        <div className="h-4 w-40 bg-gray-200 rounded"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center md:flex-row gap-6">
                        {/* Logo Tim */}
                        <div className="shrink-0">
                            <div className="w-48 h-48 border-2 border-gray-300 rounded-full flex items-center justify-center overflow-hidden bg-white">
                                {teamData.team_logo_url ? (
                                    <img
                                        src={teamData.team_logo_url}
                                        className="w-52 h-full object-contain rounded-full"
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
                                <span className="text-sm text-gray-600">
                                    Nama Tim
                                </span>
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
                                <span className="text-sm text-gray-600">
                                    Kota
                                </span>
                                <span className="text-sm font-medium text-gray-900 text-right">
                                    {teamData.city}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex w-full justify-end items-center">
                <Button
                    text="Lihat Selengkapnya"
                    size="long"
                    type="primary"
                    color="secondary"
                    onClick={() => navigate('/tim-saya/detail')}
                    leftIcon={<ExternalLink size={18} />}
                    disabled={isLoading}
                ></Button>
            </div>
        </div>
    );
};

export default MyTeamDataPanel;
