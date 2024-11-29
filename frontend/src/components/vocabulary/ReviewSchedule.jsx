import React from 'react';
import { Calendar, Clock } from 'lucide-react';

export default function ReviewSchedule({ dueReviews }) {
  const groupByDueTime = () => {
    const groups = {
      overdue: [],
      dueToday: [],
      dueLater: []
    };

    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    dueReviews.forEach(review => {
      const dueDate = new Date(review.next_review);
      
      if (dueDate < now) {
        groups.overdue.push(review);
      } else if (dueDate <= endOfDay) {
        groups.dueToday.push(review);
      } else {
        groups.dueLater.push(review);
      }
    });

    return groups;
  };

  const getTimeUntil = (date) => {
    const now = new Date();
    const diff = new Date(date) - now;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) {
      return `in ${hours} hours`;
    }
    
    const days = Math.floor(hours / 24);
    return `in ${days} days`;
  };

  const groups = groupByDueTime();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-6 flex items-center">
        <Calendar className="w-5 h-5 mr-2" />
        Review Schedule
      </h3>

      {/* Overdue Reviews */}
      {groups.overdue.length > 0 && (
        <div className="mb-6">
          <h4 className="text-red-600 font-medium mb-2">
            Overdue ({groups.overdue.length})
          </h4>
          <div className="space-y-2">
            {groups.overdue.map(word => (
              <div
                key={word.id}
                className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
              >
                <span className="font-medium">{word.term}</span>
                <span className="text-sm text-red-600">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Overdue
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Due Today */}
      {groups.dueToday.length > 0 && (
        <div className="mb-6">
          <h4 className="text-yellow-600 font-medium mb-2">
            Due Today ({groups.dueToday.length})
          </h4>
          <div className="space-y-2">
            {groups.dueToday.map(word => (
              <div
                key={word.id}
                className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg"
              >
                <span className="font-medium">{word.term}</span>
                <span className="text-sm text-yellow-600">
                  <Clock className="w-4 h-4 inline mr-1" />
                  {getTimeUntil(word.next_review)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Due Later */}
      {groups.dueLater.length > 0 && (
        <div>
          <h4 className="text-blue-600 font-medium mb-2">
            Upcoming ({groups.dueLater.length})
          </h4>
          <div className="space-y-2">
            {groups.dueLater.map(word => (
              <div
                key={word.id}
                className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
              >
                <span className="font-medium">{word.term}</span>
                <span className="text-sm text-blue-600">
                  <Clock className="w-4 h-4 inline mr-1" />
                  {getTimeUntil(word.next_review)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Reviews */}
      {Object.values(groups).every(group => group.length === 0) && (
        <div className="text-center text-gray-500 py-8">
          No reviews scheduled at the moment
        </div>
      )}
    </div>
  );
}