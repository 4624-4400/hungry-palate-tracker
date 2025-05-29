import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { MealEntry } from '@/pages/Index';

interface DownloadButtonProps {
  entries: MealEntry[];
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ entries }) => {
  const downloadData = () => {
    if (entries.length === 0) {
      alert('No data to download');
      return;
    }

    // Create CSV content
    const headers = ['Date', 'Meal Type', 'Food Description', 'Calories', 'Pre-meal Hunger', 'Post-meal Hunger'];
    const csvContent = [
      headers.join(','),
      ...entries.map(entry => [
        entry.date,
        entry.mealType,
        `"${entry.foodDescription.replace(/"/g, '""')}"`, // Escape quotes in description
        entry.calories,
        entry.preMealHunger,
        entry.postMealHunger
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `hunger-tracking-data-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      onClick={downloadData}
      size="sm"
      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg border-0 font-semibold px-4 py-2"
    >
      <Download className="h-4 w-4 mr-2" />
      Download Data
    </Button>
  );
};
