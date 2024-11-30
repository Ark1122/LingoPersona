import React, { useState } from 'react';
import { Calendar, Clock, Target, Brain, Book, MessageCircle, Headphones, PenTool, Save, Edit2, Plus, X, ChevronRight } from 'lucide-react';

export default function StudyPlanGenerator({ learnerProfile, preferences, onSavePlan }) {
  // Previous code remains the same...

  return (
    <div className="space-y-6">
      {/* Previous sections remain the same... */}

      {/* Plan Customization */}
      {showCustomize && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-6">Customize Your Plan</h3>

          <div className="space-y-6">
            {/* Previous customization options remain the same... */}

            {/* Daily Time Display */}
            <div className="flex justify-between text-sm text-gray-600">
              <span>30 min</span>
              <span>{planSettings.dailyTime} min</span>
              <span>180 min</span>
            </div>

            {/* Focus Areas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Focus Areas
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {focusAreas.map(area => (
                  <label
                    key={area.id}
                    className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={planSettings.focusAreas.includes(area.id)}
                      onChange={(e) => {
                        setPlanSettings({
                          ...planSettings,
                          focusAreas: e.target.checked
                            ? [...planSettings.focusAreas, area.id]
                            : planSettings.focusAreas.filter(id => id !== area.id)
                        });
                      }}
                      className="rounded text-blue-500"
                    />
                    <div className="ml-3 flex items-center">
                      <area.icon className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-sm">{area.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Weekend Option */}
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={planSettings.includeWeekends}
                  onChange={(e) => setPlanSettings({
                    ...planSettings,
                    includeWeekends: e.target.checked
                  })}
                  className="rounded text-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Include weekends in study plan
                </span>
              </label>
            </div>

            {/* Generate Button */}
            <div className="pt-4">
              <button
                onClick={handleGeneratePlan}
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Generate Study Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generated Plan Display */}
      {generatedPlan && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Your Study Plan
              </h3>
              <button
                onClick={handleSavePlan}
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Plan
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
              <div>
                <span className="block font-medium">Duration</span>
                <span className="capitalize">{generatedPlan.duration}</span>
              </div>
              <div>
                <span className="block font-medium">Daily Time</span>
                <span>{planSettings.dailyTime} minutes</span>
              </div>
              <div>
                <span className="block font-medium">Focus Areas</span>
                <span>{planSettings.focusAreas.length || 'All'}</span>
              </div>
              <div>
                <span className="block font-medium">Includes Weekends</span>
                <span>{planSettings.includeWeekends ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>

          {/* Schedule Display */}
          <div className="max-h-96 overflow-y-auto">
            {generatedPlan.schedule.map((day, index) => (
              <div
                key={index}
                className="p-4 border-b hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">
                      {getDayLabel(day.date)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(day.date).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {day.activities.reduce((sum, a) => sum + a.duration, 0)} min
                  </span>
                </div>

                <div className="space-y-2">
                  {day.activities.map((activity, actIndex) => (
                    <div
                      key={actIndex}
                      className="flex items-center justify-between text-sm pl-4"
                    >
                      <div className="flex items-center">
                        {React.createElement(
                          focusAreas.find(a => a.id === activity.type)?.icon || Book,
                          { className: 'w-4 h-4 mr-2 text-gray-400' }
                        )}
                        <span>{activity.name}</span>
                      </div>
                      <span className="text-gray-500">{activity.duration} min</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}