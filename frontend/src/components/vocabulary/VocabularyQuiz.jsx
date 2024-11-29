import React, { useState, useEffect } from 'react';
import { Book, Check, X, ArrowRight, RotateCcw } from 'lucide-react';

export default function VocabularyQuiz({ vocabulary, onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    if (vocabulary.length > 0) {
      generateAnswers();
    }
  }, [vocabulary, currentQuestionIndex]);

  const generateAnswers = () => {
    const currentWord = vocabulary[currentQuestionIndex];
    const otherWords = vocabulary.filter((_, index) => index !== currentQuestionIndex);
    const incorrectAnswers = getRandomItems(otherWords, 3).map(w => w.translation);
    
    const answers = [currentWord.translation, ...incorrectAnswers];
    setShuffledAnswers(shuffleArray(answers));
  };

  const getRandomItems = (array, count) => {
    const shuffled = shuffleArray([...array]);
    return shuffled.slice(0, count);
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleAnswerSelect = (answer) => {
    if (showFeedback) return;

    setSelectedAnswer(answer);
    const currentWord = vocabulary[currentQuestionIndex];
    const isCorrect = answer === currentWord.translation;

    if (isCorrect) {
      setScore(score + 1);
    }

    setShowFeedback(true);

    setTimeout(() => {
      if (currentQuestionIndex < vocabulary.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setQuizComplete(true);
        onComplete && onComplete({
          score,
          total: vocabulary.length
        });
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowFeedback(false);
    setQuizComplete(false);
    generateAnswers();
  };

  const getAnswerStyle = (answer) => {
    if (!showFeedback) {
      return selectedAnswer === answer
        ? 'border-blue-500 bg-blue-50'
        : 'border-gray-200 hover:border-blue-200';
    }

    const currentWord = vocabulary[currentQuestionIndex];
    if (answer === currentWord.translation) {
      return 'border-green-500 bg-green-50';
    }
    if (selectedAnswer === answer) {
      return 'border-red-500 bg-red-50';
    }
    return 'border-gray-200 opacity-50';
  };

  if (vocabulary.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No vocabulary words available for quiz
      </div>
    );
  }

  if (quizComplete) {
    return (
      <div className="text-center py-8">
        <h3 className="text-2xl font-bold mb-4">
          Quiz Complete!
        </h3>
        <div className="text-4xl font-bold text-blue-500 mb-6">
          {score}/{vocabulary.length}
        </div>
        <div className="mb-8">
          <div className="text-xl font-semibold mb-2">
            Accuracy Rate:
          </div>
          <div className="text-3xl text-green-500 font-bold">
            {Math.round((score / vocabulary.length) * 100)}%
          </div>
        </div>
        <button
          onClick={restartQuiz}
          className="flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mx-auto"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Try Again
        </button>
      </div>
    );
  }

  const currentWord = vocabulary[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestionIndex + 1} of {vocabulary.length}</span>
          <span>Score: {score}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 rounded-full h-2 transition-all duration-300"
            style={{ width: `${((currentQuestionIndex) / vocabulary.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">{currentWord.term}</h3>
          {currentWord.context && (
            <p className="text-gray-600 italic">"{currentWord.context}"</p>
          )}
        </div>
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-1 gap-4">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(answer)}
            disabled={showFeedback}
            className={`p-4 border-2 rounded-lg transition-all ${getAnswerStyle(answer)}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg">{answer}</span>
              {showFeedback && answer === currentWord.translation && (
                <Check className="w-5 h-5 text-green-500" />
              )}
              {showFeedback && selectedAnswer === answer && answer !== currentWord.translation && (
                <X className="w-5 h-5 text-red-500" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`mt-6 p-4 rounded-lg ${selectedAnswer === currentWord.translation ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="font-semibold mb-2">
            {selectedAnswer === currentWord.translation ? 'Correct!' : 'Incorrect'}
          </div>
          {selectedAnswer !== currentWord.translation && (
            <div>
              <span className="text-gray-600">The correct answer is: </span>
              <span className="font-semibold">{currentWord.translation}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}