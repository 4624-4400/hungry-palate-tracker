
import React from 'react';
import { cn } from '@/lib/utils';

interface HungerBarProps {
  level: number;
  size?: 'small' | 'medium' | 'large';
}

export const HungerBar: React.FC<HungerBarProps> = ({ level, size = 'medium' }) => {
  const getBarColor = (level: number) => {
    if (level <= 2) return 'bg-gradient-to-r from-red-500 to-red-600';
    if (level <= 4) return 'bg-gradient-to-r from-orange-500 to-yellow-500';
    if (level <= 6) return 'bg-gradient-to-r from-green-500 to-emerald-500';
    if (level <= 8) return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    return 'bg-gradient-to-r from-purple-500 to-pink-500';
  };

  const sizeClasses = {
    small: 'w-12 h-3',
    medium: 'w-20 h-4',
    large: 'w-32 h-5'
  };

  return (
    <div className={cn('bg-gray-200 rounded-full overflow-hidden shadow-inner border border-gray-300', sizeClasses[size])}>
      <div 
        className={cn('h-full transition-all duration-500 rounded-full shadow-sm', getBarColor(level))}
        style={{ width: `${(level / 10) * 100}%` }}
      />
    </div>
  );
};
