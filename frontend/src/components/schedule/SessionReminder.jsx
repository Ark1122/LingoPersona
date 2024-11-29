import React, { useState, useEffect } from 'react';
import { Bell, Calendar, Clock, X, Check, Settings } from 'lucide-react';

export default function SessionReminder({ sessions, onJoinSession, onDismiss, reminderSettings }) {
  // Previous code stays the same until the ReminderSettings component...

  const ReminderSettings = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Reminder Settings</h3>
        <button
          onClick={() => setShowSettings(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Previous settings options stay the same... */}

        {/* Browser Notifications Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Browser Notifications</div>
            <div className="text-sm text-gray-500">Show desktop notifications</div>
          </div>
          <button
            onClick={() => handleSettingsUpdate({
              ...settings,
              browserNotifications: !settings.browserNotifications
            })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.browserNotifications ? 'bg-blue-500' : 'bg-gray-200'}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.browserNotifications ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
        </div>

        <div className="pt-4 border-t">
          <button
            onClick={() => setShowSettings(false)}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-4 right-4 space-y-4 z-50">
      {/* Settings Button */}
      <button
        onClick={() => setShowSettings(true)}
        className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors shadow-lg"
      >
        <Settings className="w-5 h-5 text-gray-600" />
      </button>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="w-full max-w-md">
            <ReminderSettings />
          </div>
        </div>
      )}

      {/* Session Reminders */}
      {upcomingSessions.map(session => (
        <div
          key={session.id}
          className="bg-white rounded-lg shadow-lg p-4 max-w-sm animate-slide-in-right"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center">
              <Bell className="w-5 h-5 text-blue-500 mr-2" />
              <h4 className="font-medium">Upcoming Session</h4>
            </div>
            <button
              onClick={() => onDismiss(session.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">{new Date(session.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">
                Starts in {getTimeUntil(session.date)}
              </span>
            </div>
          </div>

          <button
            onClick={() => onJoinSession(session)}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
          >
            <Check className="w-4 h-4 mr-2" />
            Join Session
          </button>
        </div>
      ))}
    </div>
  );
}

// Add styles for animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slide-in-right {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .animate-slide-in-right {
    animation: slide-in-right 0.3s ease-out;
  }
`;
document.head.appendChild(style);