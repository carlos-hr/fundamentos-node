import http from "node:http";

const PORT = 3333;

const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }
  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  }

  if (method === "GET" && url === "/users") {
    return res
      .setHeader("Content-type", "application/json")
      .end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;

    users.push({
      id: new Date().getTime().toString(),
      name,
      email,
    });
    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(
  PORT,
  console.log(`server is running on http://localhost:${PORT}`)
);
