const User = require("../models/User");

exports.getDashboard = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).sort({ createdAt: -1 });
    const vendors = await User.find({ role: "vendor" }).sort({ createdAt: -1 });

    res.render("admin/dashboard", {
      users,
      vendors
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};


exports.verifyVendor = async (req, res) => {
  try {
    const vendor = await User.findById(req.params.id);
    if (!vendor || vendor.role !== "vendor") {
      return res.redirect("/admin/dashboard");
    }

    vendor.isVerified = true;
    await vendor.save();

    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error(err);
    res.redirect("/admin/dashboard");
  }
};


exports.toggleBlockVendor = async (req, res) => {
  try {
    const vendor = await User.findById(req.params.id);

    if (!vendor || vendor.role !== "vendor") {
      return res.redirect("/admin/dashboard");
    }

    vendor.isBlocked = !vendor.isBlocked;
    await vendor.save();

    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error(err);
    res.redirect("/admin/dashboard");
  }
};
