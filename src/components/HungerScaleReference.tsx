
import React from 'react';

export const HungerScaleReference: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200 shadow-lg">
      <h3 className="text-lg font-bold text-green-800 mb-4 text-center">Hunger Scale Reference</h3>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
          <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">1</div>
          <div className="text-sm text-gray-700">Starving, weak, dizzy</div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">2</div>
          <div className="text-sm text-gray-700">Very hungry, cranky, low energy</div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
          <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-sm">3</div>
          <div className="text-sm text-gray-700">Pretty hungry, stomach growling</div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
          <div className="w-8 h-8 rounded-full bg-lime-500 flex items-center justify-center text-white font-bold text-sm">4</div>
          <div className="text-sm text-gray-700">Starting to feel hungry</div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border-2 border-green-300">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">5</div>
          <div className="text-sm font-semibold text-green-800">Neutral, not hungry or full</div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border-2 border-green-300">
          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm">6</div>
          <div className="text-sm font-semibold text-green-800">Slightly full, pleasantly satisfied</div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border-2 border-green-300">
          <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white font-bold text-sm">7</div>
          <div className="text-sm font-semibold text-green-800">Full and satisfied</div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">8</div>
          <div className="text-sm text-gray-700">Very full, somewhat uncomfortable</div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">9</div>
          <div className="text-sm text-gray-700">Very uncomfortable, stomach hurts</div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm">10</div>
          <div className="text-sm text-gray-700">Sick from overeating</div>
        </div>
      </div>
    </div>
  );
};
