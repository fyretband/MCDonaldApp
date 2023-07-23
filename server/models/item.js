'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: "authorId" })
      this.belongsTo(models.Category,{foreignKey: "categoryId"})
      Item.hasMany(models.Ingredient, {foreignKey: "itemId"})
    }
  }
  Item.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name cannot be empty"
        },
        notNull: {
          args: true,
          msg: "Name cannot be null"
        }

      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Description cannot be empty"
        },
        notNull: {
          args: true,
          msg: "Description cannot be null"
        }

      }
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Price cannot be empty"
        },
        notNull: {
          args: true,
          msg: "Price cannot be null"
        },
        min: 0

      }
    },
    imgUrl:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "ImageUrl cannot be empty"
        },
        notNull: {
          args: true,
          msg: "ImageUrl cannot be null"
        },
        min: 0

      }
    },
    authorId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};