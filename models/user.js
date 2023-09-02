const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    phonenumber: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },

    time: { type: Date, default: Date.now },
}, { timeStamp: true });

module.exports = User = mongoose.model("User", userSchema);