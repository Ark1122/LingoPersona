import React from 'react';
import { Book, Lightbulb, Clock, Target, ArrowRight, MessageCircle, Headphones, PenTool } from 'lucide-react';

export default function LearningRecommendations({ progress, learningStyle }) {
  const generateRecommendations = (progress) => {
    const recommendations = {
      content: [],
      schedule: [],
      practice: []
    };

    // Content recommendations based on progress
    if (progress.accuracy < 70) {
      recommendations.content.push({
        title: 'Review Basics',
        description: 'Focus on fundamental concepts to build a stronger foundation',
        type: 'content',
        icon: Book,
        priority: 'high',
        action: {
          label: 'Start Review',
          path: '/learn/basics-review'
        }
      });
    }

    if (progress.words_mastered < progress.weekly_target * 0.7) {
      recommendations.content.push({
        title: 'Vocabulary Boost',
        description: 'Increase focus on vocabulary acquisition through flashcards and contextual learning',
        type: 'content',
        icon: Book,
        priority: 'medium',
        action: {
          label: 'Practice Vocabulary',
          path: '/vocabulary/practice'
        }
      });
    }

    // Schedule recommendations
    const studyStreak = progress.current_streak;
    if (studyStreak < 3) {
      recommendations.schedule.push({
        title: 'Build Consistency',
        description: 'Try to study at the same time each day to build a habit',
        type: 'schedule',
        icon: Clock,
        priority: 'high',
        action: {
          label: 'Set Schedule',
          path: '/settings/schedule'
        }
      });
    }

    if (progress.avg_session_length < 15) {
      recommendations.schedule.push({
        title: 'Extend Study Sessions',
        description: 'Aim for at least 20-minute sessions for better retention',
        type: 'schedule',
        icon: Clock,
        priority: 'medium'
      });
    }

    // Practice recommendations
    const addPracticeRecommendation = (skill, threshold) => {
      const skillMap = {
        speaking: {
          title: 'Speaking Practice',
          description: 'Improve your pronunciation and fluency through conversation',
          icon: MessageCircle,
          path: '/practice/speaking'
        },
        listening: {
          title: 'Listening Practice',
          description: 'Enhance your comprehension with audio exercises',
          icon: Headphones,
          path: '/practice/listening'
        },
        writing: {
          title: 'Writing Practice',
          description: 'Develop your written expression skills',
          icon: PenTool,
          path: '/practice/writing'
        }
      };

      if (progress[`${skill}_score`] < threshold) {
        recommendations.practice.push({
          ...skillMap[skill],
          type: 'practice',
          priority: progress[`${skill}_score`] < threshold * 0.7 ? 'high' : 'medium',
          action: {
            label: 'Start Practice',
            path: skillMap[skill].path
          }
        });
      }
    };

    addPracticeRecommendation('speaking', 70);
    addPracticeRecommendation('listening', 75);
    addPracticeRecommendation('writing', 70);

    return recommendations;
  };

  const recommendations = generateRecommendations(progress);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      default:
        return 'text-blue-500';
    }
  };

  const RecommendationCard = ({ recommendation }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <recommendation.icon className="w-6 h-6 text-blue-500" />
          </div>
          <div className="ml-4">
            <h4 className="font-semibold mb-1">{recommendation.title}</h4>
            <p className="text-gray-600 text-sm">{recommendation.description}</p>
          </div>
        </div>
        <span className={`text-sm font-medium ${getPriorityColor(recommendation.priority)}`}>
          {recommendation.priority} priority
        </span>
      </div>

      {recommendation.action && (
        <div className="mt-4 pt-4 border-t">
          <a
            href={recommendation.action.path}
            className="flex items-center text-blue-500 hover:text-blue-700 text-sm font-medium"
          >
            {recommendation.action.label}
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      )}
    </div>
  );

  const renderRecommendationSection = (title, recommendations) => {
    if (recommendations.length === 0) return null;

    return (
      <div>
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((recommendation, index) => (
            <RecommendationCard
              key={index}
              recommendation={recommendation}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <Lightbulb className="w-7 h-7 mr-2 text-yellow-500" />
          Personalized Recommendations
        </h2>
      </div>

      {/* High Priority Recommendations */}
      {renderRecommendationSection(
        'Focus Areas',
        Object.values(recommendations)
          .flat()
          .filter(rec => rec.priority === 'high')
      )}

      {/* Content Recommendations */}
      {renderRecommendationSection(
        'Learning Content',
        recommendations.content.filter(rec => rec.priority !== 'high')
      )}

      {/* Schedule Recommendations */}
      {renderRecommendationSection(
        'Study Schedule',
        recommendations.schedule.filter(rec => rec.priority !== 'high')
      )}

      {/* Practice Recommendations */}
      {renderRecommendationSection(
        'Practice Activities',
        recommendations.practice.filter(rec => rec.priority !== 'high')
      )}
    </div>
  );
}