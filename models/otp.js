const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpSchema = new Schema({
  phonenumber: {
    type: Number,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  time: { type: Date, default: Date.now },
});

module.exports = Otp = mongoose.model("Otp", otpSchema);
