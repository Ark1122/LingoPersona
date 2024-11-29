const { Vocabulary, User } = require('../models');
const { Op } = require('sequelize');

class VocabularyController {
  async getUserVocabulary(req, res) {
    try {
      const vocabulary = await Vocabulary.findAll({
        where: { user_id: req.user.id },
        order: [['last_reviewed', 'DESC']]
      });

      res.json(vocabulary);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addWord(req, res) {
    try {
      const { term, translation, context, notes } = req.body;
      
      // Check for duplicates
      const existingWord = await Vocabulary.findOne({
        where: {
          user_id: req.user.id,
          term: term.toLowerCase()
        }
      });

      if (existingWord) {
        return res.status(400).json({ error: 'Word already exists in your vocabulary' });
      }

      const word = await Vocabulary.create({
        user_id: req.user.id,
        term: term.toLowerCase(),
        translation,
        context,
        notes
      });

      res.status(201).json(word);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateWord(req, res) {
    try {
      const { wordId } = req.params;
      const word = await Vocabulary.findOne({
        where: {
          id: wordId,
          user_id: req.user.id
        }
      });

      if (!word) {
        return res.status(404).json({ error: 'Word not found' });
      }

      await word.update(req.body);
      res.json(word);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteWord(req, res) {
    try {
      const { wordId } = req.params;
      const result = await Vocabulary.destroy({
        where: {
          id: wordId,
          user_id: req.user.id
        }
      });

      if (!result) {
        return res.status(404).json({ error: 'Word not found' });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async recordReview(req, res) {
    try {
      const { wordId } = req.params;
      const { isCorrect } = req.body;

      const word = await Vocabulary.findOne({
        where: {
          id: wordId,
          user_id: req.user.id
        }
      });

      if (!word) {
        return res.status(404).json({ error: 'Word not found' });
      }

      // Update review statistics
      const updates = {
        last_reviewed: new Date(),
        review_count: word.review_count + 1,
        correct_count: word.correct_count + (isCorrect ? 1 : 0),
        incorrect_count: word.incorrect_count + (isCorrect ? 0 : 1)
      };

      // Update mastery level based on performance
      const correctRate = (updates.correct_count / (updates.review_count)) * 100;
      if (correctRate >= 90 && updates.review_count >= 5) {
        updates.mastery = 'mastered';
      } else if (correctRate >= 70 && updates.review_count >= 3) {
        updates.mastery = 'familiar';
      }

      await word.update(updates);
      res.json(word);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPracticeSet(req, res) {
    try {
      const { mastery, limit = 10 } = req.query;
      
      // Base query conditions
      const whereConditions = { user_id: req.user.id };
      
      // Add mastery filter if specified
      if (mastery) {
        whereConditions.mastery = mastery;
      }

      // Get words that haven't been reviewed recently first
      const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
      
      const words = await Vocabulary.findAll({
        where: {
          ...whereConditions,
          [Op.or]: [
            { last_reviewed: { [Op.lt]: sixHoursAgo } },
            { last_reviewed: null }
          ]
        },
        order: [
          ['last_reviewed', 'ASC'],
          [sequelize.fn('RANDOM')]
        ],
        limit: parseInt(limit)
      });

      res.json(words);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new VocabularyController();