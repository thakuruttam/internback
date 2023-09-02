const UserServices = require("../services/user");
const OtpServices = require("../services/otp");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signToken } = require("../common/jwt");

class _user {
    saveUser = async(req, res) => {
        let name = req.body.name;
        let phonenumber = req.body.phonenumber;
        let email = req.body.email;
        let degree = req.body.degree;



        let dupparams = { phonenumber: req.body.phonenumber };

        let duplicate = await UserServices.get(dupparams);
        console.log("duplicate", duplicate);
        if (duplicate) {
            return;
        }

        let params = { name, phonenumber, email, degree }

        try {
            let result = await UserServices.post(params);

            return result;
        } catch (error) {
            return error;
        }

    };
}

module.exports = UserController = new _user();