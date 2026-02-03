import React from 'react';

const Button = ({
    children,
    onClick,
    disabled = false,
    variant = 'threedee',
    color = 'primary',
    mode = 'normal',
    isActive = false,
    className = '',
    ...props
}) => {
    const baseClasses = 'font-bold transition-all duration-300 ease-out relative overflow-hidden group';

    const variantStyles = {
        threedee: 'px-2 py-4 text-sm rounded-2xl active:shadow-none active:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-2xl',
        mode: 'px-6 py-3 rounded-xl hover:scale-105',
    };

    const colorStyles = {
        primary:
            'bg-primary text-white hover:bg-primary-dark shadow-[0_4px_0_theme(colors.primary.dark)]',
        secondary:
            'bg-normal text-white hover:bg-normal-dark shadow-[0_4px_0_theme(colors.normal.dark)]',
        danger:
            'bg-danger text-white hover:bg-danger-dark shadow-[0_4px_0_theme(colors.danger.dark)]',
        google:
            'bg-google text-gray-800 hover:bg-google-dark shadow-[0_4px_0_theme(colors.google.dark)]',
        success:
            'bg-success text-white hover:bg-success-dark shadow-[0_4px_0_theme(colors.success.dark)]',
        speed:
            'bg-speed text-white hover:bg-speed-dark shadow-[0_4px_0_theme(colors.speed.dark)]',
        normal: 'bg-normal-light text-gray-800 shadow-lg scale-105',
        connect: 'bg-connect-light text-gray-800 shadow-lg scale-105',
        inactive: 'bg-white/10 text-white hover:bg-white/20',
        warning:
            'bg-warning text-white hover:bg-warning-dark shadow-[0_4px_0_theme(colors.warning.dark)]',
    };

    let selectedVariantClass, selectedColorClass;

    if (variant === 'mode') {
        selectedVariantClass = variantStyles.mode;
        selectedColorClass = isActive ? colorStyles[mode] : colorStyles.inactive;
    } else { // threedee
        selectedVariantClass = variantStyles.threedee;
        selectedColorClass = colorStyles[color];
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${selectedVariantClass} ${selectedColorClass} ${className}`}
            {...props}
        >
            {/* Shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            <span className="relative z-10">{children}</span>
        </button>
    );
};

export default Button;
