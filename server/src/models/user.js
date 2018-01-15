export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    notify: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    picture: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: 'https://d13yacurqjgara.cloudfront.net/users/583390/screenshots/2517460/sob_avatar_illustration__800x600px__1.0_1x.jpg'
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Recipe, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasMany(models.Review, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasMany(models.Upvote, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasMany(models.Downvote, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };
  return User;
};
