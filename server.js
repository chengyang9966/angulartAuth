var express = require("express");
var app = express();

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css; frame-src 'self';"
  );
  next();
});

app.use(express.static(__dirname + "/dist"));

app.all("*", (req, res) => {
  res.sendDate(__dirname + "/dist/index.html");
});

app.listen(process.env.PORT || 9999);
