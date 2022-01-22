var express = require("express");
var app = express();
const path = require("path");

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    " default-src 'self';script-src 'self' 'unsafe-inline';style-src 'self' 'unsafe-inline'; object-src 'none';base-uri 'self'; connect-src 'self';font-src 'self';frame-src 'self';img-src 'self'; manifest-src 'self';media-src 'self'; worker-src 'none'; "
  );
  next();
});

app.use(express.static(path.join(__dirname, "dist", "authentiocation")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "authentiocation", "index.html"));
});

app.listen(process.env.PORT || 9999);
