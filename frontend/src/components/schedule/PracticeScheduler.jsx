import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, X, Plus, Book, MessageCircle, Headphones, PenTool, Repeat } from 'lucide-react';

export default function PracticeScheduler({ existingSchedule, onSchedule }) {
  const [showScheduler, setShowScheduler] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [newSession, setNewSession] = useState({
    type: '',
    time: '',
    duration: 30,
    recurring: false
  });

  // Previous code remains the same up to renderPracticeTypeSelection...

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <Calendar className="w-7 h-7 mr-2 text-blue-500" />
          Practice Schedule
        </h2>
        <button
          onClick={() => setShowScheduler(!showScheduler)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {showScheduler ? (
            <>
              <X className="w-5 h-5 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="w-5 h-5 mr-2" />
              Add Session
            </>
          )}
        </button>
      </div>

      {renderScheduleGrid()}

      {showScheduler && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-6">Schedule New Session</h3>

          {/* Practice Type Selection */}
          {renderPracticeTypeSelection()}

          {/* Time and Duration Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Time
              </label>
              <select
                value={newSession.time}
                onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select time</option>
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <select
                value={newSession.duration}
                onChange={(e) => setNewSession({ ...newSession, duration: parseInt(e.target.value) })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {durationOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Recurring Option */}
          <div className="mb-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={newSession.recurring}
                onChange={(e) => setNewSession({ ...newSession, recurring: e.target.checked })}
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Repeat weekly</span>
              <Repeat className="w-4 h-4 text-gray-400" />
            </label>
            <p className="text-sm text-gray-500 mt-1 ml-6">
              This session will be automatically scheduled for the same time every week
            </p>
          </div>

          {/* Summary */}
          {newSession.type && newSession.time && selectedDay !== null && (
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-blue-800 mb-2">Session Summary</h4>
              <div className="text-sm text-blue-600">
                <p>
                  {practiceTypes.find(t => t.id === newSession.type)?.title} on{' '}
                  {days[selectedDay]} at {newSession.time} for {newSession.duration} minutes
                </p>
                {newSession.recurring && (
                  <p className="mt-1 flex items-center">
                    <Repeat className="w-4 h-4 mr-1" />
                    Repeats weekly
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => {
                setShowScheduler(false);
                resetForm();
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSchedule}
              disabled={!newSession.type || !newSession.time || selectedDay === null}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Schedule Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
}