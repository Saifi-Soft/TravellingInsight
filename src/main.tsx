import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AdminProvider } from './contexts/AdminContext';
import { initializeDatabase } from './lib/mongodb/initDB';
import { toast } from 'sonner';

// Initialize database connection
initializeDatabase().then(connected => {
  if (connected) {
    console.log('Database initialized successfully');
  } else {
    console.warn('Database initialization failed. App will run with limited functionality.');
    toast.warning('Database connection failed. Some features may be unavailable.', {
      duration: 10000,
      id: 'db-connection-warning'
    });
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AdminProvider>
      <App />
    </AdminProvider>
  </React.StrictMode>,
);
