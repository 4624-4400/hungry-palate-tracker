
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { MealEntry } from '@/pages/Index';

interface UploadButtonProps {
  onUpload: (entries: MealEntry[]) => void;
}

export const UploadButton: React.FC<UploadButtonProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvContent = e.target?.result as string;
        const lines = csvContent.split('\n');
        const headers = lines[0].split(',');
        
        // Validate headers
        const expectedHeaders = ['Date', 'Meal Type', 'Food Description', 'Calories', 'Pre-meal Hunger', 'Post-meal Hunger'];
        const hasValidHeaders = expectedHeaders.every(header => headers.includes(header));
        
        if (!hasValidHeaders) {
          alert('Invalid CSV format. Please ensure the file has the correct headers.');
          return;
        }

        const entries: MealEntry[] = [];
        
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;
          
          // Parse CSV line, handling quoted fields
          const values: string[] = [];
          let currentValue = '';
          let inQuotes = false;
          
          for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              values.push(currentValue.trim());
              currentValue = '';
            } else {
              currentValue += char;
            }
          }
          values.push(currentValue.trim());
          
          if (values.length >= 6) {
            const entry: MealEntry = {
              id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
              date: values[0],
              mealType: values[1].toLowerCase(),
              foodDescription: values[2].replace(/^"|"$/g, '').replace(/""/g, '"'),
              calories: parseInt(values[3]) || 0,
              preMealHunger: parseInt(values[4]) || 1,
              postMealHunger: parseInt(values[5]) || 1
            };
            entries.push(entry);
          }
        }
        
        if (entries.length > 0) {
          onUpload(entries);
          alert(`Successfully uploaded ${entries.length} entries!`);
        } else {
          alert('No valid entries found in the file.');
        }
      } catch (error) {
        console.error('Error parsing CSV:', error);
        alert('Error reading file. Please ensure it\'s a valid CSV file.');
      }
    };
    
    reader.readAsText(file);
    
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
      <Button
        onClick={triggerFileUpload}
        size="sm"
        variant="outline"
        className="bg-white border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 shadow-lg font-semibold px-4 py-2"
      >
        <Upload className="h-4 w-4 mr-2" />
        Upload Data
      </Button>
    </>
  );
};
