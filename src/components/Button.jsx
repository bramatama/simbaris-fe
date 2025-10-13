import React from "react";

const Button = ({
  text = "Button",
  onClick,
  type = "primary",
  color = "primary",
  round = "half",
  size = "default",
  leftIcon,
  rightIcon,
  disabled = false,
  className = "",
  ...props
}) => {
  const sizeStyles = {
    default: "h-11 min-w-[140px] max-w-[145px] px-4",
    long: "h-11 min-w-[230px] px-6",
  };

  const roundStyles = {
    half: "rounded-lg",
    full: "rounded-full",
  };

  const colorStyles = {
    primary: {
      primary:
        "bg-simbaris-primary text-white hover:bg-simbaris-primary-dark",
      secondary:
        "bg-simbaris-secondary text-white hover:bg-simbaris-secondary-dark",
      accent:
        "bg-simbaris-accent text-white hover:bg-simbaris-accent-dark",
      success:
        "bg-simbaris-success text-white hover:bg-simbaris-success-dark",
      warning:
        "bg-simbaris-warning text-white hover:bg-simbaris-warning-dark",
      hazard:
        "bg-simbaris-hazard text-white hover:bg-simbaris-hazard-dark",
    },
    secondary: {
      primary:
        "text-simbaris-primary border-simbaris-primary hover:bg-simbaris-primary-lightest",
      secondary:
        "text-simbaris-secondary border-simbaris-secondary hover:bg-simbaris-secondary-lightest",
      accent:
        "text-simbaris-accent border-simbaris-accent hover:bg-simbaris-accent-lightest",
      success:
        "text-simbaris-success border-simbaris-success hover:bg-simbaris-success-lightest",
      warning:
        "text-simbaris-warning border-simbaris-warning hover:bg-simbaris-warning-lightest",
      hazard:
        "text-simbaris-hazard border-simbaris-hazard hover:bg-simbaris-hazard-lightest",
    },
  };

  const disabledStyles = {
    primary:
      "bg-gray-200 text-gray-400 border-transparent",
    secondary:
      "text-gray-400 border-gray-200 bg-transparent",
  };

  const focusedStyles = {
    primary: {
      primary: "bg-simbaris-primary-dark",
      secondary: "bg-simbaris-secondary-dark",
      accent: "bg-simbaris-accent-dark",
      success: "bg-simbaris-success-dark",
      warning: "bg-simbaris-warning-dark",
      hazard: "bg-simbaris-hazard-dark",
    },
    secondary: {
      primary: "bg-simbaris-primary-lightest text-simbaris-primary",
      secondary: "bg-simbaris-secondary-lightest text-simbaris-secondary",
      accent: "bg-simbaris-accent-lightest text-simbaris-accent",
      success: "bg-simbaris-success-lightest text-simbaris-success",
      warning: "bg-simbaris-warning-lightest text-simbaris-warning",
      hazard: "bg-simbaris-hazard-lightest text-simbaris-hazard",
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
          type === "secondary"
            ? "border-2 bg-transparent"
            : "border-2 border-transparent"
        }
        ${
          disabled
            ? `cursor-not-allowed ${disabledStyles[type]}`
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
