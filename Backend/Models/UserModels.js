const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullname: {
    first_name: {
      type: String,
      required: true,
      minlength: [3, "First Name must be at least 3 characters long"],
      max_length: [50, "First Name cannot be more than 50 characters long"],
    },
    last_name: {
      type: String,
      minlength: [3, "Last Name must be at least 3 characters long"],
      max_length: [50, "Last Name cannot be more than 50 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // match: [
    //   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0 -9.-]+\.[a-zA-Z]{2,}$/,
    //   "Please fill a valid email address",
    // ],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketID: {
    type: String,
  },
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this._password);
};
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
