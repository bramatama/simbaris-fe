import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const Dropdown = ({
    label,
    options = [],
    value,
    onChange,
    disabled = false,
    className = '',
    placeholder,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find((opt) => opt.value === value);

    return (
        <div className={`flex flex-col gap-2 ${className}`} ref={dropdownRef}>
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    disabled={disabled}
                    className={`w-full flex items-center justify-between border rounded-lg px-3 py-2.5 text-left transition-all bg-white focus:outline-none focus:ring-2 focus:ring-simbaris-primary/50 focus:border-simbaris-primary ${
                        disabled
                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300'
                            : 'border-gray-300 text-gray-900 hover:border-blue-400'
                    } ${!value && placeholder ? 'text-gray-400' : ''}`}
                >
                    <span className="truncate">
                        {selectedOption
                            ? selectedOption.label
                            : placeholder || 'Pilih opsi'}
                    </span>
                    <ChevronDown
                        size={20}
                        className={`text-gray-500 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                    />
                </button>

                {isOpen && !disabled && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto animate-in fade-in zoom-in-95 duration-100">
                        <div className="p-1">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                                        value === option.value
                                            ? 'bg-blue-50 text-blue-700 font-medium'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <span>{option.label}</span>
                                    {value === option.value && (
                                        <Check
                                            size={16}
                                            className="text-blue-600"
                                        />
                                    )}
                                </button>
                            ))}
                            {options.length === 0 && (
                                <div className="px-3 py-2 text-sm text-gray-500 text-center">
                                    Tidak ada opsi
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dropdown;
