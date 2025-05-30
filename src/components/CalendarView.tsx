
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, addDays, subDays, isSameDay, startOfDay, parseISO } from 'date-fns';
import { MealEntry } from '@/pages/Index';
import { HungerBar } from '@/components/HungerBar';
import { MealEntryDialog } from '@/components/MealEntryDialog';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

interface CalendarViewProps {
  entries: MealEntry[];
  onUpdateEntry: (entry: MealEntry) => void;
  onDeleteEntry: (entryId: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ entries, onUpdateEntry, onDeleteEntry }) => {
  const [selectedEntry, setSelectedEntry] = useState<MealEntry | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Generate 30 days: 15 days before today, today, and 14 days after
  const today = new Date();
  const days = Array.from({ length: 30 }, (_, i) => addDays(today, i - 15));

  const getEntriesForDay = (day: Date) => {
    return entries.filter(entry => {
      const entryDate = parseISO(entry.date);
      return isSameDay(entryDate, day);
    });
  };

  const handleEntryClick = (entry: MealEntry) => {
    setSelectedEntry(entry);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedEntry(null);
  };

  return (
    <>
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
          <CardTitle className="text-xl text-center">Daily Hunger Tracking</CardTitle>
          <p className="text-center text-green-100 text-sm">Scroll horizontally to navigate through dates</p>
        </CardHeader>
        <CardContent className="p-6">
          <Carousel
            opts={{
              align: "center",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {days.map(day => {
                const dayEntries = getEntriesForDay(day);
                const isToday = isSameDay(day, today);
                return (
                  <CarouselItem key={day.toISOString()} className="pl-2 md:pl-4 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/7">
                    <div className={`min-h-[160px] border-2 rounded-xl p-3 ${
                      isToday 
                        ? 'bg-gradient-to-br from-green-100 to-green-200 border-green-400 shadow-lg' 
                        : 'bg-white border-green-200 hover:border-green-300 transition-colors'
                    }`}>
                      <div className={`text-sm font-bold mb-2 text-center ${
                        isToday ? 'text-green-800' : 'text-green-700'
                      }`}>
                        <div>{format(day, 'EEE')}</div>
                        <div className="text-lg">{format(day, 'd')}</div>
                        <div className="text-xs">{format(day, 'MMM')}</div>
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
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
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
