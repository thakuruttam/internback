const env = require("dotenv");

const accountSid = "AC8fdcbf6e55435e679d9ef1fd455c4b69";
const authToken = "1041e6475be07ea3aa1a7bdb22617a7c";
const client = require("twilio")(accountSid, authToken);
class Otp {
  sendOtp = () => {
    client.messages
      .create({
        body: "testing twillio",
        from: "whatsapp:+14155238886",
        to: "whatsapp:+918174901463",
      })
      .then((message) => {
        console.log(message.accountSid);
        return message.accountSid;
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

module.exports = smsService = new Otp();
