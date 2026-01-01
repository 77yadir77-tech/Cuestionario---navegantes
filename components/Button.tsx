import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-8 py-4 rounded-xl font-bold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 transform active:scale-95 shadow-md";
  
  const variants = {
    primary: "bg-brand-green hover:bg-brand-green-dark text-white shadow-brand-green/30",
    secondary: "bg-white hover:bg-white/90 text-brand-purple border-2 border-brand-purple/20",
    outline: "bg-transparent border-2 border-white text-white hover:bg-white/10",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};