
import React, { useState, useEffect } from 'react';
import { HungerTrackingForm } from '@/components/HungerTrackingForm';
import { CalendarView } from '@/components/CalendarView';
import { DownloadButton } from '@/components/DownloadButton';
import { Button } from '@/components/ui/button';

export interface MealEntry {
  id: string;
  date: string;
  mealType: string;
  foodDescription: string;
  calories: number;
  preMealHunger: number;
  postMealHunger: number;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'form' | 'calendar'>('form');
  const [mealEntries, setMealEntries] = useState<MealEntry[]>([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('hungerTrackingEntries');
    if (savedEntries) {
      try {
        setMealEntries(JSON.parse(savedEntries));
      } catch (error) {
        console.error('Error loading saved entries:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever mealEntries changes
  useEffect(() => {
    localStorage.setItem('hungerTrackingEntries', JSON.stringify(mealEntries));
  }, [mealEntries]);

  const addMealEntry = (entry: Omit<MealEntry, 'id'>) => {
    const newEntry: MealEntry = {
      ...entry,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    setMealEntries(prev => [...prev, newEntry]);
    setCurrentView('calendar');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Hunger Level Tracker</h1>
          <p className="text-gray-600">Monitor your hunger levels before and after meals</p>
        </header>

        <div className="flex justify-center mb-6">
          <div className="flex bg-white rounded-lg shadow-sm border">
            <Button
              variant={currentView === 'form' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('form')}
              className="rounded-r-none"
            >
              Add Entry
            </Button>
            <Button
              variant={currentView === 'calendar' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('calendar')}
              className="rounded-l-none"
            >
              View Calendar
            </Button>
          </div>
        </div>

        {currentView === 'form' ? (
          <HungerTrackingForm onSubmit={addMealEntry} />
        ) : (
          <CalendarView entries={mealEntries} />
        )}

        <div className="fixed bottom-4 right-4">
          <DownloadButton entries={mealEntries} />
        </div>
      </div>
    </div>
  );
};

export default Index;
