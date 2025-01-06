const UserModels = require("../Models/UserModels");
module.exports.createUser = async ({
  first_name,
  last_name,
  email,
  password,
}) => {
  if (!first_name || !email || !password) {
    throw new Error("All fields are required");
  }
  const user = new UserModels({
    fullname: {
      first_name,
      last_name,
    },
    email,
    password,
  });
  await user.save();
  return user;
};
