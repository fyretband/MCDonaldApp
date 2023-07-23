const { verifyToken } = require("../helper/jwt");

const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
  

    if (!access_token) {
      throw { name: "Unauthenticated" };
    }
    const payload = verifyToken(access_token);
   
    let user = {};
    user = await User.findOne({ where: { id: payload.id } });

    if (!user) {
      throw { name: "Unauthenticated" };
    }

    req.additionalData = {
      userId: user.id,
      username: user.username,
      role: user.role,
    };

    next();
  } catch (err) {
    next(err);
  }
}
module.exports = authentication;
