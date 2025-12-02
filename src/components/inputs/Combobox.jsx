import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const ComboBox = ({
    label = '',
    placeholder = 'Select option',
    helperText = '',
    status = 'primary',
    disabled = false,
    options = [],
    onSelect = () => {},
    value = '',
    className = '',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const containerRef = useRef(null);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const filteredOptions = options.filter((opt) =>
        opt.toLowerCase().includes(inputValue.toLowerCase())
    );

    // closes when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div className={`flex flex-col gap-1 ${className}`} ref={containerRef}>
            {label ? (
                <label className="font-medium text-sm text-gray-700">{label}</label>
            ) : null}

            {/* wrapper MUST be relative */}
            <div className="relative flex items-center">
                <input
                    type="text"
                    value={inputValue}
                    placeholder={placeholder}
                    disabled={disabled}
                    onChange={(e) => {
                        const val = e.target.value;
                        setInputValue(val);
                        setIsOpen(true);

                        if (val === '') {
                            onSelect('');
                        } else {
                            onSelect(val);
                        }
                    }}
                    onClick={() => setIsOpen(true)}
                    className={`w-full h-11 px-3 py-2 border rounded-lg transition duration-200
            border-simbaris-primary focus:outline-none
            text-gray-700 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                />

                {/* Icon */}
                <button
                    type="button"
                    className="absolute right-3 text-gray-500"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <ChevronDown size={18} />
                </button>

                {/* FLOATING DROPDOWN */}
                {isOpen && (
                    <ul
                        className="
            absolute left-0 right-0 top-full mt-1
            bg-white border rounded-lg shadow-lg 
            max-h-48 overflow-auto z-50
          "
                    >
                        {filteredOptions.length === 0 ? (
                            <li className="px-3 py-2 text-sm text-gray-500">
                                Tidak ada hasil
                            </li>
                        ) : (
                            filteredOptions.map((opt, i) => (
                                <li
                                    key={i}
                                    onClick={() => {
                                        setInputValue(opt);
                                        onSelect(opt);
                                        setIsOpen(false);
                                    }}
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                                >
                                    {opt}
                                </li>
                            ))
                        )}
                    </ul>
                )}
            </div>

            {helperText ? (
                <span className="text-xs text-simbaris-primary">{helperText}</span>
            ) : null}
        </div>
    );
};

export default ComboBox;
