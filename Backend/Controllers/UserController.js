const UserModel = require("../Models/UserModels");
const UserService = require("../Services/UserService");
const { validationResult } = require("express-validator");
module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ success: false, errors: errors.array() });
  }
  const { fullname, email, password } = req.body;
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
