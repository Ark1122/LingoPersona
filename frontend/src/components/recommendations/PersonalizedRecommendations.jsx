import React, { useState } from 'react';
import { Lightbulb, Book, MessageCircle, Headphones, PenTool, Clock, ChevronRight, Brain, Filter, Settings, Star } from 'lucide-react';

export default function PersonalizedRecommendations({ learnerProfile, progressData, preferences }) {
  // Previous code remains the same until return statement...

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <Lightbulb className="w-7 h-7 mr-2 text-yellow-500" />
          Personalized Recommendations
        </h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowPreferences(true)}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex overflow-x-auto space-x-4 pb-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${selectedCategory === category.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            <category.icon className="w-4 h-4 mr-2" />
            {category.label}
          </button>
        ))}
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecommendations.map((recommendation, index) => {
          const ActionIcon = getActionIcon(recommendation.action.type);
          const priorityColor = getPriorityColor(recommendation.priority);

          return (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-${priorityColor}-500`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start">
                    <ActionIcon className={`w-5 h-5 mr-3 text-${priorityColor}-500`} />
                    <div>
                      <h3 className="font-semibold">{recommendation.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {recommendation.description}
                      </p>
                    </div>
                  </div>
                  {recommendation.priority === 'high' && (
                    <Star className="w-5 h-5 text-yellow-500" />
                  )}
                </div>

                <a
                  href={recommendation.action.path}
                  className={`mt-4 flex items-center text-${priorityColor}-500 hover:text-${priorityColor}-600 text-sm font-medium`}
                >
                  {recommendation.action.label}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredRecommendations.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No recommendations available
          </h3>
          <p className="text-gray-500">
            Keep practicing and we'll provide personalized recommendations
            based on your progress.
          </p>
        </div>
      )}

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Recommendation Settings</h3>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Types of Recommendations */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Types of Recommendations
                </label>
                {categories.slice(1).map(category => (
                  <label
                    key={category.id}
                    className="flex items-center space-x-3 mb-3"
                  >
                    <input
                      type="checkbox"
                      checked={preferences.recommendation_types.includes(category.id)}
                      onChange={(e) => {
                        const types = e.target.checked
                          ? [...preferences.recommendation_types, category.id]
                          : preferences.recommendation_types.filter(t => t !== category.id);
                        onUpdatePreferences({ ...preferences, recommendation_types: types });
                      }}
                      className="rounded text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{category.label}</span>
                  </label>
                ))}
              </div>

              {/* Frequency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Frequency
                </label>
                <select
                  value={preferences.recommendation_frequency}
                  onChange={(e) => onUpdatePreferences({
                    ...preferences,
                    recommendation_frequency: e.target.value
                  })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              {/* Priority Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Priority Level
                </label>
                <select
                  value={preferences.min_priority}
                  onChange={(e) => onUpdatePreferences({
                    ...preferences,
                    min_priority: e.target.value
                  })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Show All</option>
                  <option value="medium">Medium and High</option>
                  <option value="high">High Priority Only</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowPreferences(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowPreferences(false);
                  // Save preferences
                }}
                className="ml-3 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}