const Pin = require("../models/Pin");

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
