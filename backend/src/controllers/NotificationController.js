const NotificationService = require('../services/NotificationService');

class NotificationController {
  async getNotifications(req, res) {
    try {
      const notifications = await NotificationService.getUnreadNotifications(req.user.id);
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async markAsRead(req, res) {
    try {
      const { notificationId } = req.params;
      const notification = await NotificationService.markAsRead(notificationId, req.user.id);
      
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }

      res.json(notification);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updatePreferences(req, res) {
    try {
      const { notifications } = req.body;
      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.preferences.notifications = {
        ...user.preferences.notifications,
        ...notifications
      };

      await user.save();
      res.json(user.preferences.notifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new NotificationController();