import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProgressDashboard({ learningStats }) {
  const {
    dailyProgress,
    weeklyGoals,
    achievements,
    skillLevels
  } = learningStats;

  return (
    <div className="space-y-8">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Study Streak</h3>
          <div className="text-3xl font-bold text-blue-500">
            {learningStats.currentStreak} days
          </div>
          <p className="text-gray-600">Best: {learningStats.bestStreak} days</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Time Studied</h3>
          <div className="text-3xl font-bold text-green-500">
            {learningStats.totalHours}h
          </div>
          <p className="text-gray-600">This week: {learningStats.weeklyHours}h</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Vocabulary</h3>
          <div className="text-3xl font-bold text-purple-500">
            {learningStats.wordsLearned}
          </div>
          <p className="text-gray-600">Words mastered</p>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3B82F6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Skill Levels */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Language Skills</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(skillLevels).map(([skill, level]) => (
            <div key={skill} className="text-center">
              <div className="mb-2">
                <div
                  className="w-24 h-24 mx-auto rounded-full border-4 border-blue-200 flex items-center justify-center"
                  style={{
                    background: `conic-gradient(#3B82F6 ${level * 360}deg, #E5E7EB 0deg)`
                  }}
                >
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                    <span className="text-xl font-semibold">{Math.round(level * 100)}%</span>
                  </div>
                </div>
              </div>
              <p className="capitalize">{skill}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-center p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">{achievement.icon}</span>
              </div>
              <div>
                <h4 className="font-semibold">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}