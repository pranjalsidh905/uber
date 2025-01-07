const BlacklistTokenModel = require("../Models/BlacklistTokenModel");
const CaptainModel = require("../Models/CaptainModel");
const UserModel = require("../Models/UserModels");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const isBlacklisted = await BlacklistTokenModel.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("decoded", decoded);
    // console.log("token", token);
    const user = await UserModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // console.log("userid", decoded._id);
    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const isBlacklisted = await BlacklistTokenModel.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const captain = await CaptainModel.findById(decoded._id);
    if (!captain) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.captain = captain;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}