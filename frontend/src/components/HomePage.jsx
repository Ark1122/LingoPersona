import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center text-blue-900 mb-8">
          Welcome to LingoPersona
        </h1>
        <p className="text-xl text-center text-gray-700 mb-12">
          Create your personalized AI language tutor and start learning today
        </p>
        <div className="flex justify-center space-x-6">
          <Link
            to="/customize"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Create Your Tutor
          </Link>
          <Link
            to="/learn"
            className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            Start Learning
          </Link>
        </div>
      </div>
    </div>
  );
}