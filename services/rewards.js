let Reward = require("../models/rewards");
class _reward {
  post = async (params) => {
    const reward = new Reward({
      phonenumber: params.phonenumber,
      last_reward: params.last_reward,
    });

    try {
      return await reward.save(params);
    } catch (error) {
      return error;
    }
  };
  get = async (params) => {
    try {
      let result = await Reward.find(params);
      console.log(params);
      return result;
    } catch (error) {
      return error;
    }
  };

  //   put = async (where, change) => {
  //     try {
  //       console.log(where, change);
  //       let result = await Reward.updateOne(where, change);
  //       console.log(result);
  //       return result;
  //     } catch (error) {
  //       return error;
  //     }
  //   };
  delete = async (params) => {
    try {
      return await Reward.deleteMany(params);
    } catch (error) {
      return error;
    }
  };
}

module.exports = RewardServices = new _reward();
