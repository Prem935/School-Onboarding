# School Management System

A modern web application built with Next.js for managing school information with image uploads and responsive design.

## Features

- ✅ **Add Schools**: Complete form with validation for adding new schools
- ✅ **View Schools**: Responsive grid layout displaying all schools
- ✅ **Image Upload**: Cloudinary integration for image storage and optimization
- ✅ **Form Validation**: Comprehensive validation using react-hook-form
- ✅ **Responsive Design**: Mobile-first design that works on all devices
- ✅ **Database Integration**: MySQL database hosted on Aiven
- ✅ **Modern UI**: Beautiful interface with Tailwind CSS
- ✅ **Database Setup**: Easy database initialization and troubleshooting

## Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Form Handling**: react-hook-form
- **Database**: MySQL (Aiven)
- **Image Storage**: Cloudinary
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Hosting**: Vercel

## Prerequisites

Before running this project, you need:

1. **Aiven MySQL Database**: Set up a MySQL database on Aiven
2. **Cloudinary Account**: Create a free Cloudinary account
3. **Node.js**: Version 18 or higher

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