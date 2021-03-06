const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from header
  const header = req.headers.authorization;
  let token = "";
  // Check if not token
  if (header) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.header("x-auth-token") !== null) {
    token = req.header("x-auth-token");
  } else {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    jwt.verify(token, config.get("jwtSecret"), (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: "Token is not valid" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};
