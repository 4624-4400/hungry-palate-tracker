
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { MealEntry } from '@/pages/Index';
import { HungerBar } from '@/components/HungerBar';
import { Edit, Trash2 } from 'lucide-react';

interface MealEntryDialogProps {
  entry: MealEntry | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (entry: MealEntry) => void;
  onDelete: (entryId: string) => void;
}

export const MealEntryDialog: React.FC<MealEntryDialogProps> = ({
  entry,
  isOpen,
  onClose,
  onUpdate,
  onDelete
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEntry, setEditedEntry] = useState<MealEntry | null>(entry);

  React.useEffect(() => {
    setEditedEntry(entry);
    setIsEditing(false);
  }, [entry]);

  if (!entry || !editedEntry) return null;

  const handleSave = () => {
    onUpdate(editedEntry);
    setIsEditing(false);
    onClose();
  };

  const handleDelete = () => {
    onDelete(entry.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Meal Entry Details</span>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-1"
              >
                <Edit className="h-3 w-3" />
                <span>{isEditing ? 'Cancel' : 'Edit'}</span>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="flex items-center space-x-1">
                    <Trash2 className="h-3 w-3" />
                    <span>Delete</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Entry</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this meal entry? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Date</Label>
            <div className="text-sm text-gray-600">{entry.date}</div>
          </div>

          <div>
            <Label>Meal Type</Label>
            {isEditing ? (
              <Select value={editedEntry.mealType} onValueChange={(value) => setEditedEntry({...editedEntry, mealType: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="snack">Snack</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="text-sm text-gray-600 capitalize">{entry.mealType}</div>
            )}
          </div>

          <div>
            <Label>Food Description</Label>
            {isEditing ? (
              <Textarea
                value={editedEntry.foodDescription}
                onChange={(e) => setEditedEntry({...editedEntry, foodDescription: e.target.value})}
                className="min-h-[60px]"
              />
            ) : (
              <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded border">{entry.foodDescription}</div>
            )}
          </div>

          <div>
            <Label>Calories</Label>
            {isEditing ? (
              <Input
                type="number"
                value={editedEntry.calories}
                onChange={(e) => setEditedEntry({...editedEntry, calories: parseInt(e.target.value) || 0})}
              />
            ) : (
              <div className="text-sm text-gray-600">{entry.calories} kcal</div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Pre-meal Hunger</Label>
              {isEditing ? (
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={editedEntry.preMealHunger}
                  onChange={(e) => setEditedEntry({...editedEntry, preMealHunger: parseInt(e.target.value) || 1})}
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <HungerBar level={entry.preMealHunger} size="small" />
                  <span className="text-sm font-bold">{entry.preMealHunger}</span>
                </div>
              )}
            </div>

            <div>
              <Label>Post-meal Hunger</Label>
              {isEditing ? (
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={editedEntry.postMealHunger}
                  onChange={(e) => setEditedEntry({...editedEntry, postMealHunger: parseInt(e.target.value) || 1})}
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <HungerBar level={entry.postMealHunger} size="small" />
                  <span className="text-sm font-bold">{entry.postMealHunger}</span>
                </div>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex space-x-2 pt-4">
              <Button onClick={handleSave} className="flex-1 bg-green-600 hover:bg-green-700">
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
