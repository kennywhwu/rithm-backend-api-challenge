const express = require("express");

const app = express();
app.use(express.json());

const userRoutes = require("./routes/users");

app.use("/users", userRoutes);

// app.get("/", function(request, response) {
//   return response.send("Hello World!");
// });

module.exports = app;
