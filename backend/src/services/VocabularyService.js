const { Vocabulary } = require('../models');
const { Op } = require('sequelize');

class VocabularyService {
  static async getRecommendedWords(userId) {
    // Get words that need review based on spaced repetition
    const words = await Vocabulary.findAll({
      where: {
        user_id: userId,
        mastery: { [Op.ne]: 'mastered' },
        [Op.or]: [
          { last_reviewed: null },
          {
            last_reviewed: {
              [Op.lt]: this.getReviewDue()
            }
          }
        ]
      },
      order: [
        ['last_reviewed', 'ASC'],
        ['mastery', 'ASC']
      ],
      limit: 20
    });

    return words;
  }

  static getReviewDue() {
    const now = new Date();
    const reviewIntervals = {
      learning: 4, // hours
      familiar: 24, // hours
      mastered: 72 // hours
    };

    return new Date(now - reviewIntervals.learning * 60 * 60 * 1000);
  }

  static async getVocabularyStats(userId) {
    const stats = await Vocabulary.findAll({
      where: { user_id: userId },
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('*')), 'total'],
        [sequelize.fn('COUNT', sequelize.literal("CASE WHEN mastery = 'mastered' THEN 1 END")), 'mastered'],
        [sequelize.fn('COUNT', sequelize.literal("CASE WHEN mastery = 'familiar' THEN 1 END")), 'familiar'],
        [sequelize.fn('COUNT', sequelize.literal("CASE WHEN mastery = 'learning' THEN 1 END")), 'learning'],
      ],
      raw: true
    });

    return stats[0];
  }
}

module.exports = VocabularyService;