import React, { useState } from 'react';
import { FileText, Star, ThumbsUp, ThumbsDown, MessageCircle, Send, PenTool, Save, Plus, X } from 'lucide-react';

export default function PostSessionReview({ session, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [strengths, setStrengths] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [notes, setNotes] = useState('');
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');

  const commonStrengths = [
    'Vocabulary usage',
    'Grammar accuracy',
    'Pronunciation',
    'Fluency',
    'Comprehension',
    'Cultural knowledge'
  ];

  const commonChallenges = [
    'Complex grammar',
    'New vocabulary',
    'Fast speech',
    'Idiomatic expressions',
    'Speaking confidence',
    'Listening comprehension'
  ];

  const handleSubmit = () => {
    onSubmit({
      sessionId: session.id,
      rating,
      strengths,
      challenges,
      notes,
      goals,
      reviewDate: new Date()
    });
  };

  const toggleStrength = (strength) => {
    setStrengths(prev =>
      prev.includes(strength)
        ? prev.filter(s => s !== strength)
        : [...prev, strength]
    );
  };

  const toggleChallenge = (challenge) => {
    setChallenges(prev =>
      prev.includes(challenge)
        ? prev.filter(c => c !== challenge)
        : [...prev, challenge]
    );
  };

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, newGoal.trim()]);
      setNewGoal('');
    }
  };

  const removeGoal = (index) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const isReviewComplete = () => {
    return rating > 0 && (strengths.length > 0 || challenges.length > 0);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <FileText className="w-6 h-6 mr-2 text-blue-500" />
        Session Review
      </h2>

      {/* Previous sections remain the same... */}

      {/* Learning Goals */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <MessageCircle className="w-5 h-5 mr-2 text-purple-500" />
          Learning Goals
        </h3>
        
        {/* Goal Input */}
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addGoal()}
            placeholder="Add a learning goal for next session..."
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          <button
            onClick={addGoal}
            disabled={!newGoal.trim()}
            className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Goals List */}
        {goals.length > 0 ? (
          <ul className="space-y-2">
            {goals.map((goal, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 bg-purple-50 rounded-lg"
              >
                <span className="text-purple-700">{goal}</span>
                <button
                  onClick={() => removeGoal(index)}
                  className="text-purple-400 hover:text-purple-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-4">
            No goals added yet
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleSubmit}
          disabled={!isReviewComplete()}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <Save className="w-5 h-5 mr-2" />
          Save Review
        </button>
      </div>

      {/* Completion Status */}
      {!isReviewComplete() && (
        <p className="text-sm text-gray-500 text-center mt-4">
          Please provide a rating and select at least one strength or challenge to complete the review.
        </p>
      )}
    </div>
  );
}

// Add custom styles for star rating hover effect
const style = document.createElement('style');
style.textContent = `
  .star-rating button:hover ~ button {
    color: rgb(209 213 219);
  }
  .star-rating:hover button {
    color: rgb(250 204 21);
  }
`;
document.head.appendChild(style);