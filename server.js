var express = require("express");
var app = express();

app.use(express.static(__dirname + "/dist"));

app.all("*", (req, res) => {
  res.sendDate(__dirname + "/dist/index.html");
});

app.listen(process.env.PORT || 9999);
