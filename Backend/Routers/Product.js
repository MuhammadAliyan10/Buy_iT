const express = require("express");
const Auth = require("../MiddleWare/Auth");
const Product = require("../Models/Product");
const User = require("../Models/User");
const router = express.Router();
require("dotenv").config();

router.post("/postProduct", Auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(401).json({ message: "Not authorized." });
  }

  const {
    name,
    description,
    price,
    type,
    images,
    payment,
    deliveryDate,
    review,
  } = req.body;
  try {
    const newProduct = new Product({
      name: name,
      description: description,
      price: price,
      type: type,
      images: images,
      payment: payment,
      deliveryDate: deliveryDate,
      review: review,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
