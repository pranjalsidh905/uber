const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const CaptainController = require("../Controllers/CaptainController");
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.first_name")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate_number")
      .isLength({ min: 3 })
      .withMessage("Plate Number must be at least 3 characters long"),
    body("vehicle.model")
      .isLength({ min: 3 })
      .withMessage("Model must be at least 3 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),
    body("vehicle.vehicle_type")
      .isIn(["car", "auto", "motorcycle"])
      .withMessage("Vehicle type must be either car, truck, or motorcycle"),
  ],
  CaptainController.registerCaptain
);
module.exports = router;
