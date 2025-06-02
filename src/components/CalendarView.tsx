
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, addDays, subDays, isSameDay, startOfDay, parseISO } from 'date-fns';
import { MealEntry } from '@/pages/Index';
import { HungerBar } from '@/components/HungerBar';
import { MealEntryDialog } from '@/components/MealEntryDialog';

interface CalendarViewProps {
  entries: MealEntry[];
  onUpdateEntry: (entry: MealEntry) => void;
  onDeleteEntry: (entryId: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ entries, onUpdateEntry, onDeleteEntry }) => {
  const [selectedEntry, setSelectedEntry] = useState<MealEntry | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [visibleDates, setVisibleDates] = useState<Date[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  // Generate 60 days: 30 days before today, today, and 29 days after
  const allDays = Array.from({ length: 60 }, (_, i) => addDays(today, i - 30));

  useEffect(() => {
    // Initialize with today's date centered (show 7 days with today in the middle)
    const initialDates = Array.from({ length: 7 }, (_, i) => addDays(today, i - 3));
    setVisibleDates(initialDates);
    
    // Auto-scroll to center today
    if (scrollContainerRef.current) {
      const todayIndex = allDays.findIndex(day => isSameDay(day, today));
      const dayWidth = scrollContainerRef.current.scrollWidth / allDays.length;
      const scrollPosition = (todayIndex - 3) * dayWidth; // Center today (3 days from left)
      scrollContainerRef.current.scrollLeft = scrollPosition;
    }
  }, []);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const dayWidth = container.scrollWidth / allDays.length;
    const startIndex = Math.floor(scrollLeft / dayWidth);
    
    // Show 7 consecutive days starting from the calculated index
    const newVisibleDates = allDays.slice(startIndex, startIndex + 7);
    setVisibleDates(newVisibleDates);
  };

  const getEntriesForDay = (day: Date) => {
    return entries.filter(entry => {
      const entryDate = parseISO(entry.date);
      return isSameDay(entryDate, day);
    });
  };

  const getTotalCaloriesForDay = (day: Date) => {
    const dayEntries = getEntriesForDay(day);
    return dayEntries.reduce((total, entry) => total + entry.calories, 0);
  };

  const handleEntryClick = (entry: MealEntry) => {
    setSelectedEntry(entry);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedEntry(null);
  };

  const getDateRangeText = () => {
    if (visibleDates.length === 0) return '';
    const startDate = visibleDates[0];
    const endDate = visibleDates[visibleDates.length - 1];
    return `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`;
  };

  return (
    <>
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
          <CardTitle className="text-xl text-center">Daily Hunger Tracking</CardTitle>
          <p className="text-center text-green-100 text-sm">{getDateRangeText()}</p>
        </CardHeader>
        <CardContent className="p-6">
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide"
            onScroll={handleScroll}
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="flex space-x-4" style={{ width: `${allDays.length * 200}px` }}>
              {allDays.map(day => {
                const dayEntries = getEntriesForDay(day);
                const totalCalories = getTotalCaloriesForDay(day);
                const isToday = isSameDay(day, today);
                return (
                  <div 
                    key={day.toISOString()} 
                    className={`min-w-[180px] min-h-[160px] border-2 rounded-xl p-3 ${
                      isToday 
                        ? 'bg-gradient-to-br from-green-100 to-green-200 border-green-400 shadow-lg' 
                        : 'bg-white border-green-200 hover:border-green-300 transition-colors'
                    }`}
                  >
                    <div className={`text-sm font-bold mb-2 ${
                      isToday ? 'text-green-800' : 'text-green-700'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div className="text-left">
                          <div>{format(day, 'EEE')}</div>
                          <div className="text-lg">{format(day, 'd')}</div>
                          <div className="text-xs">{format(day, 'MMM')}</div>
                        </div>
                        {totalCalories > 0 && (
                          <div className="text-xs text-right">
                            <div className="font-bold text-green-800">{totalCalories}</div>
                            <div className="text-green-700">kcal</div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {dayEntries.length > 0 ? (
                      <div className="space-y-2">
                        {dayEntries.map(entry => (
                          <div 
                            key={entry.id} 
                            className="text-xs bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-2 border border-green-200 cursor-pointer hover:from-green-200 hover:to-emerald-200 transition-colors"
                            onClick={() => handleEntryClick(entry)}
                          >
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
          </div>
        </CardContent>
      </Card>

      <MealEntryDialog
        entry={selectedEntry}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onUpdate={onUpdateEntry}
        onDelete={onDeleteEntry}
      />
    </>
  );
};
