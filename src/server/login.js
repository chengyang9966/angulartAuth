const { generateToken } = require("./JWT");
module.exports = class User {
  #Defaultemail;
  #Defaultpassword;
  constructor() {
    this.#Defaultemail = "user@domain.com";
    this.#Defaultpassword = "123456";
  }

  static register(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ msg: "Required Passsword and Email" });
    }

    let token = generateToken({ email });

    return res.json({ msg: "Register Successfully", token, email });
  }

  static login(req, res) {
    const { email, password } = req.body;
    let defaultuser = new User();
    if (!email || !password) {
      return res.status(401).json({ msg: "Required Passsword and Email" });
    }
    if (
      email !== defaultuser.#Defaultemail ||
      password !== defaultuser.#Defaultpassword
    ) {
      return res.status(401).json({ msg: "not Authorize" });
    }
    let token = generateToken({ email, admin: true, name: "Cheng Yang" });

    return res.json({
      msg: "Login Successfully",
      token,
      email,
    });
  }

  static auth(req, res) {
    return res.json({
      msg: "Valid User",
    });
  }
};
