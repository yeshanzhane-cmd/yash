import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import { config } from "./config/env";
import { errorHandler } from "./middleware/errors";
import { chatRouter } from "./modules/chat/chat.controller";

const app = express();

app.use(
  cors({
    origin: config.corsOrigins,
    methods: ["GET", "POST"]
  })
);
app.use(express.json({ limit: "64kb" }));

// Least-privilege default: cap request rate per IP so a stray script or
// leaked URL can't run up your Claude API bill.
app.use(
  rateLimit({
    windowMs: 60_000,
    limit: 30,
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", chatRouter);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Alpha X server listening on http://localhost:${config.port}`);
});
