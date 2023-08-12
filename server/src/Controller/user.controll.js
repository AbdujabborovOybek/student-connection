const db = require("../mongodb.config");

class user {
  async signup(req, res) {
    try {
      const newUser = await req.body;
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

  // { : '+998 95 027 0496', : 'admin' }
  async signin(req, res) {
    try {
      const { phone, password } = await req.body;
      const user = await db.collection("user").findOne({ phone, password });

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
