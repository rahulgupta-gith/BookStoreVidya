const express = require("express");
const router = express.Router();

const {isAdmin} = require("../middleware/role.middleware");
const {
  getDashboard,
  verifyVendor,
  toggleBlockVendor
} = require("../controllers/admin.controller");

// Admin Dashboard
router.get("/dashboard", isAdmin, getDashboard);

// Verify Vendor
router.post("/vendor/verify/:id", isAdmin, verifyVendor);

// Block / Unblock Vendor
router.post("/vendor/block/:id", isAdmin, toggleBlockVendor);

module.exports = router;
