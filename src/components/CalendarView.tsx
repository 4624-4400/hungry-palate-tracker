
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, subDays, isSameDay, startOfDay } from 'date-fns';
import { MealEntry } from '@/pages/Index';
import { HungerBar } from '@/components/HungerBar';

interface CalendarViewProps {
  entries: MealEntry[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ entries }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    // Start from 6 days ago to show the most recent 7 days
    return startOfDay(subDays(new Date(), 6));
  });

  // Generate 7 consecutive days starting from currentWeekStart
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));

  const getEntriesForDay = (day: Date) => {
    return entries.filter(entry => isSameDay(new Date(entry.date), day));
  };

  const previousWeek = () => {
    setCurrentWeekStart(subDays(currentWeekStart, 7));
  };

  const nextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };

  const goToCurrentWeek = () => {
    setCurrentWeekStart(startOfDay(subDays(new Date(), 6)));
  };

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Weekly Hunger Tracking</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="secondary" size="sm" onClick={previousWeek} className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="sm" onClick={goToCurrentWeek} className="bg-white/20 hover:bg-white/30 text-white border-white/30 min-w-[100px]">
              This Week
            </Button>
            <Button variant="secondary" size="sm" onClick={nextWeek} className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="text-center text-green-100">
          {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-7 gap-3">
          {weekDays.map(day => {
            const dayEntries = getEntriesForDay(day);
            const isToday = isSameDay(day, new Date());
            return (
              <div key={day.toISOString()} className={`min-h-[140px] border-2 rounded-xl p-3 ${
                isToday 
                  ? 'bg-gradient-to-br from-green-100 to-green-200 border-green-400 shadow-lg' 
                  : 'bg-white border-green-200 hover:border-green-300 transition-colors'
              }`}>
                <div className={`text-sm font-bold mb-2 text-center ${
                  isToday ? 'text-green-800' : 'text-green-700'
                }`}>
                  <div>{format(day, 'EEE')}</div>
                  <div className="text-lg">{format(day, 'd')}</div>
                </div>
                
                {dayEntries.length > 0 ? (
                  <div className="space-y-2">
                    {dayEntries.map(entry => (
                      <div key={entry.id} className="text-xs bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-2 border border-green-200">
                        <div className="font-semibold text-green-800 mb-1">
                          {entry.mealType}
                        </div>
                        <div className="text-green-700 mb-1 font-medium">
                          {entry.calories} kcal
                        </div>
                        <div className="flex items-center space-x-1 mb-1">
                          <span className="text-xs text-green-600 font-medium">Pre:</span>
                          <HungerBar level={entry.preMealHunger} size="small" />
                          <span className="text-xs font-bold text-green-800">{entry.preMealHunger}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-green-600 font-medium">Post:</span>
                          <HungerBar level={entry.postMealHunger} size="small" />
                          <span className="text-xs font-bold text-green-800">{entry.postMealHunger}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-gray-400 text-center mt-8">
                    No entries
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
