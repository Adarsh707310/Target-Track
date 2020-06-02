const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// const validateTodoInput = require("../../validation/Todo");

// Load User model
const User = require("../../models/User");
const Todo = require("../../models/Todo");

router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      res.status(400).json({ email: "Email already exist" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});
router.post("/facebook", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email}).then(user => {
    if (user) {
      bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
          };
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res.status(400).json({ email: "This email is already registered" });
        }
      });
    } 
    else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const payload = {
                id: user.id,
                name: user.name,
                email: user.email
              };
              console.log(payload);
              jwt.sign(
                payload,
                keys.secretOrKey,
                {
                  expiresIn: 31556926
                },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                }
              );
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.post("/dashboard/add", (req, res) => {
  const newTodo = new Todo({
    todo_user_Id: req.body.todo_user_Id,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    label: req.body.label,
    add_date: req.body.add_date,
    due_date: req.body.due_date,
  });
  newTodo
    .save()
    .then((todo) => res.json(todo))
    .catch((err) => console.log(err));
});

router.get("/mytodos/:id", (req, res) => {
  Todo.find({ todo_user_Id: req.params.id })
    .then((docs) => res.json(docs))
    .catch((err) => console.log(err));
});

router.get("/myfriends/:id", (req, res) => {
  const _id = req.params.id;
  User.findOne({ _id })
    .then((docs) => res.json(docs.connections))
    .catch((err) => console.log(err));
});

router.get("/rendReq/:id", (req, res) => {
  const _id = req.params.id;
  User.findOne({ _id })
    .then((docs) => res.json(docs.sendReq))
    .catch((err) => console.log(err));
});

router.get("/myinvites/:id", (req, res) => {
  const _id = req.params.id;
  User.findOne({ _id })
    .then((docs) => res.json(docs.inviteRequest))
    .catch((err) => console.log(err));
});

router.delete("/delete_todo/:id", (req, res) => {
  Todo.findOneAndDelete({ _id: req.params.id })
    .then((docs) => res.json({ message: "success" }))
    .catch((err) => console.log(err));
});

router.put("/edit/:id", (req, res) => {
  Todo.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        label: req.body.label,
        due_date: req.body.due_date,
      },
    },
    { new: true, useFindAndModify: false }
  )
    .then((docs) => res.send(docs))
    .catch((err) => console.log("Something wrong when updating data!"));
});

router.get(`/edit/:id`, (req, res) => {
  const _id = req.params.id;
  Todo.findOne({ _id })
    .then((docs) => res.json(docs))
    .catch((err) => console.log(err));
});

router.put("/acceptreq", (req, res) => {
  const Connection = {
    name: req.body.name,
    id: req.body.id,
  };
  console.log(Connection);
  User.findOneAndUpdate(
    { _id: req.body.my },
    { $addToSet: { connections: Connection } },
    { new: true, useFindAndModify: false }
  )
    .then((docs) => res.send(docs))
    .catch((err) => console.log(err));
});

router.put("/deletereq", (req, res) => {
  User.findOneAndUpdate(
    { _id: req.body.my },
    {
      $set: {
        inviteRequest: req.body.array.filter((reqs) => reqs.id !== req.body.id),
      },
    },
    { new: true, useFindAndModify: false }
  )
    .then((docs) => res.send(docs))
    .catch((err) => console.log(err));
});

router.get("/allusers", (req, res) => {
  User.find({})
    .sort({ Date: -1 })
    .then((docs) => res.json(docs))
    .catch((err) => console.log(err));
});

router.put("/sendreq", (req, res) => {
  const inviteRequestObj = {
    name: req.body.name,
    id: req.body.id,
  };
  console.log(inviteRequestObj);
  User.findOneAndUpdate(
    { _id: req.body.reqto },
    { $addToSet: { inviteRequest: inviteRequestObj } },
    { new: true, useFindAndModify: false }
  )
    .then((docs) => res.json(docs))
    .catch((err) => console.log(err));
});

router.put("/addsendReq", (req, res) => {
  const sendReqObj = {
    id: req.body.reqto,
  };

  console.log(sendReqObj);

  User.findOneAndUpdate(
    { _id: req.body.id },
    { $addToSet: { sendReq: sendReqObj } },
    { new: true, useFindAndModify: false }
  )
    .then((docs) => res.json(docs))
    .catch((err) => console.log(err));
});

module.exports = router;
