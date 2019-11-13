const User = require("../models/User");
const auth = require("../util/auth");

exports.findOrCreateUser = async (req, res) => {
  const token = req.header("x-auth-token");
  const googleUser = await auth(token);
  if (!googleUser) {
    return res.status(401).json({ msg: "Not authorized" });
  }
  console.log(googleUser);
  const { name, email, picture } = googleUser;
  //Check for existing user
  let user = await User.findOne({ email });
  //Else create user
  if (!user) {
    user = await User.create({ name, email, picture });
  }
  //Return user info
  return res.status(200).json(user);
};
