const express = require("express");
const router = express.Router();
const { User } = require("../models/users");
const bcrypt = require("bcryptjs");

//Post new user
router.post("/", function (req, res) {
  const potentialUser = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });
  potentialUser
    .save()
    .then((createdUser) => {
      res.status(201).json(createdUser);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

//Get all users
router.get("/", async (req, res) => {
  User.find(
    {},
    await function (err, userList) {
      if (err || !userList)
        return res.status(500).json({
          error: err,
          success: false,
        });
      res.send(userList);
    }
  ).select("name phone email");
});

//Get single user
router.get("/:id", async (req, res) => {
  User.findById(
    req.params.id,
    await function (err, singleUser) {
      if (err || !singleUser)
        return res.status(500).json({
          error: err,
          success: false,
          message: "User with given id, not found",
        });
      res.send(singleUser);
    }
  ).select("-passwordHash");
});

router.put("/:id", async (req, res) => {
  const userExist = await User.findById(req.params.id);
  let newPassword
  if(req.body.password){
    newPassword = bcrypt.hashSync(req.body.password, 10)
  }else {
    newPassword =  userExist.params;
  }

  const user = await User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    passwordHash: newPassword,
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  },{new: true});

  if (!user) return res.status(500).send("the user is not be updated");
  res.send(user);
});

module.exports = router;
