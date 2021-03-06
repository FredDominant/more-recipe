
export default (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    directions: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    favourites: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    upvote: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    downvote: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    picture: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '/images/default-food-image.jpg'
    }
  });
  Recipe.associate = (models) => {
    // associations can be defined here
    Recipe.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Recipe.hasMany(models.Review, { foreignKey: 'recipeId' });
    Recipe.hasMany(models.Upvote, { foreignKey: 'recipeId' });
    Recipe.hasMany(models.Downvote, { foreignKey: 'recipeId' });
    Recipe.hasMany(models.Favourite, { foreignKey: 'recipeId', onDelete: 'CASCADE' });
  };
  return Recipe;
};
