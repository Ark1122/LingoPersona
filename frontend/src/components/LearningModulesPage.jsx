import React from 'react';

export default function LearningModulesPage() {
  const modules = [
    {
      id: 1,
      title: 'Basic Conversations',
      description: 'Learn everyday conversations',
      level: 'Beginner'
    },
    {
      id: 2,
      title: 'Grammar Fundamentals',
      description: 'Master essential grammar rules',
      level: 'Intermediate'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Learning Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map(module => (
          <div key={module.id} className="border rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
            <p className="text-gray-600 mb-4">{module.description}</p>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded">
              {module.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}