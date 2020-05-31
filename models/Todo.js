const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema 
const TodoSchema = new Schema({
  todo_user_Id: {
    type: String
  },
  title: { 
    type : String 
  },
  description: {
    type: String
  },
  status: { 
    type : String 
  },
  label: {
    type : String
  },
  due_date: {
    type : Date
  },
  add_date: { 
    type : Date, 
    default: Date.now 
  } 
});

module.exports = Todo = 
mongoose.model("todos",TodoSchema);