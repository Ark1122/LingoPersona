import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, TrendingUp, BookOpen } from 'lucide-react';

export default function StudyHistory({ history, timeRange = 'week' }) {
  const [selectedRange, setSelectedRange] = useState(timeRange);

  const formatData = (data) => {
    const ranges = {
      week: 7,
      month: 30,
      year: 365
    };

    const daysToInclude = ranges[selectedRange];
    const today = new Date();
    const dates = Array.from({ length: daysToInclude }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (daysToInclude - 1 - i));
      return date.toISOString().split('T')[0];
    });

    // Create lookup for history data
    const historyLookup = data.reduce((acc, entry) => {
      const date = new Date(entry.date).toISOString().split('T')[0];
      acc[date] = entry;
      return acc;
    }, {});

    // Fill in missing dates with zero values
    return dates.map(date => ({
      date,
      minutes: historyLookup[date]?.minutes || 0,
      words_learned: historyLookup[date]?.words_learned || 0,
      accuracy: historyLookup[date]?.accuracy || 0
    }));
  };

  const calculateStats = (data) => {
    const nonZeroDays = data.filter(day => day.minutes > 0);
    const totalMinutes = data.reduce((sum, day) => sum + day.minutes, 0);
    const totalWords = data.reduce((sum, day) => sum + day.words_learned, 0);
    const avgAccuracy = nonZeroDays.reduce((sum, day) => sum + day.accuracy, 0) / nonZeroDays.length || 0;

    return {
      totalMinutes,
      totalWords,
      avgAccuracy,
      studyDays: nonZeroDays.length,
      streak: calculateStreak(data)
    };
  };

  const calculateStreak = (data) => {
    let currentStreak = 0;
    const today = new Date().toISOString().split('T')[0];

    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].minutes > 0) {
        currentStreak++;
      } else if (data[i].date !== today) {
        break;
      }
    }

    return currentStreak;
  };

  const formattedData = formatData(history);
  const stats = calculateStats(formattedData);

  const formatTooltip = (value, name) => {
    switch (name) {
      case 'minutes':
        return `${value} min`;
      case 'words_learned':
        return `${value} words`;
      case 'accuracy':
        return `${value}%`;
      default:
        return value;
    }
  };

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-600">Study Time</div>
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold">
            {Math.round(stats.totalMinutes / 60)} hrs {stats.totalMinutes % 60} min
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-600">Words Learned</div>
            <BookOpen className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold">{stats.totalWords}</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-600">Avg. Accuracy</div>
            <TrendingUp className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold">
            {Math.round(stats.avgAccuracy)}%
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-600">Study Streak</div>
            <Calendar className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-2xl font-bold">{stats.streak} days</div>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-end space-x-2">
        {['week', 'month', 'year'].map(range => (
          <button
            key={range}
            onClick={() => setSelectedRange(range)}
            className={`px-4 py-2 rounded-lg ${selectedRange === range
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="space-y-8">
        {/* Study Time Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Study Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={formatTooltip} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="minutes"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Words Learned Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Words Learned</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={formatTooltip} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="words_learned"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Accuracy Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Accuracy</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={formatTooltip} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}