const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  connections: [
    {
      name: String,

      id: String,
    },
  ],
  sendReq: [
    {
      name: String,

      id: String,
    },
  ],
  inviteRequest: [
    {
      name: String,

      id: String,
    },
  ],
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
