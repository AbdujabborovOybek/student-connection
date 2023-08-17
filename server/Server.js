const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const router = require("./src/Router");
const auth = require("./src/Middleware/Auth");

app.use(express.json());
app.use(cors());
app.use(auth);
app.use(router);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
