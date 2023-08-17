const secret = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

class tokenService {
  static async generateToken(user) {
    return jwt.sign(user, secret);
  }

  static async verifyToken(token) {
    return jwt.verify(token, secret);
  }
}

module.exports = tokenService;
