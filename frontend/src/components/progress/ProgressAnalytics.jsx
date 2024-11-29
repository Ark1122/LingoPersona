import React, { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChartBar, PieChartIcon, TrendingUp, Calendar, ArrowUp, ArrowDown } from 'lucide-react';

export default function ProgressAnalytics({ data, timeRange = 'week' }) {
  const [selectedRange, setSelectedRange] = useState(timeRange);
  const [selectedMetric, setSelectedMetric] = useState('accuracy');

  const timeRanges = [
    { id: 'week', label: 'Past Week' },
    { id: 'month', label: 'Past Month' },
    { id: 'year', label: 'Past Year' }
  ];

  const metrics = [
    { id: 'accuracy', label: 'Accuracy', color: '#3B82F6' },
    { id: 'words_learned', label: 'Words Learned', color: '#10B981' },
    { id: 'study_time', label: 'Study Time', color: '#F59E0B' },
    { id: 'mastery_rate', label: 'Mastery Rate', color: '#8B5CF6' }
  ];

  // Previous component code remains the same until the Summary Stats section...

  const calculateTrend = (values) => {
    if (values.length < 2) return 0;
    const firstHalf = values.slice(0, Math.floor(values.length / 2));
    const secondHalf = values.slice(Math.floor(values.length / 2));
    const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
    return ((secondAvg - firstAvg) / firstAvg) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Previous JSX remains the same... */}

      {/* Distribution Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <PieChartIcon className="w-5 h-5 mr-2" />
            Study Time Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={processedData}
                  dataKey="study_time"
                  nameKey="date"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {processedData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={`hsl(${(index * 360) / processedData.length}, 70%, 50%)`}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${Math.round(value / 60)} hrs`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <ChartBar className="w-5 h-5 mr-2" />
            Words Learned Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={processedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => `${value} words`} />
                <Bar dataKey="words_learned" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Trend Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map(metric => {
          const values = processedData.map(d => d[metric.id]);
          const trend = calculateTrend(values);
          const formatter = getMetricFormatter(metric.id);

          return (
            <div key={metric.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-semibold">{metric.label}</h4>
                <div
                  className={`flex items-center ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}
                >
                  {trend >= 0 ? (
                    <ArrowUp className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDown className="w-4 h-4 mr-1" />
                  )}
                  <span className="text-sm">
                    {Math.abs(trend).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="text-2xl font-bold mb-2">
                {formatter(values[values.length - 1])}
              </div>
              <div className="text-sm text-gray-600">
                vs. {formatter(values[0])} at start
              </div>
            </div>
          );
        })}
      </div>

      {/* Key Insights */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Key Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Strengths</h4>
            <ul className="space-y-2">
              {metrics
                .filter(metric => {
                  const trend = calculateTrend(
                    processedData.map(d => d[metric.id])
                  );
                  return trend > 0;
                })
                .map(metric => (
                  <li
                    key={metric.id}
                    className="flex items-center text-green-600"
                  >
                    <ArrowUp className="w-4 h-4 mr-2" />
                    {metric.label} is improving
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Areas for Improvement</h4>
            <ul className="space-y-2">
              {metrics
                .filter(metric => {
                  const trend = calculateTrend(
                    processedData.map(d => d[metric.id])
                  );
                  return trend < 0;
                })
                .map(metric => (
                  <li
                    key={metric.id}
                    className="flex items-center text-red-600"
                  >
                    <ArrowDown className="w-4 h-4 mr-2" />
                    {metric.label} needs attention
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}