import React, { useState } from 'react';
import { Award, Calendar, Star, Filter, Medal, Trophy, Target, ChevronDown } from 'lucide-react';

export default function AchievementsHistory({ achievements }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedAchievement, setExpandedAchievement] = useState(null);

  const categories = [
    { id: 'all', label: 'All Achievements', icon: Trophy },
    { id: 'streak', label: 'Learning Streaks', icon: Calendar },
    { id: 'mastery', label: 'Language Mastery', icon: Star },
    { id: 'milestone', label: 'Milestones', icon: Target }
  ];

  const filteredAchievements = achievements.filter(
    achievement => selectedCategory === 'all' || achievement.category === selectedCategory
  );

  const getTierColor = (tier) => {
    const colors = {
      bronze: 'from-orange-100 to-orange-50 border-orange-200',
      silver: 'from-gray-100 to-gray-50 border-gray-200',
      gold: 'from-yellow-100 to-yellow-50 border-yellow-200',
      platinum: 'from-purple-100 to-purple-50 border-purple-200'
    };
    return colors[tier] || colors.bronze;
  };

  const getTierIcon = (tier) => {
    switch (tier) {
      case 'gold':
        return Trophy;
      case 'platinum':
        return Medal;
      default:
        return Award;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Category Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold flex items-center">
          <Trophy className="w-7 h-7 mr-2 text-yellow-500" />
          Achievements Gallery
        </h2>

        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${selectedCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Achievements', value: achievements.length, icon: Trophy },
          { label: 'Gold Achievements', value: achievements.filter(a => a.tier === 'gold').length, icon: Medal },
          { label: 'Current Streak', value: `${achievements.find(a => a.category === 'streak')?.progress || 0} days`, icon: Calendar },
          { label: 'Completion Rate', value: `${Math.round((achievements.filter(a => a.completed).length / achievements.length) * 100)}%`, icon: Target }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">{stat.label}</span>
              <stat.icon className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement, index) => {
          const IconComponent = getTierIcon(achievement.tier);
          
          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${getTierColor(achievement.tier)} 
                rounded-lg border p-6 transition-all cursor-pointer
                ${expandedAchievement === index ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setExpandedAchievement(expandedAchievement === index ? null : index)}
            >
              <div className="flex items-start justify-between mb-4">
                <IconComponent className={`w-6 h-6 ${achievement.completed ? 'text-yellow-500' : 'text-gray-400'}`} />
                <div className="text-sm text-gray-500">
                  {achievement.completed
                    ? new Date(achievement.completedDate).toLocaleDateString()
                    : 'In Progress'}
                </div>
              </div>

              <h3 className="font-semibold mb-2">{achievement.title}</h3>
              <p className="text-sm text-gray-600 mb-4">
                {achievement.description}
              </p>

              {/* Progress Bar */}
              {!achievement.completed && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-blue-600">
                      {Math.round((achievement.progress / achievement.target) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 rounded-full h-2 transition-all"
                      style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Expanded Details */}
              {expandedAchievement === index && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium mb-2">Requirements:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {achievement.requirements.map((req, reqIndex) => (
                      <li
                        key={reqIndex}
                        className="flex items-start"
                      >
                        <ChevronDown className="w-4 h-4 mr-2 mt-0.5" />
                        {req}
                      </li>
                    ))}
                  </ul>

                  {achievement.reward && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Reward:</h4>
                      <p className="text-sm text-gray-600">{achievement.reward}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No achievements found in this category
        </div>
      )}
    </div>
  );
}