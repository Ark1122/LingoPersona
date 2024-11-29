import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, Book, Headphones, PenTool } from 'lucide-react';

export default function CalendarView({ sessions, onSelectSession }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSession, setSelectedSession] = useState(null);

  const practiceTypeIcons = {
    conversation: MessageCircle,
    vocabulary: Book,
    listening: Headphones,
    writing: PenTool
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const generateCalendarDays = () => {
    const days = [];
    const totalDays = firstDayOfMonth + daysInMonth;
    const totalWeeks = Math.ceil(totalDays / 7);

    for (let i = 0; i < totalWeeks * 7; i++) {
      const dayNumber = i - firstDayOfMonth + 1;
      const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber);
      const daysSessions = isCurrentMonth ? sessions.filter(session => {
        const sessionDate = new Date(session.date);
        return (
          sessionDate.getDate() === dayNumber &&
          sessionDate.getMonth() === currentDate.getMonth() &&
          sessionDate.getFullYear() === currentDate.getFullYear()
        );
      }) : [];

      days.push({
        number: dayNumber,
        isCurrentMonth,
        date,
        sessions: daysSessions
      });
    }

    return days;
  };

  const getSessionTypeColor = (type) => {
    const colors = {
      conversation: 'blue',
      vocabulary: 'green',
      listening: 'yellow',
      writing: 'purple'
    };
    return colors[type] || 'gray';
  };

  const changeMonth = (increment) => {
    setCurrentDate(new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + increment,
      1
    ));
  };

  const handleSessionClick = (session) => {
    setSelectedSession(session);
    onSelectSession?.(session);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => changeMonth(-1)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => changeMonth(1)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-4 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4">
        {generateCalendarDays().map((day, index) => (
          <div
            key={index}
            className={`min-h-[100px] p-2 rounded-lg border ${day.isCurrentMonth
              ? 'bg-white'
              : 'bg-gray-50'}`}
          >
            <div className="text-right mb-2">
              <span className={`text-sm ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}>
                {day.number > 0 ? day.number : ''}
              </span>
            </div>

            {day.isCurrentMonth && day.sessions.map((session, sessionIndex) => {
              const typeColor = getSessionTypeColor(session.type);
              const Icon = practiceTypeIcons[session.type];

              return (
                <button
                  key={sessionIndex}
                  onClick={() => handleSessionClick(session)}
                  className={`w-full mb-1 p-1 rounded text-left group hover:shadow-md transition-shadow
                    bg-${typeColor}-50 border border-${typeColor}-200
                    ${selectedSession?.id === session.id ? `ring-2 ring-${typeColor}-500` : ''}`}
                >
                  <div className="flex items-center">
                    <Icon className={`w-3 h-3 mr-1 text-${typeColor}-500`} />
                    <span className={`text-xs text-${typeColor}-700`}>
                      {session.time}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Selected Session Details */}
      {selectedSession && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold mb-1">
                {selectedSession.title}
              </h3>
              <p className="text-sm text-gray-600">
                {new Date(selectedSession.date).toLocaleDateString()} at {selectedSession.time}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Duration: {selectedSession.duration} minutes
              </p>
            </div>
            <button
              onClick={() => setSelectedSession(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}