require("dotenv").config();
const express = require("express");
const { attachUser } = require("./middleware/auth.middleware");
const methodOverride = require("method-override");
const connectDB = require("./config/db");
const app = express();
connectDB();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(attachUser);
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = process.env.PORT
const adminRoutes = require("./routes/admin.route");
const authRoutes = require("./routes/auth.route");
const bookRoutes = require("./routes/book.route");

app.get("/", (req, res) => {
  res.render("landing");
});

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/books", bookRoutes);

app.listen(PORT, () => console.log("Server running on 3000"));
