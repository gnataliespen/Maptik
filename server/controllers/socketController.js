const Pin = require("../models/Pin");
const User = require("../models/User");
const auth = require("../util/auth");

exports.createPin = async newPin => {
  const { title, image, description, longitude, latitude, token } = newPin;
  const user = await auth(token);
  //Intialize new pin obj
  const pinObj = { longitude, latitude, title };
  //check for optional properties
  if (user) {
    pinObj.author = user;
  }
  if (image) pinObj.image = image;
  if (description) pinObj.description = description;
  try {
    //Create pin
    const pin = await Pin.create(pinObj);
    return pin;
  } catch (err) {
    console.log(err);
    return null;
  }
};

exports.deletePin = async reqObj => {
  const { id, token } = reqObj;
  const user = await auth(token);
  if (!user) return res.status(401).json({ msg: "Not Authorized" });
  try {
    const pin = await Pin.findById(id);
    if (`${pin.author}` !== `${user._id}`)
      return res.status(401).json({ msg: "Not Authorized" });
    await pin.remove();
    return id;
  } catch (err) {
    console.log(err);
    return null;
  }
};
exports.comment = async newComment => {
  const { token, text, pinId, image } = newComment;
  const user = await auth(token);
  const commentObj = { text };
  if (user) {
    commentObj.author = user._id;
  }
  if (image) commentObj.image = image;
  try {
    const updatedPin = await Pin.findByIdAndUpdate(
      { _id: pinId },
      { $push: { comments: commentObj } },
      { new: true }
    )
      .populate("author")
      .populate("comments.author");
    return updatedPin;
  } catch (err) {
    console.log(err);
    return null;
  }
};
exports.deleteComment = async oldComment => {
  const { pinId, comment, token } = oldComment;
  const user = await auth(token);
  if (!user) return res.status(401).json({ msg: "Not Authorized" });
  if (`${user._id}` !== `${comment.author._id}`)
    return res.status(401).json({ msg: "Not Authorized" });
  try {
    const pin = await Pin.findById(pinId)
      .populate("author")
      .populate("comments.author");
    let newComments = pin.comments.filter(
      com => `${com._id}` !== `${comment._id}`
    );
    pin.comments = newComments;
    await pin.save();
    return pin;
  } catch (err) {
    console.log(err);
    return null;
  }
};
