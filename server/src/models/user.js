export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
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
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '/images/user_avatar.png'
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
