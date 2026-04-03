const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageurl: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
      maxlength: 200,
    },
    size: {
      type: Number,
    },
  },
  { timestamps: true },
);

const imageModel = mongoose.model("Image", imageSchema);

module.exports = imageModel;
