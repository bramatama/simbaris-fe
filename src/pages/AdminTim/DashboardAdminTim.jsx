import Button from '../../components/Button';
import PieChart from '../../components/panitia/dashboard_panitia/PieChart';

const DashboardAdminTim = ({ isSidebarOpen }) => {
    const registrationData = {
        labels: ['SD / MI', 'SMP / MTs', 'SMA / SMK / MA'],
        values: [12, 23, 29],
    };
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
                        <div className="bg-white flex flex-col rounded-lg shadow-md col-span-1 row-span-1 p-4 md:col-span-2 md:row-span-3"></div>
                        <div className="bg-white"></div>
                        <div className="h-96 bg-white flex flex-col rounded-lg shadow-md p-4 md:row-span-2">
                            <PieChart
                                chartData={registrationData}
                                title="Tim Terdaftar Perkategori"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DashboardAdminTim;
