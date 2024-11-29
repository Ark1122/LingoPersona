import React, { useState } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis';

export default function SpeechControls({ language, onTranscript, currentMessage }) {
  const [autoPlay, setAutoPlay] = useState(true);
  
  const {
    isListening,
    transcript,
    error: recognitionError,
    startListening,
    stopListening
  } = useSpeechRecognition(language);

  const {
    isPlaying,
    error: synthesisError,
    speak,
    stop
  } = useSpeechSynthesis();

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSpeakerClick = () => {
    if (isPlaying) {
      stop();
    } else if (currentMessage) {
      speak(currentMessage, language);
    }
  };

  const toggleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Microphone Control */}
      <button
        onClick={handleMicClick}
        className={`p-2 rounded-full ${isListening
          ? 'bg-red-100 text-red-500'
          : 'bg-gray-100 text-gray-500'} hover:bg-opacity-80 transition-colors`}
        title={isListening ? 'Stop Recording' : 'Start Recording'}
      >
        {isListening ? (
          <MicOff className="w-6 h-6" />
        ) : (
          <Mic className="w-6 h-6" />
        )}
      </button>

      {/* Speaker Control */}
      <button
        onClick={handleSpeakerClick}
        className={`p-2 rounded-full ${isPlaying
          ? 'bg-blue-100 text-blue-500'
          : 'bg-gray-100 text-gray-500'} hover:bg-opacity-80 transition-colors`}
        title={isPlaying ? 'Stop Speaking' : 'Start Speaking'}
        disabled={!currentMessage}
      >
        {isPlaying ? (
          <VolumeX className="w-6 h-6" />
        ) : (
          <Volume2 className="w-6 h-6" />
        )}
      </button>

      {/* Auto-play Toggle */}
      <button
        onClick={toggleAutoPlay}
        className={`text-sm ${autoPlay ? 'text-blue-500' : 'text-gray-500'}`}
      >
        Auto-play {autoPlay ? 'ON' : 'OFF'}
      </button>

      {/* Error Messages */}
      {(recognitionError || synthesisError) && (
        <p className="text-red-500 text-sm">
          {recognitionError || synthesisError}
        </p>
      )}
    </div>
  );
}