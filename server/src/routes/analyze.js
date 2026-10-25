/**
 * Analysis Routes
 * Handles upload validation (images and PDF up to 15MB) and dispatches to Gemini or Demo walkthrough.
 */

import express from "express";
import multer from "multer";
import { analyzeVisualInput } from "../services/geminiProvider.js";
import { DEMO_SCENARIOS } from "../services/demoData.js";

const router = express.Router();

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf"
];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024 // 15 MB limit
  },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype}. Allowed types: PNG, JPEG, WEBP, GIF, PDF.`));
    }
  }
});

// POST /api/analyze - Live Multimodal Analysis
router.post("/analyze", (req, res, next) => {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          error: "FILE_TOO_LARGE",
          message: "Uploaded file exceeds the 15 MB size limit."
        });
      }
      return res.status(400).json({
        error: "INVALID_FILE",
        message: err.message
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: "NO_FILE",
        message: "No file was uploaded. Please provide an image or PDF."
      });
    }

    const mode = req.body.mode || "scene";
    const question = req.body.question || "";

    // Check if API key is present
    const hasKey = Boolean(
      (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim()) ||
      (process.env.GOOGLE_API_KEY && process.env.GOOGLE_API_KEY.trim())
    );

    if (!hasKey) {
      // Rule 4: Do not fake AI. If no API key exists, show error and do not fake analyzing the upload.
      return res.status(400).json({
        error: "API_KEY_NOT_CONFIGURED",
        message: "Demo mode — sample results only; configure GEMINI_API_KEY in server/.env for live image analysis.",
        isDemo: true,
        allowDemoWalkthrough: true
      });
    }

    try {
      const result = await analyzeVisualInput({
        file: req.file,
        mode,
        question
      });

      return res.json({
        success: true,
        isDemo: false,
        result
      });
    } catch (analysisErr) {
      console.error("Live analysis error:", analysisErr);
      return res.status(500).json({
        error: "ANALYSIS_FAILED",
        message: analysisErr.message || "Model analysis failed. Please verify the file and retry."
      });
    }
  });
});

// POST /api/demo - Explicit Sample Walkthrough Action
router.post("/demo", (req, res) => {
  const mode = req.body.mode || "scene";
  const scenario = DEMO_SCENARIOS[mode] || DEMO_SCENARIOS.scene;

  return res.json({
    success: true,
    isDemo: true,
    illustrativeNotice: "Illustrative sample walkthrough. Shows expected output schema without live model inference.",
    result: scenario
  });
});

export default router;
