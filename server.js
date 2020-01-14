const http = require("http");
const app = require("./app");

// Getting port number default: 3000
const port = process.env.PORT || 3000;

// Assigning the server
const server = http.createServer(app);

// Listening to port
server.listen(port);
