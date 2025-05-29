
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MealEntry } from '@/pages/Index';

interface HungerTrackingFormProps {
  onSubmit: (entry: Omit<MealEntry, 'id'>) => void;
}

export const HungerTrackingForm: React.FC<HungerTrackingFormProps> = ({ onSubmit }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [mealType, setMealType] = useState<string>('');
  const [foodDescription, setFoodDescription] = useState<string>('');
  const [calories, setCalories] = useState<string>('');
  const [preMealHunger, setPreMealHunger] = useState<string>('');
  const [postMealHunger, setPostMealHunger] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mealType || !foodDescription || !calories || !preMealHunger || !postMealHunger) {
      alert('Please fill in all fields');
      return;
    }

    onSubmit({
      date: format(date, 'yyyy-MM-dd'),
      mealType,
      foodDescription,
      calories: parseInt(calories),
      preMealHunger: parseInt(preMealHunger),
      postMealHunger: parseInt(postMealHunger)
    });

    // Reset form
    setMealType('');
    setFoodDescription('');
    setCalories('');
    setPreMealHunger('');
    setPostMealHunger('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Add Meal Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mealType">Meal Type</Label>
              <Select value={mealType} onValueChange={setMealType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select meal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="snack">Snack</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="foodDescription">Food Description</Label>
              <Textarea
                id="foodDescription"
                placeholder="e.g., A bowl of rice with chicken"
                value={foodDescription}
                onChange={(e) => setFoodDescription(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="calories">Estimated Calories</Label>
              <Input
                id="calories"
                type="number"
                placeholder="e.g., 500"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                min="0"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preMealHunger">Pre-meal Hunger (0-10)</Label>
                <Input
                  id="preMealHunger"
                  type="number"
                  placeholder="0-10"
                  value={preMealHunger}
                  onChange={(e) => setPreMealHunger(e.target.value)}
                  min="0"
                  max="10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="postMealHunger">Post-meal Hunger (0-10)</Label>
                <Input
                  id="postMealHunger"
                  type="number"
                  placeholder="0-10"
                  value={postMealHunger}
                  onChange={(e) => setPostMealHunger(e.target.value)}
                  min="0"
                  max="10"
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Add Entry
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hunger Scale Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/205c85d6-b7c5-4c3a-9a07-8ac71c7181d5.png"
              alt="Hunger Scale Reference"
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
