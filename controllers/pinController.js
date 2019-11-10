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
    //Create pin
    const pin = await Pin.create(newPin);
    return res.status(200).json(pin);
  } catch (err) {
    res.status(500).json({ msg: "Could not create pin at this time" });
  }
};

exports.getPins = async (req, res) => {
  try {
    const pins = await Pin.find()
      .populate("author")
      .populate("comments.author");
    res.status(200).json(pins);
  } catch (err) {
    console.log(err);
  }
};
