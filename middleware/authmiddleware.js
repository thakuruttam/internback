const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
module.exports = (req, res, next) => {
  try {
    console.log("middleware hit");
    const token = req.cookies;
    console.log("token found is ", JSON.parse(JSON.stringifyreq.cookies));
    if (!token) return res.status(403).send("Access denied.");

    const decoded = jwt.verify(token, "process.env");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
