import mysql from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'schools_db',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Initialize database table
export async function initDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // Create schools table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        contact VARCHAR(20) NOT NULL,
        image TEXT NOT NULL,
        email_id TEXT NOT NULL,
        createdBy VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await connection.execute(createTableQuery);
    
    // Check if createdBy column exists and add it if it doesn't
    try {
      const [columns] = await connection.execute(`
        SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'schools' 
        AND COLUMN_NAME = 'createdBy'
      `);
      
      // If column doesn't exist, add it
      if (!Array.isArray(columns) || columns.length === 0) {
        await connection.execute(`
          ALTER TABLE schools 
          ADD COLUMN createdBy VARCHAR(255) NOT NULL DEFAULT 'system'
        `);
        console.log('Added createdBy column to existing schools table');
      } else {
        console.log('CreatedBy column already exists');
      }
    } catch (error) {
      console.log('Error checking/adding createdBy column:', error);
    }
    
    connection.release();
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

// Initialize database when this module is imported
let isInitialized = false;
let initPromise: Promise<void> | null = null;

export async function ensureDatabaseInitialized() {
  if (!isInitialized) {
    if (!initPromise) {
      initPromise = initDatabase();
    }
    await initPromise;
    isInitialized = true;
  }
}

// Auto-initialize database on module import (only in development)
if (process.env.NODE_ENV === 'development') {
  ensureDatabaseInitialized().catch(error => {
    console.error('Failed to initialize database on startup:', error);
  });
}

// Get database connection
export async function getConnection() {
  return await pool.getConnection();
}

// Execute query with parameters
export async function executeQuery(query: string, params: any[] = []) {
  try {
    const [rows] = await pool.execute(query, params);
    return rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export default pool;
