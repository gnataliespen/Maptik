const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);
module.exports = async token => {
  //Check for token
  if (!token) {
    return;
  }
  //Verify token
  try {
    const ticket = await client.verifyIdToken({
      idToken: token
    });
    const user = ticket.getPayload();
    return user;
  } catch (err) {
    return;
  }
};
