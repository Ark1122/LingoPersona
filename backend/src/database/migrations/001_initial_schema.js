module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Users table
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      preferred_language: {
        type: Sequelize.STRING,
        defaultValue: 'en'
      },
      level: {
        type: Sequelize.ENUM('beginner', 'intermediate', 'advanced'),
        defaultValue: 'beginner'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      }
    });

    // Tutors table
    await queryInterface.createTable('tutors', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      personality: {
        type: Sequelize.ENUM('friendly', 'strict', 'patient', 'humorous'),
        defaultValue: 'friendly'
      },
      teaching_style: {
        type: Sequelize.ENUM('conversational', 'structured', 'immersive'),
        defaultValue: 'conversational'
      },
      language: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      }
    });

    // Learning sessions table
    await queryInterface.createTable('learning_sessions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      tutor_id: {
        type: Sequelize.UUID,
        references: {
          model: 'tutors',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      topic: {
        type: Sequelize.STRING
      },
      start_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_time: {
        type: Sequelize.DATE
      },
      duration_minutes: {
        type: Sequelize.INTEGER
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('learning_sessions');
    await queryInterface.dropTable('tutors');
    await queryInterface.dropTable('users');
  }
};