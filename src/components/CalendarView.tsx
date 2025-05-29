
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns';
import { MealEntry } from '@/pages/Index';
import { HungerBar } from '@/components/HungerBar';

interface CalendarViewProps {
  entries: MealEntry[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ entries }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEntriesForDay = (day: Date) => {
    return entries.filter(entry => isSameDay(new Date(entry.date), day));
  };

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Hunger Tracking Calendar</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg font-medium min-w-[200px] text-center">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <Button variant="outline" size="sm" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-medium text-gray-500 p-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {daysInMonth.map(day => {
            const dayEntries = getEntriesForDay(day);
            return (
              <div key={day.toISOString()} className="min-h-[120px] border rounded-lg p-2 bg-white">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  {format(day, 'd')}
                </div>
                
                {dayEntries.length > 0 ? (
                  <div className="space-y-1">
                    {dayEntries.map(entry => (
                      <div key={entry.id} className="text-xs bg-blue-50 rounded p-1">
                        <div className="font-medium text-blue-800 mb-1">
                          {entry.mealType}
                        </div>
                        <div className="text-blue-600 mb-1">
                          {entry.calories} kcal
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-gray-600">Pre:</span>
                          <HungerBar level={entry.preMealHunger} size="small" />
                          <span className="text-xs">{entry.preMealHunger}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-gray-600">Post:</span>
                          <HungerBar level={entry.postMealHunger} size="small" />
                          <span className="text-xs">{entry.postMealHunger}</span>
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
