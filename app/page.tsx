import React from 'react';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">Budget App</h1>
      <p className="text-lg text-gray-700 mb-8">
        Some placeholder text here. This is the homepage for this app, there will be a place to upload CSV
        files and input expense data soon!
      </p>
      <div>
        <a
          href="/upload"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Upload A File (CSV only)
        </a>
      </div>
    </main>
  )
}