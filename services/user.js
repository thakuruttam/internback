let User = require("../models/user");
class _user {
  post = async (params) => {
    const user = new User({
      phonenumber: params.phonenumber,
      password: params.password,
    });

    try {
      return await user.save(params);
    } catch (error) {
      return error;
    }
  };
  get = async (params) => {
    console.log(params);
    try {
      let result = await User.findOne(params);
      console.log(params);
      return result;
    } catch (error) {
      return error;
    }
  };
  getAll = async () => {
    const user = new User();
    try {
      let result = await User.find();
      return result;
    } catch (error) {
      return error;
    }
  };
  put = async (where, change) => {
    try {
      console.log(where, change);
      let result = await User.updateOne(where, change);
      console.log(result);
      return result;
    } catch (error) {
      return error;
    }
  };
  delete = async (params) => {
    try {
      return await User.findByIdAndDelete(params);
    } catch (error) {
      return error;
    }
  };
}

module.exports = UserServices = new _user();
