const jwt = require("jsonwebtoken");
const User = require("../Models/User");
require("dotenv").config();

const Auth = async (req, res, next) => {
  try {
    //! Get token form user
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.send("Authorization failed. No token found.");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.send("Authorization failed. Not verified.");
    }
    const user = await User.findOne({ _id: decoded.userID });
    if (!user) {
      return console.log("Authorization failed. No user found.");
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({ error: "Authorization failed. Server error." });
  }
};
module.exports = Auth;
