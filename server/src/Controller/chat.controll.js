const db = require("../mongodb.config");
const { ObjectId } = require("mongodb");
const uc = db.collection("user");
const ch = db.collection("chat");

class chatController {
  async sendMessage(req, res) {
    try {
      const from = await req?.user?._id;
      const data = await req.body;
      data.createdAt = new Date();
      data.updatedAt = null;
      data.from = from;
      await ch.insertOne(data);

      res.status(200).json({
        messages: "Xabar yuborildi",
        variant: "succsess",
      });
    } catch (err) {
      res.status(500).json({
        message: "Something went wrong",
        variant: "error",
      });
    }
  }

  async getMessages(req, res) {
    try {
      const userID = await req?.params?.id;
      const from = await req?.user?._id;
      const user = await uc.findOne({ _id: new ObjectId(userID) });
      const chat = await ch.find({ from: from, to: userID }).toArray();

      res.status(200).json({
        user,
        messages: chat,
      });
    } catch (err) {
      res.status(500).json({
        message: "Something went wrong",
        variant: "error",
      });
    }
  }
}

module.exports = new chatController();
