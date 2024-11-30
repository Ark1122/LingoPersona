import React, { useState, useMemo } from 'react';
import { Clock, Brain, Target, Calendar, MessageCircle, Book, Headphones, PenTool, ChevronRight, Star, Play } from 'lucide-react';

export default function PracticeSessionRecommender({ learnerProfile, progressData, preferences }) {
  // Previous code remains the same...

  return (
    <div className="space-y-6">
      {/* Previous sections remain the same... */}

      {/* Recommended Activities */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-green-500" />
          Recommended Activities
        </h3>

        <div className="space-y-4">
          {recommendedActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <activity.icon
                  className={`w-8 h-8 p-1.5 rounded-lg bg-${getScoreColor(activity.score)}-100 text-${getScoreColor(activity.score)}-500`}
                />
                <div className="ml-4">
                  <h4 className="font-medium">{activity.title}</h4>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {activity.duration} minutes
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  <Star
                    className={`w-4 h-4 inline mr-1 text-${getScoreColor(activity.score)}-500`}
                    fill="currentColor"
                  />
                  {Math.round(activity.score * 100)}% match
                </div>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Practice Schedule */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-red-500" />
          Today's Schedule
        </h3>

        <div className="space-y-4">
          {generateDailySchedule().map((session, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center">
                <div className="w-16 text-center">
                  <div className="text-sm font-medium">{session.time}</div>
                  <div className="text-xs text-gray-500">{session.duration} min</div>
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">{session.title}</h4>
                  <p className="text-sm text-gray-600">{session.description}</p>
                </div>
              </div>
              <button className="text-blue-500 hover:text-blue-600">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Insights */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-500" />
          Learning Insights
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {generateInsights().map((insight, index) => (
            <div
              key={index}
              className="p-4 bg-purple-50 rounded-lg border border-purple-100"
            >
              <div className="flex items-start">
                <insight.icon
                  className="w-5 h-5 text-purple-500 mt-0.5"
                />
                <div className="ml-3">
                  <h4 className="font-medium text-purple-900">
                    {insight.title}
                  </h4>
                  <p className="text-sm text-purple-700 mt-1">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  function generateDailySchedule() {
    // Generate practice sessions based on available time slots and recommended activities
    const schedule = [];
    const availableSlots = timeSlots.filter(slot => {
      const [hours, minutes] = slot.time.split(':').map(Number);
      const slotTime = new Date();
      slotTime.setHours(hours, minutes);
      return slotTime > new Date();
    });

    // Add recommended sessions
    availableSlots.slice(0, 3).forEach((slot, index) => {
      const activity = recommendedActivities[index % recommendedActivities.length];
      schedule.push({
        time: slot.time,
        duration: activity.duration,
        title: activity.title,
        description: activity.description,
        type: activity.type
      });
    });

    return schedule;
  }

  function generateInsights() {
    const insights = [];

    // Optimal time insight
    const bestTime = timeSlots[0];
    insights.push({
      title: 'Peak Performance Time',
      description: `You tend to perform best around ${bestTime.time}. Consider scheduling important practice sessions during this time.`,
      icon: Clock
    });

    // Practice pattern insight
    const mostPracticedType = Object.entries({
      speaking: calculateActivityScore('speaking'),
      listening: calculateActivityScore('listening'),
      reading: calculateActivityScore('reading'),
      writing: calculateActivityScore('writing')
    }).sort(([,a], [,b]) => b - a)[0][0];

    insights.push({
      title: 'Learning Style',
      description: `You show strong engagement with ${mostPracticedType} activities. Consider incorporating this strength into other areas of practice.`,
      icon: Brain
    });

    return insights;
  }
}