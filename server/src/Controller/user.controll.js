const db = require("../mongodb.config");
const tokenService = require("../Service/token.service");
const { ObjectId } = require("mongodb");
const userCollection = db.collection("user");
const cripto = require("crypto");

class user {
  async signup(req, res) {
    try {
      const newUser = await req.body;
      newUser.lastActive = new Date();
      // create hash password with cripto
      newUser.password = cripto
        .createHash("sha256")
        .update(newUser.password)
        .digest("hex");

      try {
        await userCollection.createIndex({ username: 1 }, { unique: true });
      } catch (err) {
        console.log(err);
        res.status(401).json({
          message: "Username already exists",
          variant: "warning",
        });
        return;
      }

      try {
        await userCollection.createIndex({ phone: 1 }, { unique: true });
      } catch {
        res.status(401).json({
          message: "Phone number already exists",
          variant: "warning",
        });

        return;
      }

      await userCollection.insertOne(newUser);
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
      const hash = cripto.createHash("sha256").update(password).digest("hex");
      const user = await db
        .collection("user")
        .findOne({ phone, password: hash });
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

  async delete(req, res) {
    try {
      const id = (await req?.user?._id) || null;

      if (!id) {
        return res.status(401).json({
          message: "Unauthorized",
          variant: "warning",
        });
      }

      await userCollection.deleteOne({ _id: new ObjectId(id) });

      res.status(200).json({
        message: "Your account has been deleted successfully",
        variant: "info",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
        variant: "error",
      });
    }
  }

  async lastActive(req, res, next) {
    try {
      const id = req.user._id;
      const now = new Date();
      const option = [{ _id: new ObjectId(id) }, { $set: { lastActive: now } }];
      await userCollection.updateOne(...option);
      next();
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
        variant: "error",
      });
    }
  }
}

module.exports = new user();
