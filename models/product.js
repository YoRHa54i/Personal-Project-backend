module.exports = (sequelize, Datatype) => {
  const Product = sequelize.define(
    "product",
    {
      product_id: {
        type: Datatype.UUID,
        defaultValue: Datatype.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      product_name: {
        type: Datatype.STRING,
        allowNull: false
      },
      price: {
        type: Datatype.INTEGER,
        allowNull: false
      },
      detail: {
        type: Datatype.TEXT,
        allowNull: true
      },
      category: {
        type: Datatype.STRING,
        allowNull: false
      }
    }, {
    freezeTableName: true
  }
  )

  Product.associate = models => {
    Product.hasOne(models.cartdetail, {
      foreignKey: {
        name: "product_id",
        allowNull: false
      }
    });
    Product.belongsTo(models.media, {
      foreignKey: {
        name: "media_id",
        allowNull: false
      }
    })
  }

  return Product
}