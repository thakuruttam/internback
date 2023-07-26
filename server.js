let express = require("express");
let cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const { MongoClient } = require("mongodb");
const userrouter = require("./routes/user");
const otprouter = require("./routes/otp");
const rewardrouter = require("./routes/reward");

dotenv.config({ path: "./config.env" });
url =
  "mongodb+srv://uttam:9415424815@cluster0.tihpvdc.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require("mongoose");

const app = express();
app.use(cookieParser());
let origin = "https://imaginative-fox-0f03b6.netlify.app";

app.use(
  cors({
    credentials: true,
    origin,
  })
);
app.use(express.json());

app.use("/user", userrouter);
app.use("/otp", otprouter);
app.use("/reward", rewardrouter);

rewardrouter;
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}
mongoose
  .connect(url)
  .then((result) => {
    app.listen(process.env.PORT, function () {
      console.log("listening at ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
