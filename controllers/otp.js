const OtpServices = require("../services/otp");
const UserServices = require("../services/user");

const bcrypt = require("bcrypt");

class _otp {
  saveOtp = async (req, res) => {
    let dupparams = { phonenumber: req.body.phonenumber };
    let duplicate = await UserServices.get(dupparams);
    console.log(duplicate);
    if (duplicate) {
      return " User Already exist";
    } else {
      let params = {
        phonenumber: req.body.phonenumber,
        code: req.body.code,
      };
      try {
        return await OtpServices.post(params);
      } catch (error) {
        return error;
      }
    }
  };

  get = async (req, res) => {
    try {
      let params = { phonenumber: req.params.phonenumber };
      let result = await OtpServices.get(params);
      return result;
    } catch (error) {
      return error;
    }
  };
  update = async (req, res) => {
    try {
      var where = req.body.where;
      var change = { $set: req.body.change };

      console.log(where, change);
      await OtpServices.put(where, change);
      let result = await OtpServices.get(req.body.where);
      return result;
    } catch (error) {
      return error;
    }
  };
  remove = async (req, res) => {
    try {
      let params = { phonenumber: req.params.phonenumber };
      return await OtpServices.delete(params);
    } catch (error) {
      return error;
    }
  };
}

module.exports = OtpController = new _otp();
