const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Nigooda AI Server Running");
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`AI Server running on port ${PORT}`);
});