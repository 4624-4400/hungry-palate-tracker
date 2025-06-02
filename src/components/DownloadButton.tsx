
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

    // Create blob and trigger Save As dialog
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `hunger-tracking-data-${new Date().toISOString().split('T')[0]}.csv`);
    
    // Show Save As dialog by not setting the download attribute initially
    link.removeAttribute('download');
    link.target = '_blank';
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    
    // Use showSaveFilePicker if available (newer browsers), otherwise fall back to traditional method
    if ('showSaveFilePicker' in window) {
      (window as any).showSaveFilePicker({
        suggestedName: `hunger-tracking-data-${new Date().toISOString().split('T')[0]}.csv`,
        types: [{
          description: 'CSV files',
          accept: { 'text/csv': ['.csv'] },
        }],
      }).then((fileHandle: any) => {
        return fileHandle.createWritable();
      }).then((writable: any) => {
        return writable.write(csvContent);
      }).then((writable: any) => {
        return writable.close();
      }).catch((err: any) => {
        // User cancelled or error occurred, fall back to regular download
        console.log('Save picker cancelled or failed, using fallback');
        link.setAttribute('download', `hunger-tracking-data-${new Date().toISOString().split('T')[0]}.csv`);
        link.click();
      });
    } else {
      // Fallback for browsers that don't support showSaveFilePicker
      link.setAttribute('download', `hunger-tracking-data-${new Date().toISOString().split('T')[0]}.csv`);
      link.click();
    }
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
