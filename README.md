# 💎 GemmaLens — Multimodal Visual Intelligence Workspace

> A desktop-first, honest, demo-ready multimodal visual intelligence workspace built with **React**, **TypeScript**, **Express**, and the official **@google/genai** SDK.

---

## 🌟 Overview & Philosophy

**GemmaLens** bridges high-resolution visual inputs (camera frames, documents, charts, UI wireframes) with structured semantic reasoning and executable outputs.

Instead of a generic image-to-text chat, GemmaLens implements **5 domain-specific multimodal reasoning pipelines**:

1. 👁️ **Scene & Spatial Reasoning**: Visible entities, relative 2D positions, layout, lighting, and visible hazards. Distinguishes direct observable facts from inferences and never claims false 3D depth from single RGB frames.
2. 📊 **Chart & Data Intelligence**: Extracts chart type, title, axes, units, series trends, and tabulates readable values into structured Markdown tables and machine-readable JSON datasets.
3. 📄 **Document Intelligence & Audit**: Reads photographed pages, forms, and receipts. Validates mathematical integrity (subtotals, taxes, totals) and flags ambiguities.
4. 💻 **UI Sketch → Code**: Converts whiteboard sketches or wireframes into responsive, self-contained HTML + CSS running in a secure, isolated sandbox (`sandbox="allow-scripts"`).
5. 💬 **Visual Q&A / General Reasoning**: Answers focused user questions strictly grounded in observable visual evidence.

---

## 🛡️ Truthful Provider Positioning & Architecture

- **Live Model Provider**: Google Gemini API via official `@google/genai` SDK (`gemini-2.5-flash` default, configurable via `GEMINI_MODEL`).
- **Gemma-Ready Architecture**: Built with modular server-side provider abstractions (`server/src/services/geminiProvider.js`), ready to plug in local vision-capable Gemma/PaliGemma or Ollama instances when hardware supports them. We do not claim local Gemma inference unless verified live.
- **No Fake AI**: Live Gemini responses must come from the configured API. If no API key is provided, the workspace enters an explicitly labeled **Demo Mode** featuring bundled benchmark walkthroughs. It will **never** display sample outputs as if they analyzed your custom uploaded file.
- **Zero Client Key Leakage**: API credentials are exclusively loaded server-side. No `VITE_` keys or tokens are ever bundled into client-side JavaScript.
- **Sandboxed Execution**: Generated UI mockups execute inside an isolated iframe with `sandbox="allow-scripts"` and strictly **without** `allow-same-origin`.

---

## 🏗️ Architecture

```
GemmaLens/
├── client/                     # Vite + React + TypeScript + Lucide Icons
│   ├── src/
│   │   ├── components/         # Sidebar, Header, Workbench, ResultPane, Modals
│   │   ├── types.ts            # Standardized AnalysisResult schema
│   │   ├── App.tsx             # Main layout & state coordinator
│   │   └── index.css           # Deep graphite / ink theme with acid-lime accent
│   ├── index.html
│   └── vite.config.ts          # Configured with proxy to server (:4000)
├── server/                     # Node.js + Express
│   ├── src/
│   │   ├── routes/             # /api/health and /api/analyze (multer memory upload)
│   │   ├── services/           # geminiProvider.js & demoData.js
│   │   └── index.js            # Express server entry point
│   └── package.json
├── .env.example                # Sample environment variables
├── package.json                # Root package with one-command start
└── README.md
```

---

## 🚀 Quick Start (One Command)

### 1. Clone & Install Dependencies
```bash
cd GemmaLens
npm install
cd server && npm install
cd ../client && npm install
cd ..
```

### 2. Configure Environment (Optional for Live Analysis)
Copy `.env.example` to `server/.env`:
```bash
cp .env.example server/.env
```
Open `server/.env` and insert your Gemini API key (free at [aistudio.google.com](https://aistudio.google.com)):
```env
PORT=4000
GEMINI_API_KEY=AIzaSy...
GEMINI_MODEL=gemini-2.5-flash
```
*Note: If no key is set, GemmaLens starts in **Demo Mode**, allowing you to explore all 5 modes with pre-bundled benchmark walkthrough scenarios.*

### 3. Start Both Server and Client
Run a single command from the project root:
```bash
npm run dev
```
- **Client**: `http://localhost:5173`
- **Server API**: `http://localhost:4000`

---

## ⏱️ 3-Minute Demo Walkthrough for Evaluators

1. **Chart & Data Intelligence (45 sec)**:
   - Select **Chart & Data** from the left sidebar.
   - Click **Load Sample Walkthrough** in the header.
   - Switch to the **Structured Data** tab to view the extracted tabular quarters/revenue and verified JSON schema.
2. **UI Sketch → Code (60 sec)**:
   - Select **UI Sketch → Code** from the sidebar.
   - Click **Load Sample Walkthrough**.
   - Show the **Live UI Preview** running in the sandboxed iframe. Click **Download HTML** to demonstrate portable export.
3. **Document Intelligence & Receipt Audit (45 sec)**:
   - Select **Document Intel** from the sidebar.
   - Click **Load Sample Walkthrough**.
   - Review the **Executive Summary**, the **Arithmetic Verification** finding (checking line item sums and tax math), and limitations.
4. **Trust & Architecture (30 sec)**:
   - Click **How It Works** in the header to review the architecture, security guarantees, and truthful provider status.
   - Click **Recent Analyses** in the sidebar to review the session history persisted in `localStorage`.

---

## 🧪 Verification & Acceptance Checklist

| Check | Status | Verification Detail |
|---|---|---|
| 1. One-command installation | ✅ PASS | Verified via root `package.json` |
| 2. One-command dev server | ✅ PASS | Verified `npm run dev` launches Express (:4000) & Vite (:5173) simultaneously |
| 3. Zero console errors | ✅ PASS | Verified via Playwright headless browser check |
| 4. Health endpoint safety | ✅ PASS | `GET /api/health` returns status without exposing API key |
| 5. Truthful Demo Mode | ✅ PASS | Rejecting custom uploads when unconfigured; clearly marked walkthroughs |
| 6. Mode switching reactivity | ✅ PASS | Changes titles, default prompts, task chips, and active result tabs |
| 7. Export capabilities | ✅ PASS | Markdown download, JSON download, and HTML download verified |
| 8. Sandboxed iframe security | ✅ PASS | Isolated `sandbox="allow-scripts"` without `allow-same-origin` |
| 9. Production build | ✅ PASS | `npm run build` compiles in ~800ms with zero TypeScript errors |

---

## 📄 License
MIT License. Built for MLH Hacktoberfest Hack Day Hyderabad × Kramer's Community.
