let Otp = require("../models/otp");
class _otp {
  post = async (params) => {
    const otp = new Otp({
      phonenumber: params.phonenumber,
      code: params.code,
    });

    try {
      return await otp.save(params);
    } catch (error) {
      return error;
    }
  };
  get = async (params) => {
    try {
      let result = await Otp.findOne(params);
      return result;
    } catch (error) {
      return error;
    }
  };

  put = async (where, change) => {
    try {
      let result = await Otp.updateOne(where, change);
      return result;
    } catch (error) {
      return error;
    }
  };
  delete = async (params) => {
    try {
      return await Otp.findOneAndDelete(params);
    } catch (error) {
      return error;
    }
  };
}

module.exports = OtpServices = new _otp();
