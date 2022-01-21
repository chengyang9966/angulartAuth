const { verifyToken } = require("./JWT");

module.exports = async (req, res, next) => {
  console.log(req.path);

  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (token) {
    let verifyToken1 = await verifyToken(token.substring(7));
    if (verifyToken1 === "Invalid Credentials") {
      return res.status(400).json({ msg: verifyToken1 });
    }
    next();
  } else {
    res.json({ msg: "Login is Required" });
  }
};
