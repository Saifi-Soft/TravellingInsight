import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { toast } from 'sonner';
import { uploadFile } from '@/lib/storage/fileStorage';

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

const ImageUploader = ({ label, value, onChange }: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Upload the file
      const result = await uploadFile(file);
      
      if (result.url) {
        onChange(result.url);
        toast.success('Image uploaded successfully');
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleRemoveImage = () => {
    onChange('');
  };
  
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      {value ? (
        <div className="relative rounded-md overflow-hidden border">
          <img 
            src={value}
            alt="Uploaded"
            className="w-full h-48 object-cover"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center">
          <div className="mb-4">
            <ImageIcon className="h-10 w-10 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Drag and drop an image, or click to browse
          </p>
          <Button 
            variant="outline" 
            disabled={isUploading}
            className="relative"
          >
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;