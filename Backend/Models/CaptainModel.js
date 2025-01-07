const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
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
    //   "Please fill out this field with a valid email address"
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
  status: {
    type: String,
    enum: ["online", "offline"],
    default: "offline",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be at least 3 characters long"],
      max_length: [50, "Color cannot be more than 50 characters long"],
    },
    plate_number: {
      type: String,
      required: true,
      minlength: [3, "Plate Number must be at least 3 characters long"],
      max_length: [50, "Plate Number cannot be more than 50 characters long"],
    },
    model: {
      type: String,
      required: true,
      minlength: [3, "Model must be at least 3 characters long"],
      max_length: [50, "Model cannot be more than 50 characters long"],
    },

    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
      max: [50, "Capacity cannot be more than50"],
    },
    vehicle_type: {
      type: String,
      enum: ["car", "motorcycle", "auto"],
      required: true,
    },
  },

//   location: {
//     latitude: {
//       type: Number,
//       required: true,
//     },
//     longitude: {
//       type: Number,
//       required: true,
//     },
//   },
});
captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
};

// // Hash the password before saving the user
// captainSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });
captainSchema.methods.comparePassword = async function (candidatePassword) {
  if (!candidatePassword || !this.password) {
    throw new Error("Password is missing or undefined");
  }
  return bcrypt.compare(candidatePassword, this.password);
};
captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const CaptainModel = mongoose.model("captain", captainSchema);

module.exports = CaptainModel;
