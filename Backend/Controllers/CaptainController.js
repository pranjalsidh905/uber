const blacklistToken = require("../Models/BlacklistTokenModel");
const CaptainModel = require("../Models/CaptainModel");
const CaptainService = require("../Services/CaptainService");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const { fullname, email, password, vehicle } = req.body;
  const isCaptainAlreadyExists = await CaptainModel.findOne({ email });
  if (isCaptainAlreadyExists) {
    return res.status(400).json({ message: "Captain already exists" });
  }
  const hashPassword = await CaptainModel.hashPassword(password);
  const captain = await CaptainService.createCaptain({
    first_name: fullname.first_name,
    last_name: fullname.last_name,
    email,
    password: hashPassword,
    color: vehicle.color,
    model: vehicle.model,
    plate_number: vehicle.plate_number,
    capacity: vehicle.capacity,
    vehicle_type: vehicle.vehicle_type,
  });
  await captain.save();
  const token = captain.generateAuthToken();
  res.status(201).json({ token, captain });
};

module.exports.loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const { email, password } = req.body;
  const captain = await CaptainModel.findOne({ email }).select("+password");
  if (!captain) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }
  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }
  const token = captain.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, captain });
};

module.exports.getCaptainProfile = async (req, res) => {
  res.status(200).json(req.captain);
};

module.exports.logoutCaptain = async (req, res) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blacklistToken.create({ token });

  res.status(200).json({ message: "Logout successful" });
};
