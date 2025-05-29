
import React from 'react';
import { cn } from '@/lib/utils';

interface HungerBarProps {
  level: number;
  size?: 'small' | 'medium' | 'large';
}

export const HungerBar: React.FC<HungerBarProps> = ({ level, size = 'medium' }) => {
  const getBarColor = (level: number) => {
    if (level <= 2) return 'bg-red-500';
    if (level <= 4) return 'bg-orange-500';
    if (level <= 6) return 'bg-yellow-500';
    if (level <= 8) return 'bg-green-500';
    return 'bg-blue-500';
  };

  const sizeClasses = {
    small: 'w-12 h-2',
    medium: 'w-20 h-3',
    large: 'w-32 h-4'
  };

  return (
    <div className={cn('bg-gray-200 rounded-full overflow-hidden', sizeClasses[size])}>
      <div 
        className={cn('h-full transition-all duration-300 rounded-full', getBarColor(level))}
        style={{ width: `${(level / 10) * 100}%` }}
      />
    </div>
  );
};
