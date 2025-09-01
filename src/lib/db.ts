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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await connection.execute(createTableQuery);
    connection.release();
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

// Initialize database when this module is imported
let isInitialized = false;
export async function ensureDatabaseInitialized() {
  if (!isInitialized) {
    await initDatabase();
    isInitialized = true;
  }
}

// Get database connection
export async function getConnection() {
  return await pool.getConnection();
}

// Execute query with parameters
export async function executeQuery(query: string, params: any[] = []) {
  try {
    // Ensure database is initialized before executing queries
    await ensureDatabaseInitialized();
    
    const [rows] = await pool.execute(query, params);
    return rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export default pool;
