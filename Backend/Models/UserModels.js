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

// Hash the password before saving the user
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// Compare input password with hashed password in the database
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!candidatePassword || !this.password) {
    throw new Error("Password is missing or undefined");
  }
  return bcrypt.compare(candidatePassword, this.password);
};
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
