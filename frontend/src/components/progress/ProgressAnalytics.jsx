import React, { useState, useMemo } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Clock, Calendar, Target, Book, Brain, Filter, ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';

export default function ProgressAnalytics({ progressData, learningPatterns }) {
  // Previous code remains the same...

  return (
    <div className="space-y-8">
      {/* Previous sections remain the same... */}

      {/* Trend Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {metrics.map(metric => {
          const lastValue = processedData[processedData.length - 1]?.[metric.id] || 0;
          const trend = trends[metric.id] || 0;
          
          return (
            <div key={metric.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-2">
                <div className="text-gray-600">{metric.label}</div>
                <div
                  className={`flex items-center ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}
                >
                  {trend >= 0 ? (
                    <ArrowUp className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDown className="w-4 h-4 mr-1" />
                  )}
                  {Math.abs(trend).toFixed(1)}%
                </div>
              </div>
              <div className="text-2xl font-bold">
                {typeof lastValue === 'number' 
                  ? lastValue.toFixed(1)
                  : lastValue}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Progress Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-6">Progress Trends</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedMetrics.map(metricId => {
                const metric = metrics.find(m => m.id === metricId);
                return (
                  <Line
                    key={metricId}
                    type="monotone"
                    dataKey={metricId}
                    name={metric.label}
                    stroke={metric.color}
                    strokeWidth={2}
                    dot={false}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Study Time Distribution */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-6">Study Time Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Morning', value: learningPatterns.timeDistribution.morning },
                    { name: 'Afternoon', value: learningPatterns.timeDistribution.afternoon },
                    { name: 'Evening', value: learningPatterns.timeDistribution.evening },
                    { name: 'Night', value: learningPatterns.timeDistribution.night }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {[
                    '#3B82F6', // blue
                    '#10B981', // green
                    '#F59E0B', // yellow
                    '#8B5CF6'  // purple
                  ].map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Type Distribution */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-6">Activity Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={learningPatterns.activityDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Learning Insights */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-500" />
          Learning Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {generateInsights().map((insight, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-purple-200 bg-purple-50"
            >
              <div className="flex items-start">
                <insight.icon
                  className="w-5 h-5 mr-3 text-purple-500 flex-shrink-0 mt-1"
                />
                <div>
                  <h4 className="font-medium text-purple-900 mb-1">
                    {insight.title}
                  </h4>
                  <p className="text-sm text-purple-700">
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

  function generateInsights() {
    const insights = [];
    const lastWeekData = processedData.slice(-7);

    // Study time insights
    const avgStudyTime = lastWeekData.reduce(
      (sum, d) => sum + d.study_time,
      0
    ) / lastWeekData.length;

    if (avgStudyTime < 30) {
      insights.push({
        title: 'Increase Study Time',
        description: 'Try to study at least 30 minutes per day for better progress',
        icon: Clock
      });
    }

    // Performance insights
    const accuracyTrend = trends.accuracy;
    if (accuracyTrend < 0) {
      insights.push({
        title: 'Accuracy Declining',
        description: 'Focus on reviewing fundamentals to improve accuracy',
        icon: Target
      });
    }

    // Study pattern insights
    const mostProductiveTime = Object.entries(learningPatterns.timeDistribution)
      .sort(([,a], [,b]) => b - a)[0][0];

    insights.push({
      title: 'Peak Performance Time',
      description: `You perform best during ${mostProductiveTime}. Try to schedule important practice then.`,
      icon: Calendar
    });

    // Activity balance insights
    const activities = learningPatterns.activityDistribution;
    const leastPracticed = activities.sort((a, b) => a.value - b.value)[0];

    insights.push({
      title: 'Balance Your Practice',
      description: `Increase focus on ${leastPracticed.name.toLowerCase()} activities`,
      icon: Book
    });

    return insights;
  }
}