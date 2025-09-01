'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Database, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

export default function Setup() {
  const [isInitializing, setIsInitializing] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const initializeDatabase = async () => {
    setIsInitializing(true);
    setResult(null);

    try {
      const response = await fetch('/api/init-db', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setResult({ success: true, message: data.message });
      } else {
        setResult({ success: false, message: data.error });
      }
    } catch (error: any) {
      setResult({ success: false, message: error.message || 'Failed to initialize database' });
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Database Setup</h1>
          <p className="text-gray-600">Initialize your database and test the connection</p>
        </div>

        {/* Setup Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Database className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Database Initialization</h2>
            <p className="text-gray-600">
              This will create the required database table for storing school information.
            </p>
          </div>

          {/* Environment Check */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Environment Variables Check:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Database Host:</span>
                <span className={process.env.DB_HOST ? 'text-green-600' : 'text-red-600'}>
                  {process.env.DB_HOST ? '✓ Set' : '✗ Not Set'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Database Name:</span>
                <span className={process.env.DB_NAME ? 'text-green-600' : 'text-red-600'}>
                  {process.env.DB_NAME ? '✓ Set' : '✗ Not Set'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Cloudinary Config:</span>
                <span className={process.env.CLOUDINARY_CLOUD_NAME ? 'text-green-600' : 'text-red-600'}>
                  {process.env.CLOUDINARY_CLOUD_NAME ? '✓ Set' : '✗ Not Set'}
                </span>
              </div>
            </div>
          </div>

          {/* Initialize Button */}
          <div className="text-center mb-6">
            <button
              onClick={initializeDatabase}
              disabled={isInitializing}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isInitializing ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Initializing...
                </div>
              ) : (
                <>
                  <Database className="w-4 h-4 mr-2" />
                  Initialize Database
                </>
              )}
            </button>
          </div>

          {/* Result */}
          {result && (
            <div className={`p-4 rounded-lg border ${
              result.success 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center">
                {result.success ? (
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 mr-2" />
                )}
                <span className={result.success ? 'text-green-800' : 'text-red-800'}>
                  {result.message}
                </span>
              </div>
            </div>
          )}

          {/* Next Steps */}
          {result?.success && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Next Steps:</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <p>✓ Database table created successfully</p>
                <p>✓ You can now add schools using the form</p>
                <p>✓ View all schools in the grid layout</p>
              </div>
              <div className="mt-4 flex gap-3">
                <Link
                  href="/addSchool"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add First School
                </Link>
                <Link
                  href="/showSchools"
                  className="inline-flex items-center px-4 py-2 border border-blue-300 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors"
                >
                  View Schools
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Troubleshooting */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Troubleshooting</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p><strong>Database Connection Issues:</strong> Check your Aiven MySQL credentials in .env.local</p>
            <p><strong>Table Creation Failed:</strong> Ensure your database user has CREATE TABLE permissions</p>
            <p><strong>Cloudinary Issues:</strong> Verify your Cloudinary API keys are correct</p>
          </div>
        </div>
      </div>
    </div>
  );
}
