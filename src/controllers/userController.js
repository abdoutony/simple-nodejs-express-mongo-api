class userController {
  /**
   * Constructor
   * @param  mongoose
   * @param User
   * @param bcrypt
   * @param jwt
   */
  constructor() {
    // setting up mongoose and model to be used in the functions
    const mongoose = require("mongoose");
    const User = require("../models/userModel")(mongoose);
    const bcrypt = require("bcrypt");
    const jwt = require("jsonwebtoken");
    this.mongoose = mongoose;
    this.User = User;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
  }

  // a function to check if user is loged in
  async loginRequired(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.status(401).json({ message: "unauthorized user" });
    }
  }
 
  //regiter new user
  async register(req, res) {
    let newUser = this.User(req.body);
    newUser.hashPassword = this.bcrypt.hashSync(req.body.password, 10);
    await newUser.save((err, user) => {
      if (err) {
        return res.status(400).send({ message: err });
      } else {
        user.hashPassword = undefined;
        return res.status(200).json({ data: user });
      }
    });
  }

  // authenticate users
  async login(req, res) {
    let user = await this.User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).send({ message: "Authentication failed user not found" });
    } else if (user) {
      if (!user.comparePassword(req.body.password, user.hashPassword)) {
        res
          .status(401)
          .send({ message: "Authentication failed wrong password" });
      } else {
        return res.json({
          token: this.jwt.sign(
            { email: user.email, username: user.username, _id: user.id },
            "RESTFULAPIs"
          ),
        });
      }
    }
    return user;
  }
}

module.exports = userController;
