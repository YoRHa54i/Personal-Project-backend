module.exports = (sequelize, Datatype) => {
  const CartDetail = sequelize.define('cartdetail', {
    cartDetail_id: {
      type: Datatype.UUID,
      defaultValue: Datatype.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    detail: {
      type: Datatype.INTEGER,
      allowNull: false
    },
    price: {
      type: Datatype.INTEGER,
      allowNull: false
    },
    payment: {
      type: Datatype.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  })

  CartDetail.assocate = (models) => {
    CartDetail.belongsTo(models.user, {
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    })
    CartDetail.belongsTo(models.product, {
      foreignKey: {
        name: 'product_id',
        allowNull: false
      }
    })
  }

  return CartDetail
}