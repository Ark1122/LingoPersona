import React, { useState } from 'react';
import { Calendar, Clock, Repeat, Edit2, Trash2, AlertCircle, Settings } from 'lucide-react';

export default function RecurringSessionManager({ recurringSchedule, onUpdateSchedule, onDeleteSchedule }) {
  const [editingSession, setEditingSession] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return [`${hour}:00`, `${hour}:30`];
  }).flat();

  const durationOptions = [
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' }
  ];

  const handleEdit = (session) => {
    setEditingSession(session);
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    onUpdateSchedule(editingSession);
    setShowEditModal(false);
    setEditingSession(null);
  };

  const handleDelete = (sessionId) => {
    onDeleteSchedule(sessionId);
  };

  const getPracticeTypeColor = (type) => {
    const colors = {
      conversation: 'blue',
      vocabulary: 'green',
      listening: 'yellow',
      writing: 'purple'
    };
    return colors[type] || 'gray';
  };

  const getNextOccurrence = (session) => {
    const today = new Date();
    const dayDiff = (session.day - today.getDay() + 7) % 7;
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + dayDiff);
    return nextDate;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <Repeat className="w-7 h-7 mr-2 text-blue-500" />
          Recurring Sessions
        </h2>
      </div>

      {/* Session List */}
      <div className="space-y-4">
        {recurringSchedule.map(session => {
          const typeColor = getPracticeTypeColor(session.type);
          const nextDate = getNextOccurrence(session);

          return (
            <div
              key={session.id}
              className={`bg-white rounded-lg shadow-lg p-6 border-l-4 border-${typeColor}-500`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold mb-2">{session.title}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Every {daysOfWeek[session.day]}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {session.time} ({session.duration} minutes)
                    </div>
                    <div className="flex items-center text-blue-600">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Next session: {nextDate.toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(session)}
                    className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(session.id)}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {recurringSchedule.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No recurring sessions scheduled
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && editingSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Recurring Session</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <select
                  value={editingSession.time}
                  onChange={(e) => setEditingSession({
                    ...editingSession,
                    time: e.target.value
                  })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              {/* Duration Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <select
                  value={editingSession.duration}
                  onChange={(e) => setEditingSession({
                    ...editingSession,
                    duration: parseInt(e.target.value)
                  })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {durationOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Day Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Day of Week
                </label>
                <select
                  value={editingSession.day}
                  onChange={(e) => setEditingSession({
                    ...editingSession,
                    day: parseInt(e.target.value)
                  })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {daysOfWeek.map((day, index) => (
                    <option key={day} value={index}>{day}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
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