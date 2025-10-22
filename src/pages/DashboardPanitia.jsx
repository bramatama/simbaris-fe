import Button from '../components/Button';
import PieChart from '../components/dashboard_panitia/PieChart';
import FastestRegistrantsPanel from '../components/dashboard_panitia/FastestRegistrationPanel';
import { Link } from 'react-router-dom';
const DashboardPanitia = ({ isSidebarOpen }) => {
    // Data Dummy untuk jumlah pendaftar
    const registrationData = {
        labels: ['SD / MI', 'SMP / MTs', 'SMA / SMK / MA'],
        values: [12, 23, 29],
    };

    //Data Dummy untuk pendaftar tercepat
    const fastestTeams = [
        { name: 'Garuda Muda', school: 'SMA Negeri 1', initials: 'GM' },
        { name: 'Elang Perkasa', school: 'SMP Bintang Timur', initials: 'EP' },
        { name: 'Macan Putih', school: 'SMA Harapan Bangsa', initials: 'MP' },
        { name: 'Rajawali Sakti', school: 'SMK Teknologi', initials: 'RS' },
        { name: 'Kijang Emas', school: 'SMP Cendekia', initials: 'KE' },
    ];

    return (
        <div className="flex bg-gray-100">
            <div
                className={`w-full min-h-screen overflow-hidden pt-16 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'} transition-all duration-300`}
            >
                <div className="flex flex-col gap-4 p-6">
                    <header className="text-simbaris-text font-semibold text-3xl">
                        Sample with Dashboard
                    </header>

                    {/* Taruh objek disini guys */}
                    {/* contoh */}
                    <Button
                        text="Dashboard Button"
                        size="long"
                        round="half"
                        color="primary"
                    ></Button>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 gap-4">
                        <div className="bg-white flex flex-col rounded-lg shadow-md p-6 col-span-1 row-span-1 md:col-span-2 md:row-span-3">
                            <h3 className="font-bold text-lg">
                                Aktivitas Terbaru
                            </h3>
                            <div className="mt-4 flex-1  rounded-md flex items-center justify-center text-gray-400">
                                Tabel Data Akan Ditampilkan Di Sini
                            </div>
                        </div>
                        <div className="relative bg-white shadow-md rounded-lg h-fit lg:h-72 overflow-hidden">
                            <div className="h-full w-full overflow-auto p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg text-simbaris-text font-bold">
                                        Pendaftar Tercepat
                                    </span>
                                    <Link to={'/tim-terdaftar'}>
                                        <span className="text-sm text-simbaris-text hover:underline">
                                            Lihat Semua
                                        </span>
                                    </Link>
                                </div>
                                <FastestRegistrantsPanel teams={fastestTeams} />
                            </div>
                        </div>
                        <div className="bg-white flex flex-col items-center rounded-lg shadow-md py-4 px-6 md:row-span-2 h-96 md:h-[480px] lg:h-auto">
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
