import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-white">
      <h1 className="text-black text-6xl font-bold mb-20">Budget App</h1>
      <p className="text-lg text-gray-700 mb-8">
        Some placeholder text here. This is the homepage for this app, there will be a place to upload CSV
        files soon!
      </p>
      <div className="space-x-4">
        <Link href="/upload">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Upload File (CSV only)
          </button>
        </Link>

        <Link href="/expenses">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            View Expenses
          </button>
        </Link>

        <Link href="/dashboard">
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            Dashboard
          </button>
        </Link>
        
      </div>
    </main>
  )
}