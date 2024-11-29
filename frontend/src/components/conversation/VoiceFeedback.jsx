import React from 'react';
import { Mic, Volume2 } from 'lucide-react';

export default function VoiceFeedback({ 
  isRecording,
  isPlaying,
  pronunciationScore,
  onListenAgain 
}) {
  const getScoreClass = (score) => {
    if (score >= 0.8) return 'bg-green-500';
    if (score >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
      {/* Recording/Playback Status */}
      <div className="flex-shrink-0">
        {isRecording ? (
          <div className="relative">
            <Mic className="w-6 h-6 text-red-500" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </div>
        ) : isPlaying ? (
          <Volume2 className="w-6 h-6 text-blue-500" />
        ) : (
          <Mic className="w-6 h-6 text-gray-400" />
        )}
      </div>

      {/* Pronunciation Score */}
      {pronunciationScore !== null && (
        <div className="flex-1">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className={`h-full rounded-full ${getScoreClass(pronunciationScore)}`}
              style={{ width: `${pronunciationScore * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>Pronunciation Score</span>
            <span>{Math.round(pronunciationScore * 100)}%</span>
          </div>
        </div>
      )}

      {/* Listen Again Button */}
      {!isRecording && pronunciationScore !== null && (
        <button
          onClick={onListenAgain}
          className="flex items-center space-x-1 text-sm text-blue-500 hover:text-blue-700"
        >
          <Volume2 className="w-4 h-4" />
          <span>Listen</span>
        </button>
      )}
    </div>
  );
}