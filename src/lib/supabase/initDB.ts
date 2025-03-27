import { supabase } from './client';

export async function checkDatabaseConnection() {
  try {
    const { data, error } = await supabase.from('posts').select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('Database connection error:', error);
      return false;
    }
    
    console.log('Successfully connected to Supabase database');
    return true;
  } catch (err) {
    console.error('Failed to connect to database:', err);
    return false;
  }
}

export async function initializeDatabase() {
  const connected = await checkDatabaseConnection();
  
  if (!connected) {
    console.warn('Unable to connect to database. Please check your Supabase credentials.');
  }
  
  return connected;
}