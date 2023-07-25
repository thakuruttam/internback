const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    phonenumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 2,
    },

    time: { type: Date, default: Date.now },
  },
  { timeStamp: true }
);

module.exports = User = mongoose.model("User", userSchema);
