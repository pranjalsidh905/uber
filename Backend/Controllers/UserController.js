const UserModel = require("../Models/UserModels");
const UserService = require("../Services/UserService");
const { validationResult } = require("express-validator");
const blacklistToken = require("../Models/BlacklistTokenModel");

module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ success: false, errors: errors.array() });
  }
  const { fullname, email, password } = req.body;
  const isUserAlreadyExists = await UserModel.findOne({ email: email });
  if (isUserAlreadyExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashPassword = await UserModel.hashPassword(password);
  const user = await UserService.createUser({
    first_name: fullname.first_name,
    last_name: fullname.last_name,
    email: email,
    password: hashPassword,
  });
  const token = user.generateAuthToken();
  res.status(201).json({ token, user });
};

module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const { email, password } = req.body;
  // console.log("users", email, password);
  const user = await UserModel.findOne({ email }).select("+password");
  // console.log("users", user || "no user found");
  // console.log("user", user.password);
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }
  const isMatch = await user.comparePassword(password);
  // console.log("isMatch", isMatch);
  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or pass" });
  }
  const token = user.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, user });
};

module.exports.getUserProfile = async (req, res) => {
  // const user = await UserModel.findById(req.user._id);
  res.status(200).json(req.user);
  // console.log("userreq", req.user);
};

module.exports.logoutUser = async (req, res) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blacklistToken.create({ token });
  res.status(200).json({ message: "Logout successfully" });
};
