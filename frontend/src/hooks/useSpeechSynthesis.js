import { useState, useCallback } from 'react';

export const useSpeechSynthesis = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  const speak = useCallback(async (text, language = 'en-US', options = {}) => {
    if (!('speechSynthesis' in window)) {
      setError('Speech synthesis is not supported in this browser.');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = options.rate || 1;
    utterance.pitch = options.pitch || 1;

    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    if (options.voice) {
      const selectedVoice = voices.find(v => v.name === options.voice);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setError(null);
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = (event) => {
      setError(`Error: ${event.error}`);
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, []);

  return {
    isPlaying,
    error,
    speak,
    stop
  };
};