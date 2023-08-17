const db = require("../mongodb.config");
const tokenService = require("../Service/token.service");

class user {
  async signup(req, res) {
    try {
      const newUser = await req.body;
      newUser.lastActive = new Date();
      await db.collection("user").insertOne(newUser);

      res.status(200).json({
        message: "User created successfully",
        variant: "success",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
        variant: "error",
      });
    }
  }

  async signin(req, res) {
    try {
      const { phone, password } = await req.body;
      const user = await db.collection("user").findOne({ phone, password });
      const token = await tokenService.generateToken(user);

      if (!user) {
        return res.status(404).json({
          message: "Can not find user",
          variant: "warning",
        });
      }

      res.status(200).json({
        message: "Welcome to your account",
        variant: "success",
        user,
        token,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
        variant: "error",
      });
    }
  }

  async getAll(req, res) {
    try {
      const users = await db.collection("user").find().toArray();

      res.status(200).json({
        message: "Get all users successfully",
        variant: "success",
        amount: users.length,
        users,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
        variant: "error",
      });
    }
  }
}

module.exports = new user();
