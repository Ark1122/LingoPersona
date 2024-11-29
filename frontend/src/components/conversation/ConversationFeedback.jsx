import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Circle } from 'lucide-react';

export default function ConversationFeedback({ feedback, isVisible }) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowDetails(true);
      const timer = setTimeout(() => setShowDetails(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const getScoreColor = (score) => {
    if (score >= 0.8) return 'text-green-500';
    if (score >= 0.6) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreIcon = (score) => {
    if (score >= 0.8) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (score >= 0.6) return <Circle className="w-5 h-5 text-yellow-500" />;
    return <AlertCircle className="w-5 h-5 text-red-500" />;
  };

  if (!isVisible || !feedback) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-white rounded-lg shadow-lg p-4 transition-all duration-300">
      <div className="flex items-start space-x-4">
        {getScoreIcon(feedback.overall_score)}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">
              Real-time Feedback
            </h3>
            <span className={`font-medium ${getScoreColor(feedback.overall_score)}`}>
              {Math.round(feedback.overall_score * 100)}%
            </span>
          </div>

          {showDetails && (
            <div className="space-y-2">
              {/* Metrics */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(feedback.metrics).map(([metric, score]) => (
                  <div key={metric} className="flex justify-between items-center">
                    <span className="text-gray-600 capitalize">{metric}</span>
                    <span className={getScoreColor(score)}>
                      {Math.round(score * 100)}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Suggestions */}
              {feedback.suggestions.length > 0 && (
                <div className="mt-3 pt-3 border-t">
                  <h4 className="text-sm font-medium mb-2">Suggestions:</h4>
                  <ul className="text-sm space-y-1">
                    {feedback.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-500">•</span>
                        <span className="text-gray-700">{suggestion.suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-blue-500 hover:text-blue-700 mt-2"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
      </div>
    </div>
  );
}