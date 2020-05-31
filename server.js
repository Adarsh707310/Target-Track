const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const app = express();

// Bodyparser middleware 
app.use(
  bodyParser.urlencoded({ extended: false })
);
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI; 

mongoose
  .connect(
    db,
    { useNewUrlParser: true , useUnifiedTopology: true}
  )
  .then(() => console.log("MongoDB Successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

// Routers
app.use("/api/users",users);

const port = process.env.port || 5000 ; // process.env.port is heroku's port if you choose to deploy app there

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
