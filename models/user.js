module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING(255)
    },
    password: {
      type: DataTypes.STRING(255)
    },
    name: {
      type: DataTypes.STRING(100)
    },
    profile_img_url: {
      type: DataTypes.STRING(500)
    },
    role: {
      type: DataTypes.ENUM("admin", "user")
    }
  })

  user.associate = (models) => {
    
  }
  return user
}













