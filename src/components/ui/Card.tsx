
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'glass' | 'gradient';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  padding = 'md',
  variant = 'default'
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const variantClasses = {
    default: 'bg-card text-card-foreground border',
    glass: 'glass text-foreground',
    gradient: 'bg-gradient-to-br from-card to-muted text-card-foreground border'
  };

  return (
    <div className={cn(
      'rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1',
      variantClasses[variant],
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  );
};
