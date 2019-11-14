const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

const User = require("../models/User");

module.exports = async token => {
  //Check for token
  if (!token) {
    return false;
  }
  //Verify token
  try {
    const ticket = await client.verifyIdToken({
      idToken: token
    });
    const googleUser = ticket.getPayload();
    if (googleUser) {
      let user = await User.findOne({ email: googleUser.email });
      if (user) {
        return user;
      } else {
        return "new user";
      }
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
