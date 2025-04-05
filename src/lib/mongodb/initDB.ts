import mongoose from 'mongoose';
import { toast } from 'sonner';

/**
 * Initialize database connection to MongoDB
 * @returns Promise<boolean> - true if connection was successful
 */
export const initializeDatabase = async (): Promise<boolean> => {
  try {
    const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || 'mongodb://localhost:27017/blog';
    
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB: Already connected');
      return true;
    }
    
    console.log('MongoDB: Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    
    console.log('MongoDB: Connected successfully');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    toast.error('Failed to connect to database. Some features may be unavailable.');
    return false;
  }
};

/**
 * Check the database connection status
 * @returns boolean - true if connected
 */
export const isDatabaseConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};
