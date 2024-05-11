const express = require("express");
require("./Database/connect");
require("dotenv").config();
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");

const userRouter = require("./Routers/User");
const productRouter = require("./Routers/Product");

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.options("*", cors());
app.use("/user", userRouter);
app.use("/product", productRouter);
app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
