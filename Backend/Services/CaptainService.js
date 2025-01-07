const CaptainModel = require("../Models/CaptainModel");

module.exports.createCaptain = async ({
  first_name,
  last_name,
  email,
  password,
  color,
  model,
  plate_number,
  capacity,
  vehicle_type,
}) => {
  if (
    !first_name ||
    !email ||
    !password ||
    !color ||
    !model ||
    !plate_number ||
    !capacity ||
    !vehicle_type
  ) {
    throw new Error("All fields are required");
  }
  const captain = new CaptainModel({
    fullname: {
      first_name,
      last_name,
    },
    email,
    password,
    vehicle: {
      color,
      model,
      plate_number,
      capacity,
      vehicle_type,
    },
  });

  await captain.save();
  return captain;
};
