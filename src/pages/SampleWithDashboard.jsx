import Button from '../components/Button';
const SampleWithDashboard = ({isSidebarOpen}) => {
    return (
        <div className="flex bg-gray-100">
            <div
                className={`w-full min-h-screen overflow-hidden pt-16 ${isSidebarOpen? 'md:ml-64' : 'ml-0'} transition-all duration-300`}
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
                    >
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default SampleWithDashboard;
