var jsonServer = require("json-server");

var server = jsonServer.create();
var dbData = require("./db.json");
var user = require("./login");

const middlewares = jsonServer.defaults({
  noCors: true,
  bodyParser: true,
  static: "./build",
});
var cusotmMiddlewares = require("./middleware");
var data = jsonServer.router(dbData);
const PORT = 8888;

server.use(middlewares);
server.post("/api/register", user.register);
server.post("/api/login", user.login);
server.post("/api/authenticate", cusotmMiddlewares, user.auth);

server.use("/api", cusotmMiddlewares, data);

server.all("*", (req, res) => {
  res.status(404).json({ msg: "Invalid Route" });
});
server.listen(PORT, function () {
  console.log(`JSON Server is running ${PORT}`);
});
