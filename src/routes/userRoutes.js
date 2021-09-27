const express = require("express");
const { route } = require("express/lib/application");
const csrf = require("csurf");
var bodyParser = require("body-parser");

// setup route middlewares
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });

const router = express.Router();

//delaring our controller
const userController = require("../controllers/userController");

// create a new instance of the controller
const UserController = new userController();

module.exports = () => {
  router.post("/register", async (req, res) => {
    await UserController.register(req, res);
  });

  router.post("/login", async (req, res) => {
    await UserController.login(req, res);
  });

  return router;
};
