// server.js
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url || "", true);

    // SSE endpoint
    if (parsedUrl.pathname === "/api/sse") {
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Access-Control-Allow-Origin": "*",
      });

      const intervalId = setInterval(() => {
        res.write(
          `data: ${JSON.stringify({ message: "Hello from server" })}\n\n`
        );
      }, 3000);

      // Clean up when client disconnects
      req.on("close", () => {
        clearInterval(intervalId);
      });
    } else {
      // Handle normal Next.js requests
      handle(req, res, parsedUrl);
    }
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("🚀 Ready on http://localhost:3000");
  });

  process.on("SIGTERM", () => {
    console.log("Shutting down server...");
    process.exit();
  });
});
