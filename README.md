# School Management System

A modern web application built with Next.js for managing school information with OTP authentication, image uploads, and responsive design.

## Features

- ✅ **Email OTP Authentication**: Secure 6-digit OTP login system with 10-minute expiry
- ✅ **Protected Routes**: Add/edit functionality requires authentication
- ✅ **Public Viewing**: Anyone can view schools without login
- ✅ **Add Schools**: Complete form with validation for adding new schools (login required)
- ✅ **View Schools**: Responsive grid layout displaying all schools with creator info
- ✅ **Image Upload**: Cloudinary integration for image storage and optimization
- ✅ **Form Validation**: Comprehensive validation using react-hook-form
- ✅ **Responsive Design**: Mobile-first design that works on all devices
- ✅ **Database Integration**: MySQL database hosted on Aiven
- ✅ **Modern UI**: Beautiful interface with Tailwind CSS
- ✅ **JWT Tokens**: Secure authentication with JSON Web Tokens

## Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Form Handling**: react-hook-form
- **Authentication**: JWT + Email OTP
- **Email Service**: Nodemailer (Gmail)
- **Database**: MySQL (Aiven)
- **Image Storage**: Cloudinary
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Hosting**: Vercel

## Prerequisites

Before running this project, you need:

1. **Aiven MySQL Database**: Set up a MySQL database on Aiven
2. **Cloudinary Account**: Create a free Cloudinary account
3. **Gmail Account**: For sending OTP emails (with App Password enabled)
4. **Node.js**: Version 18 or higher

## Environment Setup

1. Create a `.env.local` file in the root directory:

```env
# Database Configuration (Aiven MySQL)
DB_HOST=your-aiven-mysql-host
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
DB_PORT=your-database-port

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up your environment variables in `.env.local`

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Authentication Flow

1. **Login**: Users enter their email address to receive a 6-digit OTP
2. **OTP Verification**: Users enter the OTP code sent to their email (expires in 10 minutes)
3. **JWT Token**: Upon successful verification, a JWT token is generated and stored
4. **Protected Routes**: Add/edit school functionality requires valid authentication
5. **Public Access**: Viewing schools is available to everyone without authentication

## Gmail Setup for OTP Emails

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password as `EMAIL_PASS` in your environment variables

## Database Schema

The `schools` table includes a new `createdBy` column that automatically tracks which user added each school:

```sql
CREATE TABLE schools (
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
);
```