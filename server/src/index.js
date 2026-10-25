/**
 * GemmaLens Express Server
 * Serves health check, upload endpoints, and dispatches multimodal analysis.
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import healthRouter from "./routes/health.js";
import analyzeRouter from "./routes/analyze.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server root or parent
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

// API Routes
app.use("/api", healthRouter);
app.use("/api", analyzeRouter);

// Root fallback
app.get("/", (req, res) => {
  res.json({
    app: "GemmaLens Visual Intelligence API",
    version: "1.0.0",
    docs: "/api/health"
  });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err);
  res.status(500).json({
    error: "INTERNAL_ERROR",
    message: err.message || "An unexpected server error occurred."
  });
});

app.listen(PORT, () => {
  console.log(`[GemmaLens Server] Listening on http://localhost:${PORT}`);
  console.log(`[GemmaLens Server] Model Provider: ${process.env.GEMINI_MODEL || "gemma-4-26b-a4b-it"}`);
  console.log(`[GemmaLens Server] API Key Configured: ${Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY)}`);
});
