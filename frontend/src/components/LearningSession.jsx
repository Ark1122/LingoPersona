import React, { useState } from 'react';
import ChatInterface from './ChatInterface';
import { useRouter } from 'next/router';

export default function LearningSession({ tutor }) {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const router = useRouter();

  const handleEndSession = async () => {
    try {
      await fetch(`/api/sessions/${tutor.id}/end`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setIsSessionActive(false);
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to end session:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Session with {tutor.name}
              </h2>
              <p className="text-gray-600">
                Language: {tutor.language} | Style: {tutor.teaching_style}
              </p>
            </div>
            <button
              onClick={handleEndSession}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              End Session
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Learning Tools */}
            <div className="md:col-span-1 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Vocabulary</h3>
                {/* Add vocabulary components */}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Grammar Notes</h3>
                {/* Add grammar components */}
              </div>
            </div>

            {/* Chat Interface */}
            <div className="md:col-span-2 h-[600px]">
              <ChatInterface
                token={localStorage.getItem('token')}
                tutorId={tutor.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}