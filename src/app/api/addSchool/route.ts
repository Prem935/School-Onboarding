import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import { uploadImage } from '@/lib/cloudinary';
import { withAuth } from '@/lib/middleware';

// Protected handler function
async function addSchoolHandler(request: NextRequest, user: { email: string }) {
  try {
    const formData = await request.formData();
    
    // Extract form data
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const contact = formData.get('contact') as string;
    const email_id = formData.get('email_id') as string;
    const imageFile = formData.get('image') as File;

    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email_id || !imageFile) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email_id)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate contact number (numeric and length)
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(contact)) {
      return NextResponse.json(
        { error: 'Contact must be 10 digits' },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const imageUrl = await uploadImage(imageBuffer);

    // Insert school data into database with createdBy
    const insertQuery = `
      INSERT INTO schools (name, address, city, state, contact, image, email_id, createdBy)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await executeQuery(insertQuery, [
      name,
      address,
      city,
      state,
      contact,
      imageUrl,
      email_id,
      user.email // Set createdBy to the authenticated user's email
    ]);

    return NextResponse.json(
      { message: 'School added successfully', imageUrl },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Add school error:', error);
    
    // Provide more specific error messages
    if (error.code === 'ER_NO_SUCH_TABLE') {
      return NextResponse.json(
        { error: 'Database table not found. Please initialize the database first.' },
        { status: 500 }
      );
    }
    
    if (error.message?.includes('Failed to upload image')) {
      return NextResponse.json(
        { error: 'Failed to upload image. Please check your Cloudinary configuration.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to add school. Please try again.' },
      { status: 500 }
    );
  }
}

// Export the protected POST handler
export const POST = withAuth(addSchoolHandler);
