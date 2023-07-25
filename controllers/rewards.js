const RewardServices = require("../services/rewards");
const UserServices = require("../services/user");

class _reward {
  saveReward = async (req, res) => {
    let params = {
      phonenumber: req.body.phonenumber,
      last_reward: req.body.reward,
    };
    try {
      return await RewardServices.post(params);
    } catch (error) {
      return error;
    }
  };

  get = async (req, res) => {
    try {
      let params = { phonenumber: req.body.phonenumber };
      console.log("params", req.body.phonenumber);
      let result = await RewardServices.get(params);
      return result;
    } catch (error) {
      return error;
    }
  };
  remove = async (req, res) => {
    try {
      let params = { phonenumber: req.body.phonenumber };
      console.log("params", req.body.phonenumber);
      let result = await RewardServices.delete(params);
      return result;
    } catch (error) {
      return error;
    }
  };
}

module.exports = RewardController = new _reward();
