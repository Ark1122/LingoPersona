import React, { useState } from 'react';
import { Target, Flag, Calendar, Clock, Plus, Trash2, Edit2, Save, X, CheckCircle, ChevronRight } from 'lucide-react';

export default function GoalTracker({ goals, onUpdateGoal, onDeleteGoal, onCreateGoal }) {
  // Previous code remains the same...

  const GoalForm = ({ initialGoal, onSubmit, onCancel }) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(initialGoal);
      }}
      className="space-y-4 bg-white rounded-lg shadow-lg p-6"
    >
      {/* Previous form fields remain the same... */}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target {goalTypes.find(t => t.id === initialGoal.type)?.unit}
          </label>
          <input
            type="number"
            value={initialGoal.target}
            onChange={(e) => initialGoal.target = parseInt(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            min="1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deadline
          </label>
          <input
            type="date"
            value={initialGoal.deadline}
            onChange={(e) => initialGoal.deadline = e.target.value}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Goal
        </button>
      </div>
    </form>
  );

  const GoalCard = ({ goal }) => {
    const type = goalTypes.find(t => t.id === goal.type);
    const progress = getProgressPercentage(goal);
    const timeLeft = getTimeRemaining(goal.deadline);
    const isOverdue = timeLeft === 'Overdue';
    const isComplete = progress >= 100;

    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <type.icon className={`w-6 h-6 mr-3 text-${type.color}-500`} />
              <div>
                <h3 className="font-semibold">{goal.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingGoal(goal)}
                className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteGoal(goal.id)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className={isComplete ? 'text-green-600' : isOverdue ? 'text-red-600' : 'text-gray-600'}>
                  {progress}% complete
                </span>
                <span className={isOverdue ? 'text-red-600' : 'text-gray-600'}>
                  {timeLeft}
                </span>
              </div>
              <span className="text-gray-600">
                {goal.progress} / {goal.target} {type.unit}
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${isComplete
                  ? 'bg-green-500'
                  : isOverdue
                    ? 'bg-red-500'
                    : `bg-${type.color}-500`}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {isComplete && (
            <div className="mt-4 pt-4 border-t flex items-center justify-between text-green-600">
              <span className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Goal Achieved!
              </span>
              <button className="text-sm hover:underline flex items-center">
                View Details
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <Flag className="w-7 h-7 mr-2 text-blue-500" />
          Learning Goals
        </h2>
        <button
          onClick={() => setEditingGoal({})}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Goal
        </button>
      </div>

      {/* Goal Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Goals', value: goals.filter(g => !g.completed).length },
          { label: 'Completed Goals', value: goals.filter(g => g.completed).length },
          { label: 'Overdue Goals', value: goals.filter(g => new Date(g.deadline) < new Date()).length },
          { label: 'Success Rate', value: `${Math.round((goals.filter(g => g.completed).length / goals.length) * 100)}%` }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="text-gray-600 mb-1">{stat.label}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Goal List */}
      <div className="space-y-4">
        {goals.map(goal => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>

      {/* Edit/Create Modal */}
      {editingGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <GoalForm
              initialGoal={editingGoal}
              onSubmit={handleSaveGoal}
              onCancel={() => setEditingGoal(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}