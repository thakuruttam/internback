let express = require("express");
let cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const { MongoClient } = require("mongodb");
const userrouter = require("./routes/user");

dotenv.config({ path: "./config.env" });
url =
    "mongodb+srv://uttam:9415424815@cluster0.tihpvdc.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require("mongoose");

const app = express();
app.use(cookieParser());
let origin = "http://localhost:3000";

app.use(
    cors({
        credentials: true,
        origin,
    })
);
app.use(express.json());

app.use("/user", userrouter);


if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
}
mongoose
    .connect(url)
    .then((result) => {
        app.listen(process.env.PORT || 8000, function() {
            console.log("listening at ", process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });