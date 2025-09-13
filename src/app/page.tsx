'use client';

import Link from "next/link";
import { Plus, Building, ArrowRight, Database, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { user, logout, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-end mb-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, <strong>{user.email}</strong>
                </span>
                <button
                  onClick={logout}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Link>
            )}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            School Management System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A modern web application for managing school information with OTP authentication and image uploads.
          </p>
        </div>

        {/* Main Actions */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
          {/* Add School Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New School</h2>
              <p className="text-gray-600 mb-8">
                {user 
                  ? "Add a new school with complete details including name, address, contact information, and school image."
                  : "Add a new school with complete details including name, address, contact information, and school image. Login required."
                }
              </p>
              {user ? (
                <Link
                  href="/addSchool"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Add School
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center px-6 py-3 bg-gray-400 text-white font-medium rounded-lg cursor-not-allowed"
                >
                  Login Required
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              )}
            </div>
          </div>

          {/* View Schools Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">View All Schools</h2>
              <p className="text-gray-600 mb-8">
                Browse through all registered schools in a beautiful grid layout with responsive design. <strong>No login required.</strong>
              </p>
              <Link
                href="/showSchools"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                View Schools
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Image Upload</h3>
              <p className="text-gray-600">Upload school images to Cloudinary with automatic optimization</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Form Validation</h3>
              <p className="text-gray-600">Comprehensive validation for all fields including email and contact</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Responsive Design</h3>
              <p className="text-gray-600">Mobile-first design that works perfectly on all devices</p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Built With</h2>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">Next.js 15</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">TypeScript</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">Tailwind CSS</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full">React Hook Form</span>
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full">MySQL</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">Cloudinary</span>
            <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full">JWT Auth</span>
            <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full">Email OTP</span>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">Vercel</span>
          </div>
        </div>
      </div>
    </div>
  );
}
