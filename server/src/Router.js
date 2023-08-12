const rt = require("express").Router();

// ======= Router for users =======
const user = require("./Controller/user.controll");
rt.post("/signup", user.signup);
rt.post("/signin", user.signin);

module.exports = rt;
