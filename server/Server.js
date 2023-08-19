const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const router = require("./src/Router");
const auth = require("./src/Middleware/Auth");
const user = require("./src/Controller/user.controll");

app.use(express.json());
app.use(cors());
app.use(auth);
app.use(user.lastActive);
app.use(router);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
