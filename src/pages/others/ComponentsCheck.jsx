import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import InputField from '../../components/ui/InputField';
import ComboBox from '../../components/ui/Combobox';
import Avatar from '../../components/sidebar/Avatar';

const ComponentsCheck = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const comboboxOptions = [
        'Matematika',
        'Fisika',
        'Kimia',
        'Biologi',
        'Informatika',
        'Ekonomi',
    ];

    return (
        <div className="flex bg-gray-100">
            <div className="w-full min-h-screen overflow-hidden transition-all duration-300">
                <div className="flex flex-col gap-6 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-simbaris-text font-semibold text-3xl">
                                Komponen Preview
                            </h1>
                            <p className="text-gray-600">
                                Lihat contoh pemakaian komponen yang tersedia.
                            </p>
                        </div>
                        <Breadcrumbs />
                    </div>

                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-simbaris-text">
                                Buttons
                            </h2>
                            <span className="text-sm text-gray-500">
                                Variasi warna & ukuran
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <Button
                                text="Primary"
                                size="long"
                                color="primary"
                            />
                            <Button
                                text="Secondary"
                                size="long"
                                color="secondary"
                                type="secondary"
                            />
                            <Button text="Accent" size="long" color="accent" />
                            <Button
                                text="Success"
                                size="long"
                                color="success"
                            />
                            <Button
                                text="Warning"
                                size="long"
                                color="warning"
                            />
                            <Button text="Hazard" size="long" color="hazard" />
                            <Button text="Disabled" size="long" disabled />
                            <Button
                                text="Full Width"
                                size="full"
                                color="primary"
                                className="col-span-1 md:col-span-2"
                            />
                        </div>
                    </section>

                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-simbaris-text">
                                Input Fields
                            </h2>
                            <span className="text-sm text-gray-500">
                                States & tipe password
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                label="Input Primary"
                                placeholder="Masukkan teks"
                                helperText="Helper text default"
                                status="primary"
                            />
                            <InputField
                                label="Input Success"
                                placeholder="Berhasil"
                                helperText="Helper text success"
                                status="success"
                            />
                            <InputField
                                label="Input Warning"
                                placeholder="Perlu perhatian"
                                helperText="Helper text warning"
                                status="warning"
                            />
                            <InputField
                                label="Input Error"
                                placeholder="Ada error"
                                helperText="Helper text error"
                                status="error"
                            />
                            <InputField
                                label="Password Field"
                                placeholder="Masukkan password"
                                type="password"
                                helperText="Klik ikon untuk toggle"
                                status="primary"
                            />
                            <InputField
                                label="Disabled Field"
                                placeholder="Tidak bisa diisi"
                                helperText="Disabled state"
                                status="primary"
                                disabled
                            />
                        </div>
                    </section>

                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-simbaris-text">
                                Combobox
                            </h2>
                            <span className="text-sm text-gray-500">
                                Fitur pencarian & pilih
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                            <ComboBox
                                label="Pilih Mata Lomba"
                                placeholder="Cari atau pilih opsi"
                                helperText="Coba ketik untuk filter opsi"
                                options={comboboxOptions}
                                onSelect={setSelectedOption}
                                value={selectedOption}
                            />
                            <div className="bg-simbaris-primary-lightest text-simbaris-primary border border-simbaris-primary rounded-lg p-4">
                                <p className="font-semibold">Output</p>
                                <p className="text-sm text-simbaris-text">
                                    {selectedOption
                                        ? `Opsi terpilih: ${selectedOption}`
                                        : 'Belum ada opsi yang dipilih.'}
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-simbaris-text">
                                Avatar & Breadcrumbs
                            </h2>
                            <span className="text-sm text-gray-500">
                                Badge identitas & navigasi
                            </span>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className="flex items-center gap-3">
                                <Avatar initials="TS" name="Tim Simbaris" />
                                <div className="flex flex-col">
                                    <span className="font-semibold text-simbaris-text">
                                        Tim Simbaris
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        Contoh avatar tanpa foto
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ComponentsCheck;
