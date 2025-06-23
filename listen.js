const app = require("./app");
const PORT = process.env.PORT || 9090;
// Start server on specified port
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});