import React, { useState } from 'react';
import { Settings, Bell, Clock, Target, BookOpen } from 'lucide-react';

export default function UserPreferences({ initialPreferences, onSave }) {
  const [preferences, setPreferences] = useState(initialPreferences);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(preferences);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Settings className="w-6 h-6 mr-2" />
        <h2 className="text-2xl font-bold">Learning Preferences</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Daily Goals */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Daily Goals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Study Time (minutes)
              </label>
              <input
                type="number"
                min="5"
                max="240"
                value={preferences.daily_goals.study_time}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    daily_goals: {
                      ...preferences.daily_goals,
                      study_time: parseInt(e.target.value)
                    }
                  })
                }
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Exercises
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={preferences.daily_goals.exercises}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    daily_goals: {
                      ...preferences.daily_goals,
                      exercises: parseInt(e.target.value)
                    }
                  })
                }
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Study Schedule */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Study Schedule
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Study Time
              </label>
              <input
                type="time"
                value={preferences.preferred_study_time}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    preferred_study_time: e.target.value
                  })
                }
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Days per Week
              </label>
              <input
                type="number"
                min="1"
                max="7"
                value={preferences.study_days_per_week}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    study_days_per_week: parseInt(e.target.value)
                  })
                }
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Learning Focus */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Learning Focus
          </h3>
          <div className="space-y-3">
            {['grammar', 'vocabulary', 'pronunciation', 'conversation'].map((skill) => (
              <div key={skill} className="flex items-center">
                <input
                  type="checkbox"
                  id={`focus-${skill}`}
                  checked={preferences.focus_areas.includes(skill)}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      focus_areas: e.target.checked
                        ? [...preferences.focus_areas, skill]
                        : preferences.focus_areas.filter((s) => s !== skill)
                    })
                  }
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor={`focus-${skill}`}
                  className="ml-2 text-sm font-medium text-gray-700 capitalize"
                >
                  {skill}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notifications
          </h3>
          <div className="space-y-3">
            {[
              { id: 'study_reminder', label: 'Daily Study Reminders' },
              { id: 'progress_updates', label: 'Weekly Progress Updates' },
              { id: 'achievement_alerts', label: 'Achievement Alerts' },
              { id: 'new_content', label: 'New Content Notifications' }
            ].map((notification) => (
              <div key={notification.id} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {notification.label}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.notifications[notification.id]}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        notifications: {
                          ...preferences.notifications,
                          [notification.id]: e.target.checked
                        }
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all" />
                </label>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
}