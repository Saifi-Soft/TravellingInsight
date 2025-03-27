
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AdminProvider } from './contexts/AdminContext';
import { initializeDatabase } from './lib/supabase/initDB';

// Initialize database connection
initializeDatabase().then(connected => {
  if (connected) {
    console.log('Database initialized successfully');
  } else {
    console.warn('Database initialization failed. App may have limited functionality.');
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AdminProvider>
      <App />
    </AdminProvider>
  </React.StrictMode>,
);
