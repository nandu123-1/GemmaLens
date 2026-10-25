import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

// 1. Robot Vision - Scene & Spatial Reasoning
export const MulticolorRobotVision: React.FC<IconProps> = ({ size = 20, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <rect x="8" y="14" width="32" height="24" rx="8" fill="url(#bot_body)" />
    <circle cx="18" cy="24" r="4.5" fill="#fbdd74" />
    <circle cx="18" cy="24" r="1.8" fill="#1f1135" />
    <circle cx="30" cy="24" r="4.5" fill="#fbdd74" />
    <circle cx="30" cy="24" r="1.8" fill="#1f1135" />
    <rect x="18" y="32" width="12" height="2.5" rx="1.25" fill="#ff6e6c" />
    <path d="M24 6V14" stroke="#ff6e6c" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="24" cy="5" r="3.5" fill="#fbdd74" />
    <rect x="3" y="21" width="5" height="10" rx="2.5" fill="#67568c" />
    <rect x="40" y="21" width="5" height="10" rx="2.5" fill="#67568c" />
    <defs>
      <linearGradient id="bot_body" x1="8" y1="14" x2="40" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ff6e6c" />
        <stop offset="1" stopColor="#9a3e6a" />
      </linearGradient>
    </defs>
  </svg>
);

// 2. Chart - Analytics & Data Extraction
export const MulticolorChart: React.FC<IconProps> = ({ size = 20, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <rect x="6" y="8" width="36" height="32" rx="8" fill="#2d1a47" stroke="#67568c" strokeWidth="1.5" />
    <rect x="11" y="26" width="6" height="10" rx="3" fill="url(#chart_bar1)" />
    <rect x="21" y="18" width="6" height="18" rx="3" fill="url(#chart_bar2)" />
    <rect x="31" y="13" width="6" height="23" rx="3" fill="url(#chart_bar3)" />
    <path d="M14 22L24 14L34 10" stroke="#fbdd74" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="34" cy="10" r="3" fill="#ffffff" />
    <defs>
      <linearGradient id="chart_bar1" x1="14" y1="26" x2="14" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fbdd74" />
        <stop offset="1" stopColor="#e5a828" />
      </linearGradient>
      <linearGradient id="chart_bar2" x1="24" y1="18" x2="24" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38bdf8" />
        <stop offset="1" stopColor="#0284c7" />
      </linearGradient>
      <linearGradient id="chart_bar3" x1="34" y1="13" x2="34" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ff6e6c" />
        <stop offset="1" stopColor="#e11d48" />
      </linearGradient>
    </defs>
  </svg>
);

// 3. Invoice & Document Intelligence
export const MulticolorInvoice: React.FC<IconProps> = ({ size = 20, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M10 8C10 5.79086 11.7909 4 14 4H34C36.2091 4 38 5.79086 38 8V42L33 39L28 42L24 39L20 42L15 39L10 42V8Z" fill="url(#doc_bg)" />
    <rect x="16" y="12" width="16" height="3" rx="1.5" fill="#1f1135" />
    <rect x="16" y="18" width="12" height="2.5" rx="1.25" fill="#67568c" />
    <rect x="16" y="24" width="16" height="2.5" rx="1.25" fill="#67568c" />
    <rect x="16" y="30" width="10" height="2.5" rx="1.25" fill="#67568c" />
    <circle cx="31" cy="30" r="4.5" fill="#ff6e6c" />
    <path d="M29.5 30L30.8 31.3L33 29" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="doc_bg" x1="10" y1="4" x2="38" y2="42" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" />
        <stop offset="1" stopColor="#e2e0e8" />
      </linearGradient>
    </defs>
  </svg>
);

// 4. Code & Wireframe
export const MulticolorCodeWireframe: React.FC<IconProps> = ({ size = 20, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <rect x="6" y="8" width="36" height="30" rx="8" fill="#1f1135" stroke="#67568c" strokeWidth="2" />
    <rect x="6" y="8" width="36" height="9" rx="8" fill="#2d1a47" />
    <circle cx="12" cy="12.5" r="2.2" fill="#ff6e6c" />
    <circle cx="18" cy="12.5" r="2.2" fill="#fbdd74" />
    <circle cx="24" cy="12.5" r="2.2" fill="#38bdf8" />
    <path d="M16 22L11 27L16 32" stroke="#ff6e6c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M32 22L37 27L32 32" stroke="#fbdd74" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M26 20L22 34" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 5. Visual QA & Bubble Reasoning
export const MulticolorVisualQA: React.FC<IconProps> = ({ size = 20, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M8 20C8 12.268 14.268 6 22 6H26C33.732 6 40 12.268 40 20C40 27.732 33.732 34 26 34H18L10 40V32.8C8.76175 30.6865 8 28.2191 8 25.6V20Z" fill="url(#qa_bubble)" />
    <circle cx="17" cy="20" r="3.5" fill="#fbdd74" />
    <circle cx="24" cy="20" r="3.5" fill="#ffffff" />
    <circle cx="31" cy="20" r="3.5" fill="#ff6e6c" />
    <defs>
      <linearGradient id="qa_bubble" x1="8" y1="6" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7e69a8" />
        <stop offset="1" stopColor="#3d2b59" />
      </linearGradient>
    </defs>
  </svg>
);

// 6. Camera Lens (Webcam frame capture)
export const MulticolorCameraLens: React.FC<IconProps> = ({ size = 20, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <rect x="6" y="14" width="36" height="26" rx="8" fill="url(#cam_body)" stroke="#67568c" strokeWidth="1.5" />
    <path d="M16 14L19 9H29L32 14H16Z" fill="#ff6e6c" />
    <circle cx="24" cy="27" r="8.5" fill="#1f1135" />
    <circle cx="24" cy="27" r="6" fill="#38bdf8" />
    <circle cx="21.5" cy="24.5" r="2.2" fill="#ffffff" />
    <circle cx="34" cy="19" r="2.2" fill="#fbdd74" />
    <defs>
      <linearGradient id="cam_body" x1="6" y1="14" x2="42" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#67568c" />
        <stop offset="1" stopColor="#291b3e" />
      </linearGradient>
    </defs>
  </svg>
);

// 7. Cloud Upload
export const MulticolorCloudUpload: React.FC<IconProps> = ({ size = 24, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M14 36C9.58172 36 6 32.4183 6 28C6 24.0416 8.87114 20.7547 12.6787 20.1247C13.5654 13.916 18.8953 9 25.3333 9C32.329 9 38 14.671 38 21.6667C41.3137 22.3857 44 25.352 44 29C44 32.866 40.866 36 37 36H14Z" fill="url(#cloud_grad)" />
    <path d="M24 19L17 26H22V34H26V26H31L24 19Z" fill="#ffffff" />
    <circle cx="16" cy="18" r="2" fill="#fbdd74" />
    <circle cx="32" cy="16" r="2.5" fill="#38bdf8" />
    <defs>
      <linearGradient id="cloud_grad" x1="6" y1="9" x2="44" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ff6e6c" />
        <stop offset="1" stopColor="#67568c" />
      </linearGradient>
    </defs>
  </svg>
);

// 8. Gem Logo (Brand Icon)
export const MulticolorGemLogo: React.FC<IconProps> = ({ size = 24, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M14 8L34 8L44 19L24 42L4 19L14 8Z" fill="url(#gem_body)" />
    <path d="M14 8L24 19L34 8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 19L44 19" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    <path d="M24 19L24 42" stroke="#fbdd74" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M14 8L4 19L24 42L44 19L34 8" stroke="#1f1135" strokeWidth="1.5" />
    <defs>
      <linearGradient id="gem_body" x1="4" y1="8" x2="44" y2="42" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ff6e6c" />
        <stop offset="0.5" stopColor="#fbdd74" />
        <stop offset="1" stopColor="#67568c" />
      </linearGradient>
    </defs>
  </svg>
);

// 9. Sparkles / AI Reasoning Star
export const MulticolorSparkles: React.FC<IconProps> = ({ size = 20, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M24 4L28 17L41 21L28 25L24 38L20 25L7 21L20 17L24 4Z" fill="url(#sparkle_core)" />
    <path d="M37 31L39 37L45 39L39 41L37 47L35 41L29 39L35 37L37 31Z" fill="#fbdd74" />
    <circle cx="12" cy="38" r="3" fill="#ff6e6c" />
    <circle cx="36" cy="11" r="2.5" fill="#38bdf8" />
    <defs>
      <linearGradient id="sparkle_core" x1="7" y1="4" x2="41" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fbdd74" />
        <stop offset="1" stopColor="#ff6e6c" />
      </linearGradient>
    </defs>
  </svg>
);

// 10. Speech / TTS Voice
export const MulticolorSpeech: React.FC<IconProps> = ({ size = 20, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M8 18H16L27 9V39L16 30H8C6.89543 30 6 29.1046 6 28V20C6 18.8954 6.89543 18 8 18Z" fill="url(#speaker_body)" />
    <path d="M33 16C35.5 18.5 37 21.5 37 24C37 26.5 35.5 29.5 33 32" stroke="#fbdd74" strokeWidth="3" strokeLinecap="round" />
    <path d="M38 11C41.5 14.5 43.5 19 43.5 24C43.5 29 41.5 33.5 38 37" stroke="#ff6e6c" strokeWidth="3" strokeLinecap="round" />
    <circle cx="20" cy="24" r="2.5" fill="#ffffff" />
    <defs>
      <linearGradient id="speaker_body" x1="6" y1="9" x2="27" y2="39" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ff6e6c" />
        <stop offset="1" stopColor="#9b3d68" />
      </linearGradient>
    </defs>
  </svg>
);

// 11. Download / Export Document
export const MulticolorDownload: React.FC<IconProps> = ({ size = 20, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <rect x="8" y="34" width="32" height="6" rx="3" fill="#67568c" />
    <path d="M24 6V28" stroke="#ff6e6c" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M16 21L24 29L32 21" stroke="#fbdd74" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="36" cy="37" r="2" fill="#fbdd74" />
    <circle cx="12" cy="37" r="2" fill="#ff6e6c" />
  </svg>
);

// 12. Copy Overlapping Cards
export const MulticolorCopy: React.FC<IconProps> = ({ size = 20, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <rect x="8" y="8" width="22" height="26" rx="6" fill="#67568c" />
    <rect x="18" y="14" width="22" height="26" rx="6" fill="url(#copy_front)" stroke="#fbdd74" strokeWidth="1.5" />
    <line x1="23" y1="21" x2="35" y2="21" stroke="#1f1135" strokeWidth="2" strokeLinecap="round" />
    <line x1="23" y1="26" x2="32" y2="26" stroke="#67568c" strokeWidth="2" strokeLinecap="round" />
    <line x1="23" y1="31" x2="28" y2="31" stroke="#67568c" strokeWidth="2" strokeLinecap="round" />
    <defs>
      <linearGradient id="copy_front" x1="18" y1="14" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" />
        <stop offset="1" stopColor="#e4e2e9" />
      </linearGradient>
    </defs>
  </svg>
);

// 13. Checkmark Badge
export const MulticolorCheck: React.FC<IconProps> = ({ size = 20, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <circle cx="24" cy="24" r="19" fill="url(#check_grad)" />
    <path d="M15 24L21 30L33 18" stroke="#1f1135" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="check_grad" x1="5" y1="5" x2="43" y2="43" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fbdd74" />
        <stop offset="1" stopColor="#22c55e" />
      </linearGradient>
    </defs>
  </svg>
);

// 14. History Clock
export const MulticolorHistory: React.FC<IconProps> = ({ size = 20, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <circle cx="24" cy="24" r="18" fill="#2d1c4a" stroke="#67568c" strokeWidth="2" />
    <path d="M24 13V24L32 28" stroke="#fbdd74" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 24C8 15.1634 15.1634 8 24 8C29.6 8 34.5 10.9 37.4 15.3" stroke="#ff6e6c" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="24" cy="24" r="2.5" fill="#ff6e6c" />
  </svg>
);

// 15. Shield Verified Fact
export const MulticolorShield: React.FC<IconProps> = ({ size = 20, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M24 5L39 10V22C39 32.5 32.5 39.5 24 43C15.5 39.5 9 32.5 9 22V10L24 5Z" fill="url(#shield_bg)" />
    <path d="M17 22L22 27L31 18" stroke="#1f1135" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="shield_bg" x1="9" y1="5" x2="39" y2="43" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fbdd74" />
        <stop offset="1" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
  </svg>
);

// 16. Warning / Hazard Flag
export const MulticolorWarning: React.FC<IconProps> = ({ size = 20, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M24 6L43 39C43.8 40.4 42.8 42 41.2 42H6.8C5.2 42 4.2 40.4 5 39L24 6Z" fill="url(#warn_bg)" />
    <path d="M24 18V28" stroke="#1f1135" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="24" cy="34" r="2.2" fill="#1f1135" />
    <defs>
      <linearGradient id="warn_bg" x1="5" y1="6" x2="43" y2="42" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fbdd74" />
        <stop offset="1" stopColor="#ff6e6c" />
      </linearGradient>
    </defs>
  </svg>
);

// 17. Help / Guide
export const MulticolorHelp: React.FC<IconProps> = ({ size = 20, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <circle cx="24" cy="24" r="18" fill="#2d1c4a" stroke="#67568c" strokeWidth="2" />
    <path d="M19 18C19 15.2386 21.2386 13 24 13C26.7614 13 29 15.2386 29 18C29 20.3 27.5 21.8 25.8 23C24.8 23.7 24 24.7 24 26" stroke="#fbdd74" strokeWidth="3" strokeLinecap="round" />
    <circle cx="24" cy="33" r="2" fill="#ff6e6c" />
  </svg>
);
