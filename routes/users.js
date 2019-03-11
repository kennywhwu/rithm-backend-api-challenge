/** Routes for users. */

const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.get("/", async function(req, res, next) {
  try {
    const users = await User.findAll(req.query);
    let metadata = {
      path: "/users",
      query: req.query,
      num_results: users.num_results,
      results: users.results,
    };
    return res.json({ metadata });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
