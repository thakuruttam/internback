const express = require("express");
const UserController = require("../controllers/user");
const smsService = require("../common/sendOtp");

module.exports = userrouter = express.Router();

userrouter.get("/", async (req, res) => {
  let result = await UserController.getAllUser(req, res);
  res.json(result);
});
userrouter.get("/:_id", async (req, res) => {
  let result = await UserController.getUser(req, res);
  res.json(result);
});
userrouter.post("/", async (req, res) => {
  try {
    let result = await UserController.saveUser(req, res);
    res.json(result).status(201);
  } catch (error) {
    console.log(error);
    res.error(error).status(400);
  }
});
userrouter.put("/", async (req, res) => {
  let result = await UserController.updateUser(req, res);
  res.json(result);
});

userrouter.delete("/:_id", async (req, res) => {
  let result = await UserController.removeUser(req, res);
  res.send(result);
});

userrouter.post("/otp", async (req, res) => {
  let result = await smsService.sendOtp();
  console.log(result);
  res.send(result);
});
userrouter.post("/signin", async (req, res) => {
  let result = await UserController.signin(req, res);
  console.log(result);
  res.send(result);
});

userrouter.post("/logout", async (req, res) => {
  let result = await UserController.logout(req, res);
  console.log(result);
  res.send(result);
});
