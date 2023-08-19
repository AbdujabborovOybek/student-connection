const rt = require("express").Router();

// ======= Router for users =======
const user = require("./Controller/user.controll");
const uv = require("./Validation/user.validation");
rt.post("/signup", [uv.signup], user.signup);
rt.post("/signin", user.signin);
rt.get("/get/user", user.getAll);
rt.delete("/delete/user", user.delete);

// ======= Router for chat =======
const chat = require("./Controller/chat.controll");
rt.get("/get/chat/:id", chat.getMessages);
rt.post("/send/message", chat.sendMessage);

module.exports = rt;
