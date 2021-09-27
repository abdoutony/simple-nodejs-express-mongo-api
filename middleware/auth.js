// verify if the user is authenticated with right signature
const jsonwebtoken = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const token = req.headers["token"];

  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jsonwebtoken.verify(token, "RESTFULAPIs");
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};
