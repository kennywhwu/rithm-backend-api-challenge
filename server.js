/** Start server */

const app = require("./app");
// const { PORT } = require("./config");
const PORT = 3001;

app.listen(PORT, function() {
  console.log(`Server starting on port ${PORT}!`);
});
