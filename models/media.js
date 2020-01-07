module.exports = (sequelize, Datatype) => {
  const media = sequelize.define('media', {
    name: {
      type: Datatype.STRING(255)
    }
  })

  media.associate = (models) => {

  }
  return media
}

