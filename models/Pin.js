const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const PinSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: String,
    image: String,
    lattitude: {
      type: Number,
      required: true,
    },
    longitude: Number,
    author: {
      type: ObjectId,
      ref: "User",
    },
    comments: [
      {
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        author: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Pin", PinSchema);
