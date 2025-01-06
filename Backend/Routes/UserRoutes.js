const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const UserController = require("../Controllers/UserController");

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
  ],
  UserController.registerUser
);
module.exports = router;
