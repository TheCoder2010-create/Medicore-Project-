import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
  testId?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled,
  children,
  className = '',
  testId,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-semibold rounded-lg 
    transition-all duration-300 ease-in-out transform
    focus:outline-none focus:ring-4 focus:ring-offset-2
    disabled:cursor-not-allowed disabled:transform-none
    relative overflow-hidden
    ${fullWidth ? 'w-full' : ''}
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-blue-600 to-purple-600 text-white
      hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-xl
      active:scale-95 active:shadow-lg
      focus:ring-blue-500
      disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-500
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent
      before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700
    `,
    secondary: `
      bg-white text-blue-600 border-2 border-blue-600
      hover:bg-blue-50 hover:scale-105 hover:shadow-lg hover:border-blue-700
      active:scale-95 active:bg-blue-100
      focus:ring-blue-500
      disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-300
    `,
    tertiary: `
      bg-gray-100 text-gray-700 border border-gray-300
      hover:bg-gray-200 hover:scale-105 hover:shadow-md hover:border-gray-400
      active:scale-95 active:bg-gray-300
      focus:ring-gray-500
      disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200
    `,
    ghost: `
      bg-transparent text-blue-600 border-2 border-transparent
      hover:bg-blue-50 hover:scale-105 hover:border-blue-200
      active:scale-95 active:bg-blue-100
      focus:ring-blue-500
      disabled:text-gray-400 disabled:hover:bg-transparent
    `,
    danger: `
      bg-gradient-to-r from-red-600 to-red-700 text-white
      hover:from-red-700 hover:to-red-800 hover:scale-105 hover:shadow-xl
      active:scale-95 active:shadow-lg
      focus:ring-red-500
      disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-500
    `
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]',
    xl: 'px-10 py-5 text-xl min-h-[60px]'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  };

  const isDisabled = disabled || loading;

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={isDisabled}
      data-testid={testId}
      aria-label={typeof children === 'string' ? children : undefined}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className={`border-2 border-current border-t-transparent rounded-full ${
              size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : size === 'lg' ? 'w-6 h-6' : 'w-7 h-7'
            }`}
          />
        </div>
      )}
      
      <span className={`flex items-center ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {Icon && iconPosition === 'left' && (
          <Icon className={`${iconSizes[size]} ${children ? 'mr-2' : ''}`} />
        )}
        {children}
        {Icon && iconPosition === 'right' && (
          <Icon className={`${iconSizes[size]} ${children ? 'ml-2' : ''}`} />
        )}
      </span>
    </motion.button>
  );
};

export default CTAButton;