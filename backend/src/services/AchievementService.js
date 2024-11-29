const { Achievement, User } = require('../models');

class AchievementService {
  static async checkAndAwardAchievements(userId) {
    const user = await User.findByPk(userId, {
      include: [
        'learningStats',
        'achievements'
      ]
    });

    if (!user) {
      throw new Error('User not found');
    }

    const newAchievements = [];

    // Check streak achievements
    if (user.learningStats.currentStreak >= 7 && 
        !this.hasAchievement(user, 'WEEK_STREAK')) {
      newAchievements.push({
        user_id: userId,
        title: 'Week Warrior',
        description: 'Maintained a 7-day learning streak!',
        icon: '🔥',
        category: 'streak',
        criteria: { streakDays: 7 }
      });
    }

    // Check vocabulary achievements
    if (user.learningStats.wordsLearned >= 100 &&
        !this.hasAchievement(user, 'VOCAB_MASTER')) {
      newAchievements.push({
        user_id: userId,
        title: 'Vocabulary Master',
        description: 'Learned 100 new words!',
        icon: '📖',
        category: 'vocabulary',
        criteria: { wordsLearned: 100 }
      });
    }

    // Create new achievements
    if (newAchievements.length > 0) {
      await Achievement.bulkCreate(newAchievements);
    }

    return newAchievements;
  }

  static hasAchievement(user, achievementId) {
    return user.achievements.some(a => a.id === achievementId);
  }
}

module.exports = AchievementService;