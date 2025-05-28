
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transform hover:scale-105 active:scale-95';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl focus:ring-primary/50',
    secondary: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground shadow-md hover:shadow-lg focus:ring-secondary/50',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-md hover:shadow-lg focus:ring-primary/50',
    ghost: 'hover:bg-accent hover:text-accent-foreground focus:ring-accent/50',
    destructive: 'bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg hover:shadow-xl focus:ring-destructive/50'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm h-9',
    md: 'px-6 py-3 text-base h-11',
    lg: 'px-8 py-4 text-lg h-13'
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
