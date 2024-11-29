import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, ThumbsUp, ThumbsDown } from 'lucide-react';

export default function FlashcardPractice({ vocabulary }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [deck, setDeck] = useState([]);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    reviewed: new Set()
  });

  useEffect(() => {
    // Initialize deck with shuffled vocabulary
    setDeck(shuffleArray([...vocabulary]));
  }, [vocabulary]);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleResponse = (isCorrect) => {
    setSessionStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
      reviewed: new Set([...prev.reviewed, deck[currentIndex].id])
    }));
    handleNext();
  };

  const resetSession = () => {
    setDeck(shuffleArray([...vocabulary]));
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionStats({
      correct: 0,
      incorrect: 0,
      reviewed: new Set()
    });
  };

  if (deck.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No flashcards available
      </div>
    );
  }

  const currentCard = deck[currentIndex];
  const isComplete = sessionStats.reviewed.size === deck.length;

  if (isComplete) {
    const accuracy = (sessionStats.correct / deck.length) * 100;
    
    return (
      <div className="text-center py-8">
        <h3 className="text-2xl font-bold mb-6">
          Session Complete!
        </h3>
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-600 mb-1">Total Cards</div>
            <div className="text-2xl font-bold text-blue-700">{deck.length}</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-sm text-green-600 mb-1">Correct</div>
            <div className="text-2xl font-bold text-green-700">{sessionStats.correct}</div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="text-sm text-yellow-600 mb-1">Accuracy</div>
            <div className="text-2xl font-bold text-yellow-700">{Math.round(accuracy)}%</div>
          </div>
        </div>
        <button
          onClick={resetSession}
          className="flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mx-auto"
        >
          <RotateCw className="w-5 h-5 mr-2" />
          Start New Session
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Card {currentIndex + 1} of {deck.length}</span>
          <span>Accuracy: {sessionStats.reviewed.size > 0 
            ? Math.round((sessionStats.correct / sessionStats.reviewed.size) * 100)
            : 0}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 rounded-full h-2 transition-all duration-300"
            style={{ width: `${(currentIndex / deck.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div
        onClick={handleFlip}
        className="relative w-full aspect-[3/2] mb-6 cursor-pointer"
      >
        <div
          className={`absolute inset-0 p-8 rounded-xl shadow-lg transition-all duration-500 transform ${isFlipped ? 'rotate-y-180 opacity-0' : ''}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex flex-col items-center justify-center h-full bg-white rounded-lg">
            <div className="text-3xl font-bold mb-4">{currentCard.term}</div>
            {currentCard.context && (
              <div className="text-gray-600 text-center italic">"{currentCard.context}"</div>
            )}
          </div>
        </div>
        <div
          className={`absolute inset-0 p-8 rounded-xl shadow-lg transition-all duration-500 transform ${isFlipped ? '' : 'rotate-y-180 opacity-0'}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex flex-col items-center justify-center h-full bg-white rounded-lg">
            <div className="text-3xl font-bold text-blue-600">
              {currentCard.translation}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex space-x-4">
          <button
            onClick={() => handleResponse(false)}
            className="flex items-center px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
          >
            <ThumbsDown className="w-5 h-5 mr-2" />
            Incorrect
          </button>
          <button
            onClick={() => handleResponse(true)}
            className="flex items-center px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
          >
            <ThumbsUp className="w-5 h-5 mr-2" />
            Correct
          </button>
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === deck.length - 1}
          className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}