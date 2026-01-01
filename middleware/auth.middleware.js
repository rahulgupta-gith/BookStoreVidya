const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.redirect("/auth/login");

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "MYSECRET");
    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    res.redirect("/auth/login");
  }
};

exports.attachUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "MYSECRET");
    const user = await User.findById(decoded.id).select("-password");

    req.user = user;
    res.locals.user = user; 

    next();
  } catch (err) {
    req.user = null;
    next();
  }
};
