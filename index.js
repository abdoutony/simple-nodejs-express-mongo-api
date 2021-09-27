const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const app = express();

// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser())


const PORT = 4000;

//helmet set up
// app is protected with 12 helmet headers
app.use(helmet());

//set up rate limite to prevent dos attack
// here max 100 requests per ip in 15minutes
const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit of number of requests per ip
  delayMs: 0, // disable delays
});

//mongo db connection set up
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/CRMdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app routes setup
const crmRoutes = require("./src/routes/crmRoutes");
const userRoutes = require("./src/routes/userRoutes");

const auth = require("./middleware/auth");
app.use("/", crmRoutes({ auth }), userRoutes({ auth }));

//jwt set up

app.listen(PORT, (req, res) => {
  console.log(`App is runing on port: ${PORT}`);
});
