import React, { useState } from 'react';
import { Trophy, Star, Award, Target, Book, Clock, CheckCircle, Lock } from 'lucide-react';

export default function Achievements({ achievements, progress }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const achievementCategories = [
    { id: 'all', name: 'All', icon: Trophy },
    { id: 'streak', name: 'Streaks', icon: Star },
    { id: 'mastery', name: 'Mastery', icon: Award },
    { id: 'milestones', name: 'Milestones', icon: Target }
  ];

  const allAchievements = [
    // Streak Achievements
    {
      id: 'streak-7',
      category: 'streak',
      title: 'Week Warrior',
      description: 'Maintain a 7-day study streak',
      icon: Star,
      requirement: { type: 'streak', value: 7 },
      reward: 'Unlock custom study reminders'
    },
    {
      id: 'streak-30',
      category: 'streak',
      title: 'Monthly Master',
      description: 'Maintain a 30-day study streak',
      icon: Star,
      requirement: { type: 'streak', value: 30 },
      reward: 'Unlock advanced progress analytics'
    },

    // Mastery Achievements
    {
      id: 'mastery-100',
      category: 'mastery',
      title: 'Vocabulary Pioneer',
      description: 'Master 100 words',
      icon: Book,
      requirement: { type: 'words_mastered', value: 100 },
      reward: 'Unlock spaced repetition system'
    },
    {
      id: 'mastery-500',
      category: 'mastery',
      title: 'Language Enthusiast',
      description: 'Master 500 words',
      icon: Book,
      requirement: { type: 'words_mastered', value: 500 },
      reward: 'Unlock advanced conversation topics'
    },

    // Milestone Achievements
    {
      id: 'study-24h',
      category: 'milestones',
      title: 'Dedicated Learner',
      description: 'Complete 24 hours of study time',
      icon: Clock,
      requirement: { type: 'study_hours', value: 24 },
      reward: 'Unlock personalized study plans'
    },
    {
      id: 'accuracy-90',
      category: 'milestones',
      title: 'Accuracy Ace',
      description: 'Maintain 90% accuracy for a week',
      icon: CheckCircle,
      requirement: { type: 'accuracy', value: 90 },
      reward: 'Unlock advanced quiz modes'
    }
  ];

  const isAchievementUnlocked = (achievement) => {
    return achievements.includes(achievement.id);
  };

  const getProgressPercentage = (achievement) => {
    const { type, value } = achievement.requirement;
    const currentValue = progress[type] || 0;
    return Math.min(100, Math.round((currentValue / value) * 100));
  };

  const filteredAchievements = allAchievements.filter(achievement =>
    selectedCategory === 'all' || achievement.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* Category Selector */}
      <div className="flex overflow-x-auto space-x-4 pb-2">
        {achievementCategories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap ${selectedCategory === category.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            <category.icon className="w-5 h-5 mr-2" />
            {category.name}
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map(achievement => {
          const isUnlocked = isAchievementUnlocked(achievement);
          const progress = getProgressPercentage(achievement);

          return (
            <div
              key={achievement.id}
              className={`relative bg-white rounded-lg shadow-lg p-6 ${isUnlocked ? 'border-2 border-green-500' : ''}`}
            >
              {/* Achievement Icon */}
              <div className="absolute top-4 right-4">
                {isUnlocked ? (
                  <Trophy className="w-8 h-8 text-yellow-500" />
                ) : (
                  <Lock className="w-8 h-8 text-gray-400" />
                )}
              </div>

              {/* Achievement Content */}
              <div className="mb-4">
                <achievement.icon
                  className={`w-12 h-12 ${isUnlocked ? 'text-blue-500' : 'text-gray-400'}`}
                />
                <h3 className="text-lg font-semibold mt-2">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${isUnlocked ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {progress}% Complete
                  </span>
                  {!isUnlocked && (
                    <span className="text-blue-600">
                      {progress}/{achievement.requirement.value} {achievement.requirement.type.replace('_', ' ')}
                    </span>
                  )}
                </div>
              </div>

              {/* Reward */}
              <div className="mt-4 pt-4 border-t">
                <div className="text-sm">
                  <span className="text-gray-600">Reward: </span>
                  <span className={isUnlocked ? 'text-green-600' : 'text-gray-600'}>
                    {achievement.reward}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}