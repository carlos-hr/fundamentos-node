import http from "node:http";

const PORT = 3333;

const server = http.createServer((req, res) => {
  return res.end("Initial setup");
});

server.listen(
  PORT,
  console.log(`server is running on http://localhost:${PORT}`)
);
