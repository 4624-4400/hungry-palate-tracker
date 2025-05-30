import React from 'react';

export const HungerScaleReference: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200 shadow-lg">
      <h3 className="text-lg font-bold text-green-800 mb-4 text-center">Hunger Scale Reference</h3>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
          <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">1</div>
          <div className="text-sm text-gray-700">Starving and beyond.</div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">2</div>
          <div className="text-sm text-gray-700">You are so hungry you want to order everything on the menu.</div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
          <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-sm">3</div>
          <div className="text-sm text-gray-700">Everything on a menu begins to look good. You may be very preoccupied with your hunger.</div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
          <div className="w-8 h-8 rounded-full bg-lime-500 flex items-center justify-center text-white font-bold text-sm">4</div>
          <div className="text-sm text-gray-700">A little hungry. You can wait to eat, but you know you will be getting hungrier soon.</div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">5</div>
          <div className="text-sm text-gray-700">Neutral. Not hungry. Not full.</div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm">6</div>
          <div className="text-sm text-gray-700">No longer hungry. You sense food in your belly, but you could definitely eat more.</div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
          <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white font-bold text-sm">7</div>
          <div className="text-sm text-gray-700">Hunger is definitely gone. Stop here, and you may not feel hungry again for 3 to 4 hours.</div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">8</div>
          <div className="text-sm text-gray-700">Not uncomfortable, but definitely have eaten a belly full.</div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">9</div>
          <div className="text-sm text-gray-700">Moving into uncomfortable.</div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm">10</div>
          <div className="text-sm text-gray-700">Holiday Fest full. Very uncomfortable, maybe even painful.</div>
        </div>
      </div>
    </div>
  );
};
