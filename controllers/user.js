const UserServices = require("../services/user");
const OtpServices = require("../services/otp");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signToken } = require("../common/jwt");

class _user {
  saveUser = async (req, res) => {
    let code = req.body.code;
    let phonenumber = req.body.phonenumber;
    let password = req.body.password;
    if (phonenumber.length != 10) {
      return "Enter 10 digit number ";
    }
    let dupparams = { phonenumber: req.body.phonenumber };

    let duplicate = await UserServices.get(dupparams);
    console.log("duplicate", duplicate);
    if (duplicate) {
      return " User Already exist";
    }
    let dbcode = await OtpServices.get({ phonenumber: phonenumber });
    console.log("dbcode", dbcode);
    if (dbcode && dbcode.code == code) {
      try {
        let result = await OtpServices.delete({ phonenumber: phonenumber });
        console.log("dbcode delete", result);
      } catch (e) {
        console.log(e);
      }
      let saltRounds = 10;
      let codedpassword = await bcrypt.hash(password, saltRounds);
      console.log(codedpassword);
      let params = {
        phonenumber,
        password: codedpassword,
      };

      try {
        let result = await UserServices.post(params);
        const token = await signToken({
          phonenumber: result.phonenumber,
          role: result.role,
        });
        return token;
      } catch (error) {
        return error;
      }
    } else {
      return "Otp not matching";
    }
  };

  signin = async (req, res) => {
    let password = req.body.password;
    let params = { phonenumber: req.body.phonenumber };
    let usercheck = await UserServices.get(params);
    if (!usercheck) return res.send(401).json({ message: "User not found" });
    console.log("userfound", usercheck);
    let compare = await bcrypt.compare(password, usercheck.password);
    console.log(compare);
    if (compare) {
      const token = await signToken({
        phonenumber: usercheck.phonenumber,
        role: usercheck.role,
      });

      return token;
    } else {
      return "Login failed check again";
    }

    // try {
    //   let result = await UserServices.post(params);
    //
    //   return result;
    // } catch (error) {
    //   return error;
    // }
  };

  getAllUser = async (req, res) => {
    try {
      console.log("co");
      let result = await UserServices.getAll();
      return result;
    } catch (error) {
      return error;
    }
  };

  logout = async (req, res) => {
    try {
      res.clearCookie("Cookie");

      return "cleared cookie";
    } catch (error) {
      return error;
    }
  };
  getUser = async (req, res) => {
    try {
      let params = { _id: req.params._id };
      console.log(req.params);
      let result = await UserServices.get(params);
      return result;
    } catch (error) {
      return error;
    }
  };

  updateUser = async (req, res) => {
    try {
      var where = req.body.where;
      var change = { $set: req.body.update };

      console.log(where, change);
      return await UserServices.put(where, change);
    } catch (error) {
      return error;
    }
  };
  removeUser = async (req, res) => {
    try {
      let params = { _id: req.params._id };
      return await UserServices.delete(params);
    } catch (error) {
      return error;
    }
  };
}

module.exports = UserController = new _user();
