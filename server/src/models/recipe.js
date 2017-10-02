
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
    ingredients: {
      type: DataTypes.STRING,
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
    upvote: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    downvote: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  });
  Recipe.associate = (models) => {
    // associations can be defined here
    Recipe.belongsTo(models.User, { foreignKey: 'userId' });
    Recipe.hasmany(models.Review, { foreignKey: 'recipeId' });
    Recipe.hasMany(models.Upvote, { foreignKey: 'recipeId' });
    Recipe.hasMany(models.Downvote, { foreignKey: 'recipeId' });
  };
  return Recipe;
};
