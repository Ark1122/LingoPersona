const { LearningStats, LearningSession, User } = require('../models');
const { Op } = require('sequelize');

class AnalyticsService {
  static async getUserInsights(userId) {
    const user = await User.findByPk(userId, {
      include: ['learningStats', 'achievements']
    });

    if (!user) {
      throw new Error('User not found');
    }

    const weeklyProgress = await this.getWeeklyProgress(userId);
    const strengthAreas = await this.analyzeStrengthAreas(userId);
    const learningPatterns = await this.analyzeLearningPatterns(userId);
    const recommendedActivities = await this.generateRecommendations(userId);

    return {
      weeklyProgress,
      strengthAreas,
      learningPatterns,
      recommendedActivities,
      achievements: user.achievements,
      stats: user.learningStats
    };
  }

  static async analyzeStrengthAreas(userId) {
    const sessions = await LearningSession.findAll({
      where: { user_id: userId },
      order: [['created_at', 'DESC']],
      limit: 50
    });

    const skillScores = {
      grammar: [],
      vocabulary: [],
      pronunciation: [],
      comprehension: []
    };

    sessions.forEach(session => {
      if (session.performance_metrics) {
        Object.entries(session.performance_metrics).forEach(([skill, score]) => {
          if (skillScores[skill]) {
            skillScores[skill].push(score);
          }
        });
      }
    });

    // Calculate average scores for each skill
    const strengthAreas = {};
    Object.entries(skillScores).forEach(([skill, scores]) => {
      if (scores.length > 0) {
        const average = scores.reduce((a, b) => a + b) / scores.length;
        strengthAreas[skill] = parseFloat(average.toFixed(2));
      } else {
        strengthAreas[skill] = 0;
      }
    });

    return strengthAreas;
  }

  static async analyzeLearningPatterns(userId) {
    const sessions = await LearningSession.findAll({
      where: { user_id: userId },
      attributes: [
        'start_time',
        'duration_minutes',
        'performance_metrics'
      ],
      order: [['start_time', 'ASC']]
    });

    // Analyze study time patterns
    const timePatterns = sessions.reduce((acc, session) => {
      const hour = new Date(session.start_time).getHours();
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {});

    // Find peak study hours
    const peakHours = Object.entries(timePatterns)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([hour]) => parseInt(hour));

    // Analyze session duration patterns
    const durations = sessions.map(s => s.duration_minutes);
    const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;

    return {
      peakStudyHours: peakHours,
      averageSessionDuration: Math.round(avgDuration),
      consistencyScore: this.calculateConsistencyScore(sessions),
      timePatterns
    };
  }

  static calculateConsistencyScore(sessions) {
    if (sessions.length < 2) return 0;

    const daysBetweenSessions = [];
    for (let i = 1; i < sessions.length; i++) {
      const dayDiff = Math.abs(
        (new Date(sessions[i].start_time) - new Date(sessions[i-1].start_time)) 
        / (1000 * 60 * 60 * 24)
      );
      daysBetweenSessions.push(dayDiff);
    }

    const avgDaysBetween = daysBetweenSessions.reduce((a, b) => a + b) / daysBetweenSessions.length;
    const consistency = Math.max(0, 1 - (avgDaysBetween / 7));
    return parseFloat(consistency.toFixed(2));
  }

  static async generateRecommendations(userId) {
    const strengthAreas = await this.analyzeStrengthAreas(userId);
    const patterns = await this.analyzeLearningPatterns(userId);

    // Find weakest areas
    const weakestSkills = Object.entries(strengthAreas)
      .sort(([,a], [,b]) => a - b)
      .slice(0, 2)
      .map(([skill]) => skill);

    const recommendations = {
      focus_areas: weakestSkills,
      suggested_schedule: {
        optimal_time: patterns.peakStudyHours[0],
        session_duration: patterns.averageSessionDuration
      },
      exercises: this.getRecommendedExercises(weakestSkills),
      next_goals: this.generateNextGoals(strengthAreas)
    };

    return recommendations;
  }

  static getRecommendedExercises(weakSkills) {
    const exerciseMap = {
      grammar: ['sentence-building', 'error-correction', 'fill-in-blanks'],
      vocabulary: ['flashcards', 'word-association', 'context-usage'],
      pronunciation: ['speaking-drills', 'minimal-pairs', 'rhythm-practice'],
      comprehension: ['listening-exercises', 'reading-comprehension', 'dialogue-practice']
    };

    return weakSkills.flatMap(skill => exerciseMap[skill] || []);
  }

  static generateNextGoals(strengthAreas) {
    return Object.entries(strengthAreas).map(([skill, level]) => ({
      skill,
      current_level: level,
      next_milestone: Math.ceil(level * 10) / 10 + 0.1,
      estimated_sessions: Math.ceil((1 - level) * 10)
    }));
  }
}