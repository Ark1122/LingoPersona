import React, { useState } from 'react';
import { Target, ChevronRight, ChevronDown, Book, MessageCircle, Headphones, PenTool, TrendingUp, Star } from 'lucide-react';

export default function SkillMasteryTracker({ skillLevels, progressHistory }) {
  // Previous code remains the same...

  return (
    <div className="space-y-6">
      {/* Previous sections remain the same... */}

      {/* Detailed Skills Breakdown */}
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div
            key={skill.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {/* Previous button code remains the same... */}

            {expandedSkill === index && (
              <div className="p-4 bg-gray-50 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Subskills Progress */}
                  <div>
                    <h4 className="font-medium mb-4">Skill Components</h4>
                    <div className="space-y-4">
                      {skill.subskills.map((subskill, subIndex) => {
                        const subskillScore = skillLevels[`${skill.id}_${subIndex}`] || 0;
                        return (
                          <div key={subIndex}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">{subskill}</span>
                              <span className="font-medium">{Math.round(subskillScore)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`bg-${skill.color}-500 rounded-full h-2 transition-all`}
                                style={{ width: `${subskillScore}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recent Progress */}
                  <div>
                    <h4 className="font-medium mb-4">Recent Progress</h4>
                    {progressHistory.slice(-5).map((progress, historyIndex) => {
                      const date = new Date(progress.date).toLocaleDateString();
                      const score = progress[skill.id];
                      const previousScore = historyIndex > 0 
                        ? progressHistory[progressHistory.length - historyIndex - 2][skill.id]
                        : score;
                      const change = score - previousScore;

                      return (
                        <div
                          key={historyIndex}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100"
                        >
                          <div>
                            <div className="text-sm font-medium">{date}</div>
                            <div className="text-xs text-gray-500">
                              {getMasteryLevel(score)}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="text-sm font-medium mr-2">
                              {Math.round(score)}%
                            </div>
                            {change !== 0 && (
                              <div
                                className={`text-xs flex items-center ${change > 0 ? 'text-green-500' : 'text-red-500'}`}
                              >
                                <TrendingUp
                                  className={`w-3 h-3 mr-1 ${change < 0 ? 'transform rotate-180' : ''}`}
                                />
                                {Math.abs(change)}%
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Achievements and Milestones */}
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium mb-4 flex items-center">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    Achievements & Milestones
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[50, 75, 100].map(milestone => {
                      const achieved = skillLevels[skill.id] >= milestone;
                      return (
                        <div
                          key={milestone}
                          className={`p-3 rounded-lg border ${achieved
                            ? 'bg-yellow-50 border-yellow-200'
                            : 'bg-gray-50 border-gray-200'}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm ${achieved ? 'text-yellow-700' : 'text-gray-600'}`}>
                              {milestone}% Mastery
                            </span>
                            {achieved && <Star className="w-4 h-4 text-yellow-500" />}
                          </div>
                          <div className="text-xs text-gray-500">
                            {achieved
                              ? `Achieved on ${new Date().toLocaleDateString()}`
                              : `${Math.round(skillLevels[skill.id])}% / ${milestone}%`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Practice Recommendations */}
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium mb-4">Recommended Practice</h4>
                  <div className="space-y-2">
                    {generateRecommendations(skill, skillLevels[skill.id]).map((rec, recIndex) => (
                      <div
                        key={recIndex}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-blue-200 transition-colors"
                      >
                        <div className="flex items-center">
                          <rec.icon className="w-5 h-5 text-blue-500 mr-3" />
                          <div>
                            <div className="font-medium">{rec.title}</div>
                            <div className="text-sm text-gray-600">{rec.description}</div>
                          </div>
                        </div>
                        <button className="px-3 py-1 text-sm text-blue-500 hover:text-blue-600 hover:underline">
                          Start Practice
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  function generateRecommendations(skill, level) {
    const recommendations = [];
    
    // Basic recommendations based on skill level
    if (level < 30) {
      recommendations.push({
        title: 'Foundation Building',
        description: `Focus on basic ${skill.name.toLowerCase()} exercises`,
        icon: Target
      });
    } else if (level < 60) {
      recommendations.push({
        title: 'Skill Development',
        description: `Practice intermediate ${skill.name.toLowerCase()} activities`,
        icon: skill.icon
      });
    } else {
      recommendations.push({
        title: 'Advanced Practice',
        description: `Challenge yourself with complex ${skill.name.toLowerCase()} tasks`,
        icon: Star
      });
    }

    // Add skill-specific recommendations
    switch (skill.id) {
      case 'speaking':
        recommendations.push({
          title: 'Conversation Practice',
          description: 'Practice with AI tutor for natural dialogue',
          icon: MessageCircle
        });
        break;
      case 'listening':
        recommendations.push({
          title: 'Audio Comprehension',
          description: 'Listen to native speakers and practice note-taking',
          icon: Headphones
        });
        break;
      case 'writing':
        recommendations.push({
          title: 'Writing Exercises',
          description: 'Complete guided writing tasks with feedback',
          icon: PenTool
        });
        break;
      case 'reading':
        recommendations.push({
          title: 'Reading Practice',
          description: 'Read and analyze level-appropriate texts',
          icon: Book
        });
        break;
    }

    return recommendations;
  }
}