
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Recipes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ingredients: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    directions: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    views: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    favourites: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    upvote: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    downvote: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    picture: {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: 'images/default-food-image.jpg'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Recipes')
};
