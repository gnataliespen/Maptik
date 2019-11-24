const User = require("../models/User");
const auth = require("../util/auth");

exports.findOrCreateUser = async (req, res) => {
  const token = req.header("x-auth-token");
  const user = await auth(token);
  if (!user) {
    return res.status(401).json({ msg: "Not authorized" });
  }
  //if new user create user obj
  if (user === "new user") {
    user = await User.create({ name, email, picture });
  }
  //Return user info
  return res.status(200).json(user);
};
