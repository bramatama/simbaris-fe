import Button from '../../components/ui/Button';
const Sample = () => {
    return (
        <div className="flex bg-gray-100">
            <div
                className={`w-full min-h-screen overflow-hidden transition-all duration-300`}
            >
                <div className="flex flex-col gap-4 p-6">
                    <header className="text-simbaris-text font-semibold text-3xl">
                        Sample without Dashboard
                    </header>

                    {/* Taruh objek disini guys */}
                    {/* contoh */}
                    <Button
                        text="Button"
                        size="long"
                        round="half"
                        color="primary"
                    ></Button>
                </div>
            </div>
        </div>
    );
};
export default Sample;
