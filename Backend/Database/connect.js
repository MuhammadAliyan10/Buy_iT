const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/UrbanMarket")
  .then(() => {
    console.log("Connection to the database is successful");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
