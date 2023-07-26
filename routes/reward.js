const express = require("express");
const RewardController = require("../controllers/rewards");
// const auth = require("../middleware/authmiddleware");

module.exports = rewardrouter = express.Router();

rewardrouter.post("/get", async (req, res) => {
  console.log("asdasd", req.body);
  let result = await RewardController.get(req, res);
  res.json(result);
});
rewardrouter.post("/", async (req, res) => {
  let result = await RewardController.saveReward(req, res);
  res.json(result);
});
rewardrouter.post("/delete", async (req, res) => {
  let result = await RewardController.remove(req, res);
  res.json(result);
});
