
import React, { useState, useEffect } from 'react';
import { HungerTrackingForm } from '@/components/HungerTrackingForm';
import { CalendarView } from '@/components/CalendarView';
import { DownloadButton } from '@/components/DownloadButton';
import { UploadButton } from '@/components/UploadButton';
import { HungerScaleReference } from '@/components/HungerScaleReference';
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

  const updateMealEntry = (updatedEntry: MealEntry) => {
    setMealEntries(prev => 
      prev.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry)
    );
  };

  const deleteMealEntry = (entryId: string) => {
    setMealEntries(prev => prev.filter(entry => entry.id !== entryId));
  };

  const uploadMealEntries = (newEntries: MealEntry[]) => {
    setMealEntries(prev => [...prev, ...newEntries]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-lime-100">
      <div className="max-w-7xl mx-auto p-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
            Hunger Level Tracker
          </h1>
          <p className="text-gray-600 text-lg">Monitor your hunger levels before and after meals</p>
        </header>

        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-xl shadow-lg border-2 border-green-200 overflow-hidden">
            <Button
              variant={currentView === 'form' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('form')}
              className={`rounded-none px-6 py-3 font-semibold ${
                currentView === 'form' 
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700' 
                  : 'text-green-600 hover:bg-green-50'
              }`}
            >
              Add Entry
            </Button>
            <Button
              variant={currentView === 'calendar' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('calendar')}
              className={`rounded-none px-6 py-3 font-semibold ${
                currentView === 'calendar' 
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700' 
                  : 'text-green-600 hover:bg-green-50'
              }`}
            >
              View Calendar
            </Button>
          </div>
        </div>

        {currentView === 'form' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <HungerTrackingForm onSubmit={addMealEntry} />
            </div>
            <div>
              <HungerScaleReference />
            </div>
          </div>
        ) : (
          <CalendarView 
            entries={mealEntries} 
            onUpdateEntry={updateMealEntry}
            onDeleteEntry={deleteMealEntry}
          />
        )}

        <div className="fixed bottom-6 right-6 flex space-x-3">
          <UploadButton onUpload={uploadMealEntries} />
          <DownloadButton entries={mealEntries} />
        </div>
      </div>
    </div>
  );
};

export default Index;
