import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import gamesRouter from "./routes/games.ts";
import challengesRouter from "./routes/challenges.ts";
import socialRouter from "./routes/social.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security and standard middleware
  app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for Vite development
  }));
  app.use(cors());
  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Node.js backend is running with all systems operational!" });
  });

  // Feature routes
  app.use("/api/games", gamesRouter);
  app.use("/api/challenges", challengesRouter);
  app.use("/api/social", socialRouter);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
