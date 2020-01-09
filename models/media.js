module.exports = (sequelize, Datatype) => {
  const media = sequelize.define('media', {
    media_id: {
      type: Datatype.UUID,
      defaultValue: Datatype.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    photo:{
      type: Datatype.STRING
    },
    media_url_1: {
      type: Datatype.STRING,
      // allowNull: false
    },
    media_url_2: {
      type: Datatype.STRING,
      // allowNull: true
    },
    media_url_3: {
      type: Datatype.STRING,
      // allowNull: true
    },
  }, {
    freezeTableName: true,
    timestamps: false
  })

  media.associate = (models) => {
    media.hasOne(models.product, {
      foreignKey: {
        name: 'media_id',
        allowNull: false
      }
    })
  }
  return media
}

