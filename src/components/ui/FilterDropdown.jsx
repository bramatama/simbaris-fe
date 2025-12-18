import { useState, useRef, useEffect } from 'react';
import { Filter, ChevronDown, XCircle, Loader2 } from 'lucide-react';

const FilterDropdown = ({
    label,
    options,
    value,
    onChange,
    isLoading = false,
    disabled = false,
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

    const activeLabel = value
        ? options.find((opt) => opt.value === value)?.label
        : label;

    const isDisabled = isLoading || disabled;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => !isDisabled && setIsOpen(!isOpen)}
                disabled={isDisabled}
                className={`group flex items-center justify-between gap-3 px-3 py-2 h-11 border rounded-md text-sm transition-all duration-200 min-w-[140px] ${
                    isDisabled
                        ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                        : value
                          ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                          : 'bg-white border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600'
                }`}
            >
                {/* Bagian Kiri: Ikon Filter & Label */}
                <div className="flex items-center gap-2 truncate">
                    {/* Tampilkan ikon filter hanya jika belum ada nilai terpilih */}
                    {!value && (
                        <Filter
                            size={16}
                            className="text-gray-400 group-hover:text-blue-500 shrink-0"
                        />
                    )}
                    <span className="font-medium truncate">{activeLabel}</span>
                </div>

                {/* Bagian Kanan: Chevron atau Clear */}
                {isLoading ? (
                    <Loader2
                        size={16}
                        className="animate-spin text-gray-400 shrink-0"
                    />
                ) : value ? (
                    <div
                        className="p-0.5 rounded-full hover:bg-blue-200 text-blue-500 transition-colors shrink-0"
                        onClick={(e) => {
                            e.stopPropagation();
                            onChange('');
                        }}
                    >
                        <XCircle size={16} />
                    </div>
                ) : (
                    <ChevronDown
                        size={16}
                        className={`text-gray-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                    />
                )}
            </button>

            {isOpen && !isDisabled && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-0 border border-gray-100 py-1 animate-in fade-in zoom-in-95 duration-100">
                    <div className="py-2 px-3 mb-1 border-b border-gray-50 bg-gray-50/50">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Filter berdasarkan {label}
                        </span>
                    </div>
                    <div className="max-h-60 overflow-y-auto py-1">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between group/item ${
                                    value === option.value
                                        ? 'bg-blue-50 text-blue-700 font-medium'
                                        : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <span>{option.label}</span>
                                {value === option.value && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;
