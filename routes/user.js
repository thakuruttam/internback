const express = require("express");
const UserController = require("../controllers/user");
const smsService = require("../common/sendOtp");
const fetchUser = require("../middleware/fetchUser");

module.exports = userrouter = express.Router();

userrouter.get("/", fetchUser, async(req, res) => {
    let result = await UserController.getAllUser(req, res);
    res.json(result);
});

userrouter.get("/:_id", async(req, res) => {
    let result = await UserController.getUser(req, res);
    res.json(result);
});

userrouter.post("/", async(req, res) => {
    try {
        let result = await UserController.saveUser(req, res);
        res.json(result).status(201);
    } catch (error) {
        console.log(error);
        res.error(error).status(400);
    }
});