/** Routes for users. */

const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.get("/", async function(req, res, next) {
  try {
    const users = await User.findAll(req.query);
    // let result =
    return res.json({ users });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
