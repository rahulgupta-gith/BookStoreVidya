const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try{
     const { name, email, mobile, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    mobile,
    password: hashed,
    role,
    isApproved: role === "vendor" ? false : true
  });

   res.redirect("/auth/login");
  }catch(error){
    console.log(error);
    res.redirect("/auth/register");
  }
 
};

exports.login = async (req, res) => {
  try{
const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.send("Invalid Credentials");
   const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000
  });

if (user.role === "vendor" && !user.isVerified) {
    return res.render("auth/pending-approval", { user: user });
}
if(user.role === "vendor" && user.isBlocked){
  return res.render("auth/pending-approval", {user:user});
}
  res.redirect("/books");
  }catch(error){
    console.log(error);
    res.redirect("/auth/login");
  }
  
};
