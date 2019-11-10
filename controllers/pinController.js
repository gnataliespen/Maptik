const Pin = require("../models/Pin");
const User = require("../models/User");

exports.createPin = async (req, res) => {
  const { title, image, description, longitude, latitude } = req.body;
  //Intialize new pin obj
  const newPin = { longitude, latitude, title };
  //check for optional properties
  if (req.user) {
    try {
      let user = await User.findOne({ email: req.user.email });
      newPin.author = user;
    } catch (err) {
      console.log(err);
    }
  }
  if (image) newPin.image = image;
  if (description) newPin.description = description;
  try {
    let pin = await Pin.create(newPin);
    if (pin.author) {
      await pin.populate("author");
    }
    return res.send(pin);
  } catch (err) {
    res.status(500).json({ msg: "Could not create pin at this time" });
  }
};
