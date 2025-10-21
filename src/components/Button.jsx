import React from 'react';

const Button = ({
    text = 'Button',
    onClick,
    type = 'primary',
    color = 'primary',
    round = 'half',
    size,
    leftIcon,
    rightIcon,
    disabled = false,
    className = '',
    ...props
}) => {
    const sizeStyles = {
        default: 'h-11 w-36 px-4',
        long: 'h-11 w-60 px-6',
        full: 'h-11 w-full px-6'
    };

    const roundStyles = {
        half: 'rounded-lg',
        full: 'rounded-full',
    };

    const colorStyles = {
        primary: {
            primary:
                'bg-simbaris-primary text-gray-50 hover:bg-simbaris-primary-dark',
            secondary:
                'bg-simbaris-secondary text-gray-50 hover:bg-simbaris-secondary-dark',
            accent: 'bg-simbaris-accent text-gray-50 hover:bg-simbaris-accent-dark',
            success:
                'bg-simbaris-success text-gray-50 hover:bg-simbaris-success-dark',
            warning:
                'bg-simbaris-warning text-gray-50 hover:bg-simbaris-warning-dark',
            hazard: 'bg-simbaris-hazard text-gray-50 hover:bg-simbaris-hazard-dark',
        },
        secondary: {
            primary:
                'bg-white text-simbaris-primary border-simbaris-primary hover:bg-simbaris-primary-lightest',
            secondary:
                'bg-white text-simbaris-secondary border-simbaris-secondary hover:bg-simbaris-secondary-lightest',
            accent: 'bg-white text-simbaris-accent border-simbaris-accent hover:bg-simbaris-accent-lightest',
            success:
                'bg-white text-simbaris-success border-simbaris-success hover:bg-simbaris-success-lightest',
            warning:
                'bg-white text-simbaris-warning border-simbaris-warning hover:bg-simbaris-warning-lightest',
            hazard: 'bg-white text-simbaris-hazard border-simbaris-hazard hover:bg-simbaris-hazard-lightest',
        },
    };

    const disabledStyles = {
        primary: 'bg-gray-200 text-simbaris-secondary-light cursor-not-allowed',
        secondary: 'bg-gray-200 text-simbaris-secondary-light cursor-not-allowed',
        accent: 'bg-gray-200 text-simbaris-accent-light cursor-not-allowed',
        success: 'bg-gray-200 text-simbaris-success-light cursor-not-allowed',
        warning: 'bg-gray-200 text-simbaris-warning-light cursor-not-allowed',
        hazard: 'bg-gray-200 text-simbaris-hazard-light cursor-not-allowed',
    };

    const focusedStyles = {
        primary: {
            primary: 'bg-simbaris-primary-dark',
            secondary: 'bg-simbaris-secondary-dark',
            accent: 'bg-simbaris-accent-dark',
            success: 'bg-simbaris-success-dark',
            warning: 'bg-simbaris-warning-dark',
            hazard: 'bg-simbaris-hazard-dark',
        },
        secondary: {
            primary: 'bg-simbaris-primary-lightest text-simbaris-primary',
            secondary: 'bg-simbaris-secondary-lightest text-simbaris-secondary',
            accent: 'bg-simbaris-accent-lightest text-simbaris-accent',
            success: 'bg-simbaris-success-lightest text-simbaris-success',
            warning: 'bg-simbaris-warning-lightest text-simbaris-warning',
            hazard: 'bg-simbaris-hazard-lightest text-simbaris-hazard',
        },
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
        inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-200 focus:${focusedStyles[type][color]}
        ${sizeStyles[size]}
        ${roundStyles[round]}
        ${
            type === 'secondary'
                ? 'border-2 bg-transparent'
                : 'border-2 border-transparent'
        }
        ${
            disabled
                ? `cursor-not-allowed ${disabledStyles[color]}`
                : colorStyles[type][color]
        }
        ${className} 
      `}
            {...props}
        >
            {leftIcon}
            <span>{text}</span>
            {rightIcon}
        </button>
    );
};

export default Button;
