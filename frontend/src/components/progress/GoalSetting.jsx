import React, { useState } from 'react';
import { Target, Clock, Book, Award, Save, Plus } from 'lucide-react';

export default function GoalSetting({ currentGoals, onSave }) {
  const [goals, setGoals] = useState(currentGoals);
  const [isEditing, setIsEditing] = useState(false);

  const goalTypes = [
    {
      id: 'daily_time',
      title: 'Daily Study Time',
      icon: Clock,
      unit: 'minutes',
      min: 5,
      max: 240,
      step: 5
    },
    {
      id: 'weekly_words',
      title: 'New Words Per Week',
      icon: Book,
      unit: 'words',
      min: 5,
      max: 100,
      step: 5
    },
    {
      id: 'accuracy',
      title: 'Target Accuracy',
      icon: Target,
      unit: 'percent',
      min: 60,
      max: 100,
      step: 5
    },
    {
      id: 'mastery',
      title: 'Words to Master',
      icon: Award,
      unit: 'words',
      min: 10,
      max: 1000,
      step: 10
    }
  ];

  const handleGoalChange = (goalId, value) => {
    setGoals(prev => ({
      ...prev,
      [goalId]: parseInt(value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(goals);
    setIsEditing(false);
  };

  const getProgressPercentage = (goalId) => {
    const goal = goals[goalId];
    const progress = currentGoals[goalId] || 0;
    return Math.min(100, Math.round((progress / goal) * 100));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Learning Goals</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {isEditing ? (
            <>
              <Save className="w-5 h-5 mr-2" />
              Save Goals
            </>
          ) : (
            <>
              <Plus className="w-5 h-5 mr-2" />
              Edit Goals
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goalTypes.map(goalType => (
          <div key={goalType.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <goalType.icon className="w-6 h-6 text-blue-500 mr-2" />
                <h3 className="font-semibold">{goalType.title}</h3>
              </div>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="range"
                  min={goalType.min}
                  max={goalType.max}
                  step={goalType.step}
                  value={goals[goalType.id] || goalType.min}
                  onChange={(e) => handleGoalChange(goalType.id, e.target.value)}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{goalType.min} {goalType.unit}</span>
                  <span>{goals[goalType.id] || goalType.min} {goalType.unit}</span>
                  <span>{goalType.max} {goalType.unit}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Current Progress</span>
                  <span className="font-medium">
                    {getProgressPercentage(goalType.id)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 rounded-full h-2 transition-all"
                    style={{ width: `${getProgressPercentage(goalType.id)}%` }}
                  />
                </div>
                <div className="text-sm text-gray-600">
                  Target: {goals[goalType.id] || goalType.min} {goalType.unit}
                </div>
              </div>
            )}
          </div>
        ))}

        {isEditing && (
          <div className="col-span-full flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
}