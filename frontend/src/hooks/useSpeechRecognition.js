import { useState, useEffect, useCallback } from 'react';

export const useSpeechRecognition = (language = 'en-US') => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);
    };

    recognition.onerror = (event) => {
      setError(`Error: ${event.error}`);
      setIsListening(false);
    };

    return () => {
      recognition.abort();
    };
  }, [language]);

  const startListening = useCallback(() => {
    setTranscript('');
    setError(null);
    const recognition = new window.webkitSpeechRecognition();
    recognition.start();
  }, []);

  const stopListening = useCallback(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.stop();
  }, []);

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening
  };
};