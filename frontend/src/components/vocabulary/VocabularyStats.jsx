import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Book, TrendingUp, Clock } from 'lucide-react';

export default function VocabularyStats({ stats }) {
  const {
    total,
    mastered,
    familiar,
    learning,
    reviewsToday,
    averageAccuracy
  } = stats;

  const chartData = [
    { name: 'Mastered', value: mastered, color: '#10B981' },
    { name: 'Familiar', value: familiar, color: '#F59E0B' },
    { name: 'Learning', value: learning, color: '#3B82F6' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-6 flex items-center">
        <Book className="w-5 h-5 mr-2" />
        Vocabulary Progress
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Words */}
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800">{total}</div>
          <div className="text-sm text-gray-600">Total Words</div>
        </div>

        {/* Reviews Today */}
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-500">{reviewsToday}</div>
          <div className="text-sm text-gray-600">Reviews Today</div>
        </div>

        {/* Average Accuracy */}
        <div className="text-center">
          <div className="text-3xl font-bold text-green-500">
            {Math.round(averageAccuracy)}%
          </div>
          <div className="text-sm text-gray-600">Average Accuracy</div>
        </div>
      </div>

      {/* Distribution Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="font-semibold text-green-700">
            Mastered Words
          </div>
          <div className="mt-1 text-2xl font-bold text-green-800">
            {mastered}
          </div>
          <div className="text-sm text-green-600">
            {Math.round((mastered / total) * 100)}% of total
          </div>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg">
          <div className="font-semibold text-yellow-700">
            Familiar Words
          </div>
          <div className="mt-1 text-2xl font-bold text-yellow-800">
            {familiar}
          </div>
          <div className="text-sm text-yellow-600">
            {Math.round((familiar / total) * 100)}% of total
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="font-semibold text-blue-700">
            Learning Words
          </div>
          <div className="mt-1 text-2xl font-bold text-blue-800">
            {learning}
          </div>
          <div className="text-sm text-blue-600">
            {Math.round((learning / total) * 100)}% of total
          </div>
        </div>
      </div>
    </div>
  );
}