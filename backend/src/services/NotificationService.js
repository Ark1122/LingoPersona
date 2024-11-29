const { User, Notification } = require('../models');

class NotificationService {
  static async createNotification(userId, type, data) {
    return await Notification.create({
      user_id: userId,
      type,
      data,
      read: false
    });
  }

  static async sendStudyReminder(userId) {
    const user = await User.findByPk(userId, {
      include: ['preferences']
    });

    if (!user?.preferences?.notifications?.study_reminder) {
      return null;
    }

    const now = new Date();
    const preferredTime = new Date(user.preferences.preferred_study_time);
    
    if (now.getHours() === preferredTime.getHours()) {
      return await this.createNotification(userId, 'STUDY_REMINDER', {
        message: 'Time for your daily language practice!',
        study_time: user.preferences.daily_goals.study_time
      });
    }
  }

  static async sendProgressUpdate(userId) {
    const user = await User.findByPk(userId, {
      include: ['preferences', 'learningStats']
    });

    if (!user?.preferences?.notifications?.progress_updates) {
      return null;
    }

    const stats = user.learningStats;
    
    return await this.createNotification(userId, 'PROGRESS_UPDATE', {
      message: 'Here\'s your weekly progress report',
      stats: {
        current_streak: stats.current_streak,
        words_learned: stats.words_learned,
        total_study_time: stats.total_study_time
      }
    });
  }

  static async sendAchievementAlert(userId, achievement) {
    const user = await User.findByPk(userId, {
      include: ['preferences']
    });

    if (!user?.preferences?.notifications?.achievement_alerts) {
      return null;
    }

    return await this.createNotification(userId, 'ACHIEVEMENT', {
      message: `Congratulations! You've earned a new achievement!`,
      achievement: {
        title: achievement.title,
        description: achievement.description,
        icon: achievement.icon
      }
    });
  }

  static async sendNewContentNotification(userId, content) {
    const user = await User.findByPk(userId, {
      include: ['preferences']
    });

    if (!user?.preferences?.notifications?.new_content) {
      return null;
    }

    return await this.createNotification(userId, 'NEW_CONTENT', {
      message: 'New learning content is available!',
      content: {
        title: content.title,
        type: content.type,
        description: content.description
      }
    });
  }

  static async markAsRead(notificationId, userId) {
    const notification = await Notification.findOne({
      where: {
        id: notificationId,
        user_id: userId
      }
    });

    if (notification) {
      notification.read = true;
      await notification.save();
    }

    return notification;
  }

  static async getUnreadNotifications(userId) {
    return await Notification.findAll({
      where: {
        user_id: userId,
        read: false
      },
      order: [['created_at', 'DESC']]
    });
  }

  static async cleanupOldNotifications() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    await Notification.destroy({
      where: {
        created_at: {
          [Op.lt]: thirtyDaysAgo
        },
        read: true
      }
    });
  }
}