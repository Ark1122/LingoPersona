const { LearningSession, User, Tutor } = require('../models');

class SessionController {
  async create(req, res) {
    try {
      const { tutor_id, topic } = req.body;
      const user_id = req.user.id;

      const session = await LearningSession.create({
        user_id,
        tutor_id,
        topic,
        start_time: new Date()
      });

      return res.status(201).json(session);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async end(req, res) {
    try {
      const { session_id } = req.params;
      const session = await LearningSession.findByPk(session_id);

      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }

      if (session.user_id !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      const end_time = new Date();
      const duration_minutes = Math.round(
        (end_time - new Date(session.start_time)) / 1000 / 60
      );

      await session.update({
        end_time,
        duration_minutes
      });

      return res.json(session);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getUserStats(req, res) {
    try {
      const user_id = req.user.id;

      const stats = await LearningSession.findAll({
        where: { user_id },
        attributes: [
          [sequelize.fn('sum', sequelize.col('duration_minutes')), 'total_minutes'],
          [sequelize.fn('count', sequelize.col('id')), 'total_sessions']
        ]
      });

      return res.json(stats[0]);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new SessionController();