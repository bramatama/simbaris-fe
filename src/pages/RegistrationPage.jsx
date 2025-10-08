import React, { useState } from 'react';
import Button from '../components/Button'; // Menggunakan komponen Button yang sudah ada
import StepsIndicator from '../components/StepsIndicator';

const RegistrationPage = () => {
    // Daftar langkah-langkah proses
    const registrationSteps = [
        {
            title: 'Data Tim',
            description: 'Input Data Tim dan Sekolah Asal Tim',
        },
        {
            title: 'Data Anggota Tim',
            description: 'Input Data Masing-Masing Anggota Tim',
        },
        {
            title: 'Pembayaran',
            description: 'Metode Pembayaran dan Bukti Pembayaran',
        },
        {
            title: 'Akun Tim',
            description: 'Pembuatan Akun Tim',
        },
        {
            title: 'Kode Tim',
            description: 'Menerima Kode Tim untuk Proses Login',
        },
    ];

    // State untuk mengontrol langkah saat ini
    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        if (currentStep < registrationSteps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen p-8 flex flex-col items-center">
            <div className="w-full max-w-6xl mb-12">
                <StepsIndicator
                    steps={registrationSteps}
                    currentStep={currentStep}
                />
            </div>

            {/* Konten Halaman Simulasi */}
            <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-bold text-simbaris-primary mb-2">
                    Langkah {currentStep}:{' '}
                    {registrationSteps[currentStep - 1].title}
                </h2>
                <p className="text-simbaris-neutral-600 mb-8">
                    Ini adalah konten untuk bagian "{' '}
                    {registrationSteps[currentStep - 1].description} "
                </p>

                {/* Tombol Navigasi */}
                <div className="flex justify-center gap-4">
                    <Button
                        onClick={handlePrev}
                        disabled={currentStep === 1}
                        color="secondary"
                    >
                        Sebelumnya
                    </Button>
                    <Button
                        onClick={handleNext}
                        disabled={currentStep === registrationSteps.length}
                        color="primary"
                    >
                        Selanjutnya
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
