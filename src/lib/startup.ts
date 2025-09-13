import { ensureDatabaseInitialized } from './db';

// Initialize database on module import
let isStartupInitialized = false;

export async function initializeApp() {
  if (!isStartupInitialized) {
    try {
      console.log('🚀 Initializing application...');
      await ensureDatabaseInitialized();
      console.log('✅ Database initialization completed');
      isStartupInitialized = true;
    } catch (error) {
      console.error('❌ Failed to initialize application:', error);
      throw error;
    }
  }
}

// Auto-initialize on import (only in development)
if (process.env.NODE_ENV === 'development') {
  initializeApp().catch(error => {
    console.error('Failed to initialize app on startup:', error);
  });
}
