import React, { useState } from 'react';
import { Map, Target, Calendar, Clock, ChevronRight, CheckCircle, Book, MessageCircle } from 'lucide-react';

export default function LearningPathGenerator({ userProfile, currentLevel }) {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [customizationOptions, setCustomizationOptions] = useState({
    pace: 'balanced',
    focus: [],
    timeCommitment: 30
  });

  // Previous code remains the same until renderLearningPath...

  const renderLearningPath = () => {
    if (!selectedGoal) return null;

    const path = generateLearningPath();

    return (
      <div className="space-y-8">
        <h3 className="text-xl font-semibold">Your Learning Path</h3>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-blue-200" />

          {/* Phases */}
          <div className="space-y-8">
            {path.map((phase, index) => (
              <div key={index} className="relative pl-16">
                {/* Timeline dot */}
                <div className="absolute left-7 top-3 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500" />

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-lg">{phase.phase}</h4>
                      <p className="text-gray-600">{phase.duration}</p>
                    </div>
                    <span className="text-sm text-blue-500 font-medium">
                      Phase {index + 1}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Focus Areas */}
                    <div>
                      <h5 className="font-medium mb-2">Focus Areas</h5>
                      <ul className="space-y-2">
                        {phase.focus.map((item, i) => (
                          <li key={i} className="flex items-center text-gray-600">
                            <ChevronRight className="w-4 h-4 mr-2 text-blue-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Activities */}
                    <div>
                      <h5 className="font-medium mb-2">Key Activities</h5>
                      <ul className="space-y-2">
                        {phase.activities.map((activity, i) => (
                          <li key={i} className="flex items-center text-gray-600">
                            <ChevronRight className="w-4 h-4 mr-2 text-blue-500" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderCustomizationOptions = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">Customize Your Path</h3>
      
      {/* Pace Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Learning Pace
        </label>
        <div className="grid grid-cols-3 gap-4">
          {['relaxed', 'balanced', 'intensive'].map(pace => (
            <button
              key={pace}
              onClick={() => setCustomizationOptions(prev => ({ ...prev, pace }))}
              className={`p-3 rounded-lg text-center capitalize ${customizationOptions.pace === pace
                ? 'bg-blue-50 border-2 border-blue-500'
                : 'bg-gray-50 border border-gray-200 hover:border-blue-200'}`}
            >
              {pace}
            </button>
          ))}
        </div>
      </div>

      {/* Time Commitment */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Daily Time Commitment (minutes)
        </label>
        <input
          type="range"
          min="15"
          max="120"
          step="15"
          value={customizationOptions.timeCommitment}
          onChange={(e) => setCustomizationOptions(prev => ({
            ...prev,
            timeCommitment: parseInt(e.target.value)
          }))}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>15 min</span>
          <span>{customizationOptions.timeCommitment} min</span>
          <span>120 min</span>
        </div>
      </div>

      {/* Focus Areas */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Focus Areas
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            'Grammar',
            'Vocabulary',
            'Pronunciation',
            'Writing',
            'Culture',
            'Business'
          ].map(area => (
            <label
              key={area}
              className="flex items-center space-x-2 p-3 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100"
            >
              <input
                type="checkbox"
                checked={customizationOptions.focus.includes(area)}
                onChange={(e) => {
                  setCustomizationOptions(prev => ({
                    ...prev,
                    focus: e.target.checked
                      ? [...prev.focus, area]
                      : prev.focus.filter(f => f !== area)
                  }));
                }}
                className="rounded text-blue-500"
              />
              <span className="text-sm">{area}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold flex items-center">
          <Map className="w-7 h-7 mr-2 text-blue-500" />
          Create Your Learning Path
        </h2>
      </div>

      {renderGoalSelection()}
      {selectedGoal && renderCustomizationOptions()}
      {selectedGoal && renderLearningPath()}
    </div>
  );
}