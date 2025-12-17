import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const InputField = ({
    label,
    placeholder = 'Placeholder',
    helperText = '',
    type = 'text',
    status = 'primary', // primary | success | warning | error
    rightIcon = true, // aktifkan ikon mata hanya jika type=password
    leftIcon,
    disabled = false,
    className = '',
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const statusStyles = {
        primary:
            'border-simbaris-primary focus:ring-simbaris-primary-light text-gray-700',
        success:
            'border-simbaris-success focus:ring-simbaris-success-light text-gray-700',
        warning:
            'border-simbaris-warning focus:ring-simbaris-warning-light text-gray-700',
        error: 'border-simbaris-hazard focus:ring-simbaris-hazard-light text-gray-700',
    };

    const helperTextStyles = {
        primary: 'text-simbaris-primary',
        success: 'text-simbaris-success',
        warning: 'text-simbaris-warning',
        error: 'text-simbaris-hazard',
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {/* Label */}
            {label && (
                <label className="font-medium text-sm text-gray-700">
                    {label}
                </label>
            )}

            {/* Input Wrapper */}
            <div className="flex gap-2 items-center border border-simbaris-primary rounded-md w-full h-11 px-3 py-2">
                {/* Left Icon */}
                {leftIcon && (
                    <div className="left-3 text-gray-500">{leftIcon}</div>
                )}
                <input
                    type={inputType}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`focus:outline-none w-full ${statusStyles[status]} ${
                        disabled ? 'cursor-not-allowed bg-transparent' : ''
                    } `}
                    {...props}
                />

                {/* Right Icon (Show/Hide Password) */}
                {type === 'password' && rightIcon && (
                    <button
                        type="button"
                        onClick={handleTogglePassword}
                        className="relative right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        {showPassword ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                )}
            </div>

            {/* Helper Text */}
            <span className={`text-xs ${helperTextStyles[status]} mt-1`}>
                {helperText}
            </span>
        </div>
    );
};

export default InputField;
