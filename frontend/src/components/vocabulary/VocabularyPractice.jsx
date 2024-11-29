import React, { useState, useEffect } from 'react';
import { Shuffle, CheckCircle, XCircle } from 'lucide-react';

export default function VocabularyPractice({ vocabulary }) {
  const [currentWord, setCurrentWord] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [practiceMode, setPracticeMode] = useState('recognition'); // recognition or recall
  const [stats, setStats] = useState({
    correct: 0,
    incorrect: 0,
    streak: 0
  });

  useEffect(() => {
    if (vocabulary.length > 0) {
      selectRandomWord();
    }
  }, [vocabulary]);

  const selectRandomWord = () => {
    const word = vocabulary[Math.floor(Math.random() * vocabulary.length)];
    setCurrentWord(word);
    setShowAnswer(false);
  };

  const handleAnswer = (isCorrect) => {
    setStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
      streak: isCorrect ? prev.streak + 1 : 0
    }));
    
    // Wait a bit before showing next word
    setTimeout(selectRandomWord, 1500);
  };

  if (!currentWord) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Vocabulary Practice</h2>
        <div className="flex items-center space-x-4">
          <select
            value={practiceMode}
            onChange={(e) => setPracticeMode(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="recognition">Recognition</option>
            <option value="recall">Recall</option>
          </select>
          <button
            onClick={selectRandomWord}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <Shuffle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-500">{stats.correct}</div>
          <div className="text-sm text-gray-600">Correct</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-500">{stats.incorrect}</div>
          <div className="text-sm text-gray-600">Incorrect</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-500">{stats.streak}</div>
          <div className="text-sm text-gray-600">Streak</div>
        </div>
      </div>

      {/* Practice Card */}
      <div className="bg-gray-50 rounded-lg p-8 text-center mb-6">
        <div className="text-2xl font-bold mb-4">
          {practiceMode === 'recognition' ? currentWord.term : currentWord.translation}
        </div>

        {showAnswer ? (
          <div className="text-xl text-gray-600">
            {practiceMode === 'recognition' ? currentWord.translation : currentWord.term}
          </div>
        ) : (
          <button
            onClick={() => setShowAnswer(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Show Answer
          </button>
        )}

        {currentWord.context && (
          <div className="mt-4 text-sm text-gray-500">
            Context: {currentWord.context}
          </div>
        )}
      </div>

      {/* Answer Buttons */}
      {showAnswer && (
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleAnswer(false)}
            className="flex items-center px-6 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
          >
            <XCircle className="w-5 h-5 mr-2" />
            Incorrect
          </button>
          <button
            onClick={() => handleAnswer(true)}
            className="flex items-center px-6 py-3 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Correct
          </button>
        </div>
      )}
    </div>
  );
}