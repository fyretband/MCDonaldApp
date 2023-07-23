'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Category,{
        through: models.Item,
        foreignKey: "authorId",
        otherKey: "categoryId"
      })
      User.hasMany(models.Item, {foreignKey: "authorId"})
    }
  }
  User.init({
    username: {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email cannot be empty"
        },
        notNull: {
          args: true,
          msg: "Email cannot be null"
        },
        isEmail: {
          args: true,
          msg: "Email must be in @example.com format"
        },
        

      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password cannot be empty"
        },
        notNull: {
          args: true,
          msg: "Password cannot be null"
        },
        checklength(value){
          if(value.length < 5){
            throw new Error('Password length minimum is 5 chars')
          }
        }

      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(instance, options){
        console.log(instance, "beforecreate")
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(instance.password, salt)

        instance.password = hash
      }
    }
  });
  return User;
};