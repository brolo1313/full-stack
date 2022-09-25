const express = require("express");
const router = express.Router();
const { User } = require("../models/users");

router.post('/', function (req, res) {
    const potentialUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
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
})

module.exports = router;