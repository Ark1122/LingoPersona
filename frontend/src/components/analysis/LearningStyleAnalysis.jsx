import React, { useState, useMemo } from 'react';
import { Brain, Target, Chart, Settings, Book, Headphones, Eye, Pen, ChevronDown, Activity, Check } from 'lucide-react';
import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, Tooltip } from 'recharts';

export default function LearningStyleAnalysis({ learningHistory, assessmentResults }) {
  // Previous code remains the same...

  return (
    <div className="space-y-6">
      {/* Previous sections remain the same... */}

      {/* Learning Styles Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {learningStyles.map(style => {
          const score = styleAnalysis[style.id];
          return (
            <div
              key={style.id}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <style.icon className="w-6 h-6 text-purple-500 mt-1" />
                  <div className="ml-3">
                    <h4 className="font-semibold">{style.label} Learner</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {style.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">
                    {Math.round(score * 100)}%
                  </div>
                  <div className="text-sm text-gray-500">
                    Affinity
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 mb-6">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${score * 100}%` }}
                  />
                </div>
              </div>

              {/* Recommended Activities */}
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">
                  Recommended Activities
                </h5>
                <ul className="space-y-2">
                  {style.activities.map((activity, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          <Target className="w-5 h-5 mr-2 text-green-500" />
          Personalized Recommendations
        </h3>

        <div className="space-y-6">
          {generateRecommendations().map((recommendation, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${recommendation.type === 'strength' 
                ? 'bg-green-50 border-green-200' 
                : 'bg-blue-50 border-blue-200'}`}
            >
              <h4 className="font-medium text-lg mb-2">{recommendation.title}</h4>
              <p className="text-gray-600 mb-4">{recommendation.description}</p>
              
              <div className="space-y-2">
                {recommendation.activities.map((activity, actIndex) => (
                  <div
                    key={actIndex}
                    className="flex items-center text-sm"
                  >
                    <Check className={`w-4 h-4 mr-2 ${recommendation.type === 'strength' 
                      ? 'text-green-500' 
                      : 'text-blue-500'}`} />
                    {activity}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Learning Style Preferences</h3>

            <div className="space-y-4">
              {learningStyles.map(style => (
                <div key={style.id} className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id={style.id}
                    checked={!assessmentResults?.excluded_styles?.includes(style.id)}
                    onChange={(e) => onUpdatePreferences(style.id, e.target.checked)}
                    className="mt-1"
                  />
                  <label htmlFor={style.id} className="flex-1 cursor-pointer">
                    <div className="font-medium">{style.label}</div>
                    <div className="text-sm text-gray-500">{style.description}</div>
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowPreferences(false)}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}