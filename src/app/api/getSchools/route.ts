import { NextResponse } from 'next/server';
import { executeQuery, ensureDatabaseInitialized } from '@/lib/db';

export async function GET() {
  try {
    // Ensure database is initialized first
    await ensureDatabaseInitialized();
    
    const query = `
      SELECT id, name, address, city, state, contact, image, email_id, created_at
      FROM schools
      ORDER BY created_at DESC
    `;

    const schools = await executeQuery(query);

    return NextResponse.json({ schools });

  } catch (error: any) {
    console.error('Get schools error:', error);
    
    // Provide more specific error messages
    if (error.code === 'ER_NO_SUCH_TABLE') {
      return NextResponse.json(
        { error: 'Database table not found. Please initialize the database first.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch schools' },
      { status: 500 }
    );
  }
}
