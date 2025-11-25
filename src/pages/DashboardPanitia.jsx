import Button from '../components/Button';
import { Link } from 'react-router-dom';
import PieChart from '../components/dashboard_panitia/PieChart';
import FastestRegistrantsPanel from '../components/dashboard_panitia/FastestRegistrationPanel';
import SimpleCard from '../components/SimpleCards';
import { PenTool, ExternalLink } from 'lucide-react';

const DashboardPanitia = ({ isSidebarOpen }) => {
    // Data Dummy untuk jumlah pendaftar
    const registrationData = {
        labels: ['SD / MI', 'SMP / MTs', 'SMA / SMK / MA'],
        values: [5, 5, 5],
    };

    // Data Dummy untuk pendaftar tercepat
    const fastestTeams = [
        { name: 'Garuda Muda', school: 'SMA Negeri 1', initials: 'GM' },
        { name: 'Elang Perkasa', school: 'SMP Bintang Timur', initials: 'EP' },
        { name: 'Macan Putih', school: 'SMA Harapan Bangsa', initials: 'MP' },
    ];

    const cards = [
        { color: 'bg-simbaris-secondary', title: 'Tim Terdaftar', data: '15 Data', leftIcon: <PenTool className="text-white" size={20} /> , rightIcon: <ExternalLink size={16} className="text-gray-400" />, navigateTo: '/tim-terdaftar' },
        { color: 'bg-simbaris-warning', title: 'Tim Butuh Verifikasi', data: '8 Data', leftIcon: <PenTool className="text-white" size={20} /> , rightIcon: <ExternalLink size={16} className="text-gray-400" />, navigateTo: '/tim-terdaftar' },
        { color: 'bg-simbaris-hazard', title: 'Tim Butuh Revisi', data: '2 Data', leftIcon: <PenTool className="text-white" size={20} /> , rightIcon: <ExternalLink size={16} className="text-gray-400" />, navigateTo: '/tim-terdaftar' },
        { color: 'bg-simbaris-success', title: 'Tim Terverifikasi', data: '5 Data', leftIcon: <PenTool className="text-white" size={20} /> , rightIcon: <ExternalLink size={16} className="text-gray-400" />, navigateTo: '/tim-terdaftar' },
    ];

    return (
        <div className="flex bg-gray-100">
            <div
                className={`w-full min-h-screen overflow-hidden pt-16 ${
                    isSidebarOpen ? 'md:ml-64' : 'ml-0'
                } transition-all duration-300`}
            >
                <div className="flex flex-col gap-4 p-6">
                    <header className="text-simbaris-text font-semibold text-3xl">
                        Dashboard
                    </header>

                    {/* ✅ Tambahan: Section Simple Cards */}
                    <div className="hidden md:flex gap-4 mb-4">
                        {cards.map((card, index) => (
                            <SimpleCard
                                key={index}
                                color={card.color}
                                title={card.title}
                                data={card.data}
                                leftIcon= {card.leftIcon}
                                rightIcon= {card.rightIcon}
                                navigateTo= {card.navigateTo}
                            />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 gap-4">
                        <div className="bg-white flex flex-col rounded-lg shadow-md p-6 col-span-1 row-span-1 md:col-span-2 md:row-span-3">
                            <h3 className="font-bold text-lg">
                                Aktivitas Terbaru
                            </h3>
                            <div className="mt-4 flex-1 rounded-md flex items-center justify-center text-gray-400">
                                Tabel Data Akan Ditampilkan Di Sini
                            </div>
                        </div>

                        <div className="flex bg-white shadow-md rounded-lg h-fit overflow-hidden">
                            <div className="h-full w-full overflow-auto p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg text-simbaris-text font-bold">
                                        Pendaftar Tercepat
                                    </span>
                                </div>
                                <FastestRegistrantsPanel teams={fastestTeams} />
                            </div>
                        </div>

                        <div className="bg-white flex flex-col items-center rounded-lg shadow-md py-4 px-6 md:row-span-2 h-auto">
                            <div className="h-full w-full max-w-[350px] p-4">
                                <PieChart
                                    chartData={registrationData}
                                    title="Tim Terdaftar Perkategori"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DashboardPanitia;
