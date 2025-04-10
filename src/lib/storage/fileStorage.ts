import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import { toast } from 'sonner';

// Storage initialization state
let storageInitialized = false;

/**
 * Initialize the file storage service
 * @returns Object with initialization status
 */
export const initializeStorage = async (): Promise<
  | { success: true; status: number; message: string }
  | { success: false; message: string; status?: number }
> => {
  

  try {
    // Check server health
    const response = await apiClient.get('/api/health').catch(err => err.response);


    if (response?.status === 200) {
      storageInitialized = true;
      return {
        
        success: true,
        status: response.status,        
        message: "Storage connected successfully"
      };
    } else {
      storageInitialized = false;
      
      return {
        success: false,        
        message: `Failed to connect to server. Status code: ${response.status}`,
        status: response.status,
      };
    }
  } catch (error: any) {
    console.error('Error initializing storage:', error);
    storageInitialized = false;
    return {
      message: `Could not connect to the server. File uploads will not be available. ${
        error.response?.status ? `Status code: ${error.response.status}` : ""
      }`,
      success: false,
      status: error.response?.status,
    };
  }
};

/**
 * Get a public URL for an asset
 * @param path File path or key
 * @returns Public URL for the asset
 */
export const getPublicUrl = (path: string | undefined): string => {
  if (!path) return '/placeholder.svg';
  
  // If it's already a full URL, return it
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // If it has an extension, it's likely a file path
  if (path.includes('.')) {
    // If it's an unsplash photo, return a proper URL
    if (path.startsWith('photo-')) {
      return `https://images.unsplash.com/${path}?auto=format&fit=crop&w=1200&q=80`;
    }
    
    // For uploaded files, construct the URL from the API endpoint
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    return `${apiUrl}/uploads/${path}`;
  }
  
  // Fallback to placeholder
  return '/placeholder.svg';
};

/**
 * Upload a file to the server
 * @param file File to upload
 * @returns Object with the file URL or an error
 */
export const uploadFile = async (file: File): Promise<{ url: string; error: null } | { url: null; error: string }> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post(API_ENDPOINTS.UPLOAD_IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    if (response.data && response.data.filePath) {
      return { 
        url: response.data.filePath, 
        error: null 
      };
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error: any) {
    console.error('File upload error:', error);
    return { 
      url: null, 
      error: error.message || 'Failed to upload file' 
    };
  }
};