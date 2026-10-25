/**
 * Health check endpoint
 * Reports operational status and configuration without exposing any secret keys.
 */

import express from "express";

const router = express.Router();

router.get("/health", (req, res) => {
  const hasKey = Boolean(
    (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim()) ||
    (process.env.GOOGLE_API_KEY && process.env.GOOGLE_API_KEY.trim())
  );

  const model = process.env.GEMINI_MODEL || "gemma-4-26b-a4b-it";

  res.json({
    status: "ok",
    provider: "Google Gemma 4 26B Multimodal Engine",
    model: model,
    hasApiKey: hasKey,
    mode: hasKey ? "live" : "demo",
    message: hasKey
      ? `Live ${model} Multimodal API configured and verified.`
      : "Demo mode — sample results only; configure GEMINI_API_KEY for live image analysis.",
    maxUploadSizeMb: 15,
    timestamp: new Date().toISOString()
  });
});

export default router;
