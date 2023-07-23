const { generateToken } = require("../helper/jwt");
const { User } = require("../models");
const bcrypt = require("bcrypt");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      const user = await User.create({
        username,
        email,
        password,
        role: "admin",
        phoneNumber,
        address,
      });

      if (!user) {
        throw { name: "SequelizeValidationError" };
      }
      if (user) {
        res.status(201).json({
          statusCode: 201,
          message: "User created successfully",
          data: {
            id: user.id,
            email: user.email,
          },
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw { name: "LoginError", message: "Invalid email or password" };
      }

      const isValidPassword = bcrypt.compareSync(password, user.password);

      if (isValidPassword) {
        const token = generateToken({
          id: user.id,
          email: user.email,
          password: user.password,
        });

        res.status(200).json({
          statusCode: 200,
          message: "Login successful",
          token: token,
          username: user.username,
        });
      } else {
        throw { name: "LoginError", message: "Invalid email or password" };
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
