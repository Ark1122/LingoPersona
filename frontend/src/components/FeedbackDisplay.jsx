import React from 'react';

export default function FeedbackDisplay({ feedback }) {
  const getMetricColor = (score) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Performance Analysis</h3>
      
      {/* Overall Score */}
      <div className="mb-6">
        <div className="text-3xl font-bold text-center">
          {Math.round(feedback.overall_score * 100)}%
        </div>
        <div className="text-gray-600 text-center">Overall Score</div>
      </div>

      {/* Individual Metrics */}
      <div className="space-y-4 mb-6">
        {Object.entries(feedback.metrics).map(([metric, score]) => (
          <div key={metric} className="flex items-center justify-between">
            <span className="capitalize">{metric}</span>
            <span className={`font-semibold ${getMetricColor(score)}`}>
              {Math.round(score * 100)}%
            </span>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      {feedback.suggestions.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2">Suggestions for Improvement</h4>
          <ul className="space-y-2">
            {feedback.suggestions.map((suggestion, index) => (
              <li key={index} className="bg-blue-50 p-3 rounded">
                <div className="font-medium text-blue-800">
                  {suggestion.suggestion}
                </div>
                {suggestion.original && (
                  <div className="text-sm text-gray-600 mt-1">
                    Original: "{suggestion.original}"
                  </div>
                )}
                <div className="text-sm text-blue-600 mt-1">
                  {suggestion.explanation}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}