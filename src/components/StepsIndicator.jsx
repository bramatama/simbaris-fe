import React from 'react';
import { ChevronRight } from 'lucide-react'; // Impor ikon chevron

const StepsIndicator = ({ steps = [], currentStep = 1 }) => {
    const progressWidth =
        steps.length > 1 ? ((currentStep - 1) / (steps.length - 1)) * 100 : 0;

    return (
        <div className="w-full px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-center w-full">
                <div className="relative flex justify-between items-start w-full">
                    {/* --- Garis Latar Belakang (Hanya untuk Desktop) --- */}
                    <div className="absolute top-6 hidden md:block left-16 w-[calc(100%-8rem)] h-1 transform -translate-y-1/2">
                        {/* Garis abu-abu */}
                        <div className="w-full h-full bg-gray-300 rounded-full"></div>
                        {/* Garis biru progres */}
                        <div
                            className="absolute top-0 left-0 h-full bg-simbaris-primary rounded-full transition-all duration-500 ease-in-out"
                            style={{ width: `${progressWidth}%` }}
                        ></div>
                    </div>

                    {/* --- Kontainer Node dan Chevron --- */}
                    <div className="flex w-full items-start justify-center md:justify-between">
                        {steps.map((step, index) => {
                            const stepNumber = index + 1;
                            const isCompleted = stepNumber < currentStep;
                            const isActive = stepNumber === currentStep;
                            const isUpcoming = stepNumber > currentStep;

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
                                <>
                                    {/* Node (Ikon/Nomor dan Teks) */}
                                    <div className="relative z-10 flex flex-col items-center text-center w-auto md:w-32">
                                        {/* Lingkaran Node untuk Desktop */}
                                        <div
                                            className={`hidden md:flex w-12 h-12 items-center justify-center rounded-full font-bold text-lg transition-all duration-300 ${circleClasses()}`}
                                        >
                                            {stepNumber}
                                        </div>

                                        {/* Lingkaran Node untuk Mobile (menggunakan ikon) */}
                                        {step.icon && (
                                            <div
                                                className={`flex md:hidden w-12 h-12 items-center justify-center rounded-full transition-all duration-300 ${circleClasses()}`}
                                            >
                                                {step.icon}
                                            </div>
                                        )}

                                        {/* Teks di bawah Node */}
                                        <div
                                            className={`mt-2 text-simbaris-text`}
                                        >
                                            <p className="hidden md:block md:text-sm font-semibold">
                                                {step.title}
                                            </p>
                                            <p className="hidden md:block md:text-xs mt-1">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* --- Chevron Separator (Hanya untuk Mobile) --- */}
                                    {index < steps.length - 1 && (
                                        <div className="flex-1 flex items-center justify-center pt-3 md:hidden">
                                            <ChevronRight
                                                className={
                                                    isCompleted || isActive
                                                        ? 'text-simbaris-secondary'
                                                        : 'text-gray-300'
                                                }
                                                size={28}
                                            />
                                        </div>
                                    )}
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepsIndicator;
