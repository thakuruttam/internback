const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rewardSchema = new Schema({
  phonenumber: {
    type: Number,
    required: true,
  },
  total_rewards: {
    type: Number,
  },
  last_reward: {
    type: Number,
    required: true,
  },
  time: { type: Date, default: Date.now },
});

module.exports = Reward = mongoose.model("Reward", rewardSchema);
