const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

app.use(express.static('docs'))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/docs/index.html");
});

app.use('/scripts', express.static(__dirname + '/docs/src/js/'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap-icons/font/'));