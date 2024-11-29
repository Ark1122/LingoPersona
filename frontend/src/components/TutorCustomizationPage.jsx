import React, { useState } from 'react';

export default function TutorCustomizationPage() {
  const [tutorSettings, setTutorSettings] = useState({
    name: '',
    language: 'spanish',
    personality: 'friendly',
    teachingStyle: 'conversational',
    difficulty: 'intermediate'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle tutor creation
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Customize Your AI Tutor</h2>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tutor Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={tutorSettings.name}
              onChange={(e) => setTutorSettings({ ...tutorSettings, name: e.target.value })}
            />
          </div>
          {/* Add more customization options */}
        </div>
        <button
          type="submit"
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Tutor
        </button>
      </form>
    </div>
  );
}