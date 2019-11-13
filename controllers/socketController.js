const Pin = require("../models/Pin");
const User = require("../models/User");

exports.createPin = async () => {
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

exports.deletePin = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ msg: "Not Authorized" });
    const pin = await Pin.findById(req.params.id);
    let user = await User.findOne({ email: req.user.email });
    if (`${pin.author}` !== `${user._id}`)
      return res.status(401).json({ msg: "Not Authorized" });
    await pin.remove();
    return res.status(200).json({ msg: "Deleted pin" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Could not delete pin at this time" });
  }
};
exports.comment = async (req, res) => {
  try {
    const newComment = { text: req.body.comment };
    if (req.user) {
      let user = await User.findOne({ email: req.user.email });
      if (user) {
        newComment.author = user._id;
      }
    }
    const updatedPin = await Pin.findByIdAndUpdate(
      { _id: req.body.pinId },
      { $push: { comments: newComment } },
      { new: true }
    )
      .populate("author")
      .populate("comments.author");
    res.status(200).json(updatedPin);
  } catch (err) {
    console.log(err);
  }
};
