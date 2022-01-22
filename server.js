var express = require("express");
var app = express();
var path = require("path");
var user = require("./src/server/login");
var cusotmMiddlewares = require("./src/server/middleware");
var dbData = require("./src/server/db.json");
var cors = require("cors");

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    " default-src 'self';script-src 'self' 'unsafe-inline';style-src 'self' 'unsafe-inline'; object-src 'none';base-uri 'self'; connect-src 'self';font-src 'self';frame-src 'self';img-src 'self'; manifest-src 'self';media-src 'self'; worker-src 'none'; "
  );
  next();
});

app.use(express.static(path.join(__dirname, "dist", "authentiocation")));
app.use(cors());
app.use(express.json());

app.post("/api/register", user.register);
app.post("/api/login", user.login);
app.post("/api/authenticate", cusotmMiddlewares, user.auth);

app.use("/api/orders", cusotmMiddlewares, function (req, res) {
  res.json(dbData.orders);
});

app.all("*", function (req, res) {
  res.status(404).json({ msg: "Invalid Route" });
});
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "authentiocation", "index.html"));
});

app.listen(process.env.PORT || 9999);
