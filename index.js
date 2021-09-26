const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();



const PORT = 4000;

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
app.use("/", crmRoutes());

app.listen(PORT, (req, res) => {
  console.log(`App is runing on port: ${PORT}`);
});
