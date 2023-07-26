const jwt = require("jsonwebtoken");

function extractToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

module.exports = (req, res, next) => {
  try {
    const token = extractToken(req);
    if (!token) return res.status(401).json({ message: "Invalid token" });
    const decoded = jwt.verify(token, "process.env");
    console.log(decoded);
    res.locals.user = decoded;

    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
