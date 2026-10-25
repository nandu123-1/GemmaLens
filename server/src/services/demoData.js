/**
 * GemmaLens Bundled Sample Walkthrough Datasets
 * Explicitly marked as illustrative benchmark scenarios.
 * Never used to pretend analyzing an arbitrary user upload.
 */

export const DEMO_SCENARIOS = {
  scene: {
    mode: "scene",
    title: "Robotics Research Facility & AMR Inspection",
    summary: "Visual inspection confirms an Autonomous Mobile Robot (AMR) positioned within an indoor robotics laboratory. Active LiDAR telemetry and clear safety floor demarcations are observed.",
    findings: [
      {
        label: "Autonomous Chassis",
        detail: "Industrial-grade brushed aluminum chassis with dual direct-drive wheels and front bumper array.",
        evidence: "Visible center-frame with designation 'CYBER-NAV 2026 - UNIT 04'.",
        confidence: "high"
      },
      {
        label: "LiDAR Telemetry Mast",
        detail: "Elevated sensor mast with rotating LiDAR puck emitting active scan indicators.",
        evidence: "Mast elevation approx 25cm above top plate, cyan ring illuminated.",
        confidence: "high"
      },
      {
        label: "Safety Demarcation",
        detail: "High-contrast yellow and black hazard lines guide navigation boundaries.",
        evidence: "Striped boundary pattern clearly visible on polyurethane test floor.",
        confidence: "high"
      },
      {
        label: "Spatial Layout Assessment",
        detail: "Unobstructed travel path detected forward; engineering benches positioned to the rear right.",
        evidence: "Workbench with dual monitors visible in background with >2m clearance.",
        confidence: "medium"
      }
    ],
    extractedText: "CYBER-NAV 2026 - UNIT 04\nLASER SAFETY LEVEL 1 ZONE\nTEST LAB SECTOR B",
    limitations: [
      "Exact metric 3D depth, distance to obstacle, and speed cannot be determined from a single RGB camera frame.",
      "Internal sensor calibration cannot be validated purely from visual exterior appearance."
    ],
    followUpQuestions: [
      "Would you like an inspection focused specifically on sensor mounting brackets?",
      "Should we verify floor hazard tape compliance against ISO 3691-4 industrial standards?"
    ]
  },

  chart: {
    mode: "chart",
    title: "Quarterly AI Revenue & P99 Latency Benchmark (2026)",
    summary: "Dual-axis analytics chart tracking quarterly AI Cloud Revenue ($ Millions) against P99 inference latency (milliseconds) from Q1 2026 through Q4 2026.",
    findings: [
      {
        label: "Chart Type & Structure",
        detail: "Combination bar and line plot with fiscal quarters on X-axis and dual Y-axes.",
        evidence: "Green bars represent Revenue ($M); red line represents P99 latency (ms).",
        confidence: "high"
      },
      {
        label: "Revenue Acceleration",
        detail: "AI Cloud Revenue expanded from $14.2M in Q1 to $38.9M in Q4 (+174% total growth).",
        evidence: "Sequential quarterly bars: Q1 ($14.2M), Q2 ($19.8M), Q3 ($27.4M), Q4 ($38.9M).",
        confidence: "high"
      },
      {
        label: "Latency Reduction",
        detail: "Inference latency dropped from 142ms down to 52ms (-63% reduction) through model optimizations.",
        evidence: "Plotted red markers: Q1 (142ms), Q2 (118ms), Q3 (84ms), Q4 (52ms).",
        confidence: "high"
      }
    ],
    table: {
      columns: ["Quarter", "Revenue ($M)", "P99 Latency (ms)", "Sequential Growth"],
      rows: [
        ["Q1 2026", 14.2, 142, "Baseline"],
        ["Q2 2026", 19.8, 118, "+39.4%"],
        ["Q3 2026", 27.4, 84, "+38.4%"],
        ["Q4 2026", 38.9, 52, "+42.0%"]
      ]
    },
    json: {
      chartType: "combo_bar_line",
      timeframe: "FY2026",
      metrics: {
        revenue_unit: "USD_Millions",
        latency_unit: "milliseconds"
      },
      datapoints: [
        { quarter: "Q1", revenue_m: 14.2, p99_latency_ms: 142 },
        { quarter: "Q2", revenue_m: 19.8, p99_latency_ms: 118 },
        { quarter: "Q3", revenue_m: 27.4, p99_latency_ms: 84 },
        { quarter: "Q4", revenue_m: 38.9, p99_latency_ms: 52 }
      ],
      net_growth_percentage: 173.9,
      latency_improvement_percentage: 63.4
    },
    limitations: [
      "Values are extracted from labeled visualization data; raw backend CSV data is not attached.",
      "Regional geographic revenue breakdown is omitted in the visual source."
    ],
    followUpQuestions: [
      "Do you want to project Q1 2027 revenue based on the current trajectory?",
      "Would you like to cross-reference this with GPU cluster hardware utilization?"
    ]
  },

  document: {
    mode: "document",
    title: "Commercial Café Invoice & Tax Audit Summary",
    summary: "Itemized tax receipt issued by Artisan Roast & Labs, Hyderabad. All line items, subtotal, and dual GST percentages have been validated.",
    findings: [
      {
        label: "Vendor Identification",
        detail: "Artisan Roast & Labs, Jubilee Hills, Hyderabad (GSTIN: 36AAACG1234F1Z8).",
        evidence: "Header block printed clearly at top of document.",
        confidence: "high"
      },
      {
        label: "Arithmetic Verification",
        detail: "Subtotal ₹900.00 + CGST (2.5%) ₹22.50 + SGST (2.5%) ₹22.50 = ₹945.00 Grand Total.",
        evidence: "Line items sum: (240x2) + 180 + 160 + (40x2) = 900.00. Tax math is exact.",
        confidence: "high"
      },
      {
        label: "Audit Integrity",
        detail: "Invoice serial #84920 with valid timestamp 25-Oct-2026 10:14 AM and cashier ID.",
        evidence: "Receipt metadata section, no evidence of alterations or missing required legal fields.",
        confidence: "high"
      }
    ],
    extractedText: "ARTISAN ROAST & LABS\nJubilee Hills, Hyderabad\nGSTIN: 36AAACG1234F1Z8\nDate: 25-Oct-2026 10:14 AM\nINV: #84920\n\nEthiopian Cold Brew (Bottle) x2 - ₹480.00\nAlmond Croissant (Artisanal) x1 - ₹180.00\nDouble Shot Espresso (Dark) x1 - ₹160.00\nOat Milk Upgrade x2 - ₹80.00\n\nSUBTOTAL: ₹900.00\nCGST (2.5%): ₹22.50\nSGST (2.5%): ₹22.50\nGRAND TOTAL: ₹945.00",
    table: {
      columns: ["Item Description", "Qty", "Unit Price", "Total Price"],
      rows: [
        ["Ethiopian Cold Brew", 2, "₹240.00", "₹480.00"],
        ["Almond Croissant", 1, "₹180.00", "₹180.00"],
        ["Double Shot Espresso", 1, "₹160.00", "₹160.00"],
        ["Oat Milk Upgrade", 2, "₹40.00", "₹80.00"]
      ]
    },
    json: {
      invoiceId: "84920",
      vendor: "Artisan Roast & Labs",
      gstin: "36AAACG1234F1Z8",
      date: "2026-10-25T10:14:00+05:30",
      currency: "INR",
      subtotal: 900.0,
      tax_cgst: 22.5,
      tax_sgst: 22.5,
      grandTotal: 945.0,
      mathVerification: "PASSED"
    },
    limitations: [
      "Payment method signature line is cropped off at the bottom margin.",
      "Verification confirms arithmetic and visual presence of tax ID; does not check government portal status."
    ],
    followUpQuestions: [
      "Would you like an export of this invoice formatted for expense filing?",
      "Do you want to audit additional receipts in batch?"
    ]
  },

  ui_to_code: {
    mode: "ui_to_code",
    title: "Mobile Telemetry Card Mockup to HTML/CSS",
    summary: "Synthesized responsive dark-mode telemetry card with KPI counter, progress indicators, quick-action toggles, and primary CTA button.",
    findings: [
      {
        label: "Visual Layout Hierarchy",
        detail: "Single-column mobile card structure with rounded corners, pill badges, and grid actions.",
        evidence: "32px corner radius container, header row with live pill, KPI card, 2-column actions, bottom button.",
        confidence: "high"
      },
      {
        label: "Color System",
        detail: "Slate/graphite dark surfaces (#0F172A, #020617) with electric emerald/chartreuse accents (#10B981, #34D399).",
        evidence: "Detected background, container border, and accent button highlights.",
        confidence: "high"
      },
      {
        label: "Semantic Components",
        detail: "Live node badge, numerical throughput metric (48.2 tokens/s), dual system triggers, and full-width CTA.",
        evidence: "All labels and buttons correspond to observed interface elements.",
        confidence: "high"
      }
    ],
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #020617;
      color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 16px;
    }
    .card {
      width: 100%;
      max-width: 380px;
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 24px;
      padding: 24px;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .title-group { display: flex; align-items: center; gap: 12px; }
    .avatar {
      width: 40px; height: 40px; border-radius: 12px;
      background: linear-gradient(135deg, #10b981, #06b6d4);
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: 18px; color: #020617;
    }
    .badge {
      font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 9999px;
      background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);
    }
    .metric-box {
      background: #020617;
      border: 1px solid #1e293b;
      border-radius: 16px;
      padding: 16px;
      margin-bottom: 16px;
    }
    .metric-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; }
    .metric-value { font-size: 32px; font-weight: 800; color: #ffffff; margin: 4px 0; }
    .metric-unit { font-size: 13px; color: #34d399; font-weight: 600; margin-left: 6px; }
    .bar-bg { width: 100%; height: 6px; background: #1e293b; border-radius: 999px; overflow: hidden; margin-top: 10px; }
    .bar-fill { width: 78%; height: 100%; background: linear-gradient(90deg, #10b981, #38bdf8); }
    .actions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
    .action-btn {
      background: #1e293b; border: 1px solid #334155; border-radius: 14px;
      padding: 12px; color: #f1f5f9; text-align: left; cursor: pointer;
    }
    .action-btn:hover { background: #334155; }
    .cta-btn {
      width: 100%; padding: 14px; background: #10b981; color: #020617;
      font-weight: 700; font-size: 14px; border: none; border-radius: 14px;
      cursor: pointer; transition: opacity 0.2s;
    }
    .cta-btn:hover { opacity: 0.9; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="title-group">
        <div class="avatar">G</div>
        <div>
          <div style="font-size: 14px; font-weight: 700;">Gemma Node 01</div>
          <div style="font-size: 11px; color: #94a3b8;">Cluster: Hyd-DC-West</div>
        </div>
      </div>
      <div class="badge">● LIVE</div>
    </div>

    <div class="metric-box">
      <div class="metric-label">Throughput Capacity</div>
      <div style="display: flex; align-items: baseline;">
        <span class="metric-value">48.2</span>
        <span class="metric-unit">tokens/sec</span>
      </div>
      <div class="bar-bg"><div class="bar-fill"></div></div>
      <div style="display: flex; justify-content: space-between; font-size: 10px; color: #64748b; margin-top: 8px;">
        <span>VRAM: 6.2 / 8.0 GB</span>
        <span>Temp: 44°C</span>
      </div>
    </div>

    <div class="actions-grid">
      <button class="action-btn">
        <div style="font-size: 16px; margin-bottom: 4px;">⚡</div>
        <div style="font-size: 12px; font-weight: 600;">Re-quantize</div>
        <div style="font-size: 10px; color: #94a3b8;">INT4 / FP8</div>
      </button>
      <button class="action-btn">
        <div style="font-size: 16px; margin-bottom: 4px;">🔄</div>
        <div style="font-size: 12px; font-weight: 600;">Flush Cache</div>
        <div style="font-size: 10px; color: #94a3b8;">Free 1.4 GB</div>
      </button>
    </div>

    <button class="cta-btn">Initiate Multimodal Stream →</button>
  </div>
</body>
</html>`,
    limitations: [
      "Generated code matches layout and styling visually; backend state hooks must be added by developers.",
      "No external dependencies used to ensure self-contained, offline-safe execution."
    ],
    followUpQuestions: [
      "Would you like this component converted to a React TypeScript (.tsx) component?",
      "Do you want to add hover and active micro-animations to the action cards?"
    ]
  },

  qa: {
    mode: "qa",
    title: "Multimodal Inquiry & Evidence Analysis",
    summary: "Visual reasoning confirms that the central subject exhibits active operational indicators under controlled lab illumination.",
    findings: [
      {
        label: "Visual Grounding",
        detail: "Inspection of high-frequency edge gradients confirms a matte-anodized finish without micro-fractures.",
        evidence: "Even reflection gradients across the chassis surface.",
        confidence: "high"
      },
      {
        label: "Operational State",
        detail: "Active luminescence along sensor rings indicates active sensor sampling.",
        evidence: "Cyan glow pattern consistent with operational ROS 2 node status.",
        confidence: "medium"
      }
    ],
    limitations: [
      "Conclusions are derived strictly from visible optical spectrum reflections in this single image.",
      "Thermal performance cannot be validated without infrared camera imagery."
    ],
    followUpQuestions: [
      "Would you like to examine another perspective angle of this setup?",
      "Should we evaluate mechanical clearance against nearby obstacles?"
    ]
  }
};
