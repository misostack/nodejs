const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("mock.json");
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  if (["POST", "PATCH"].includes(req.method)) {
    req.body.updatedAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});
const PORT = process.env.PORT || 1337;
server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running http://localhost:${PORT}`);
});
