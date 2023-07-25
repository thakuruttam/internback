const express = require("express");
const OtpController = require("../controllers/otp");
const smsService = require("../common/sendOtp");

module.exports = otprouter = express.Router();

otprouter.get("/:phonenumber", async (req, res) => {
  let result = await OtpController.get(req, res);
  res.json(result);
});
otprouter.post("/", async (req, res) => {
  let result = await OtpController.saveOtp(req, res);
  res.json(result);
});

otprouter.put("/", async (req, res) => {
  let result = await OtpController.update(req, res);
  res.json(result);
});

otprouter.delete("/:phonenumber", async (req, res) => {
  let result = await OtpController.remove(req, res);
  res.send(result);
});
