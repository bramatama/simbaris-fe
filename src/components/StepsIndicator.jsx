import React from 'react';

const StepsIndicator = ({ steps = [], currentStep = 1 }) => {
    const progressWidth =
        steps.length > 1 ? ((currentStep - 1) / (steps.length - 1)) * 100 : 0;

    return (
        <div className="w-full px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-center w-full">
                <div className="relative flex justify-between items-center w-full">
                    {/* --- Garis Latar Belakang (Layer Bawah) --- */}
                    {/* Container garis disesuaikan agar pas di antara pusat node pertama dan terakhir */}
                    <div className="absolute top-5 md:top-6 left-16 w-[calc(100%-8rem)] h-1 transform -translate-y-1/2">
                        {/* Garis abu-abu (selalu 100% lebar) */}
                        <div className="w-full h-full bg-simbaris-neutral-300 rounded-full"></div>
                        {/* Garis biru (lebar dinamis sesuai progres) */}
                        <div
                            className="absolute top-0 left-0 h-full bg-simbaris-primary rounded-full transition-all duration-500 ease-in-out"
                            style={{ width: `${progressWidth}%` }}
                        ></div>
                    </div>
                    <div className="flex w-full justify-between">
                        {steps.map((step, index) => {
                            const stepNumber = index + 1;
                            const isCompleted = stepNumber < currentStep;
                            const isActive = stepNumber === currentStep;
                            const isUpcoming = stepNumber > currentStep;

                            // Menentukan class untuk lingkaran step
                            const circleClasses = () => {
                                if (isActive) {
                                    return 'bg-white border-2 border-simbaris-secondary text-simbaris-secondary';
                                }
                                if (isCompleted) {
                                    return 'bg-simbaris-secondary text-white border-2 border-transparent';
                                }
                                return 'bg-white border-2 border-simbaris-primary-light text-simbaris-text';
                            };

                            return (
                                <div
                                    key={step.title}
                                    className="relative z-10 flex flex-col items-center text-center w-32"
                                >
                                    {/* Lingkaran Node */}
                                    <div
                                        className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full font-bold text-lg transition-all duration-300 ${circleClasses()}`}
                                    >
                                        {stepNumber}
                                    </div>

                                    {/* Teks di bawah Node */}
                                    <div className={`mt-2 text-simbaris-text`}>
                                        <p className="text-sm sm:text-xs font-semibold">
                                            {step.title}
                                        </p>
                                        <p className="hidden sm:block text-xs mt-1">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepsIndicator;
