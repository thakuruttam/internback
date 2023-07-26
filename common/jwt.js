const jwt = require("jsonwebtoken");

const signToken = async (userData) => {
  try {
    const signedToken = await jwt.sign(userData, "secret", { expiresIn: "2h" });
    return signedToken;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = { signToken };
