const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const UserController = require("../Controllers/UserController");
// const AuthMiddleware = require("../Middlewares/AuthMiddleware");
// const { authUser } = require("../Middlewares/AuthMiddleware");
const AuthMiddleware = require("../Middlewares/AuthMiddleware");

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

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  UserController.loginUser
);

router.get("/profile", AuthMiddleware.authUser, UserController.getUserProfile);
router.get("/logout", AuthMiddleware.authUser, UserController.logoutUser);

module.exports = router;
