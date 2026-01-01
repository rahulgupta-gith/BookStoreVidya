exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.send("Access Denied");
  next();
};
