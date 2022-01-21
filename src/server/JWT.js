var jwt = require("jsonwebtoken");
let SECRETKEY = "SECREKT123123123123";

const generateToken = (data) => {
  return jwt.sign(data, SECRETKEY, { expiresIn: "10h" });
};

const verifyToken = async (token) => {
  return await jwt.verify(token, SECRETKEY, (error, decoded) => {
    if (error) {
      return "Invalid Credentials";
    }
    return decoded;
  });
};

module.exports = {
  verifyToken,
  generateToken,
};
