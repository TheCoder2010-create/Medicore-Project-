import React from 'react';
import { motion } from 'framer-motion';

interface CTAButtonGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
}

const CTAButtonGroup: React.FC<CTAButtonGroupProps> = ({
  children,
  orientation = 'horizontal',
  spacing = 'md',
  align = 'center',
  className = ''
}) => {
  const orientationClasses = {
    horizontal: 'flex-row',
    vertical: 'flex-col'
  };

  const spacingClasses = {
    sm: orientation === 'horizontal' ? 'space-x-2' : 'space-y-2',
    md: orientation === 'horizontal' ? 'space-x-4' : 'space-y-4',
    lg: orientation === 'horizontal' ? 'space-x-6' : 'space-y-6'
  };

  const alignClasses = {
    start: 'justify-start items-start',
    center: 'justify-center items-center',
    end: 'justify-end items-end',
    stretch: 'justify-stretch items-stretch'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        flex ${orientationClasses[orientation]} ${spacingClasses[spacing]} ${alignClasses[align]}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default CTAButtonGroup;