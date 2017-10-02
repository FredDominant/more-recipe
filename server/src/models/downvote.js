export default (sequelize, DataTypes) => {
  const Downvote = sequelize.define('Downvote', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Downvote.associate = (models) => {
    // associations can be defined here
    Downvote.belongsTo(models.User, { foreignKey: 'userId' });
    Downvote.belongsTo(models.Recipe, { foreignkey: 'recipeId' });
  };

  return Downvote;
};
