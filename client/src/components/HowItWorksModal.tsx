import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import {
  MulticolorHelp,
  MulticolorRobotVision,
  MulticolorShield,
  MulticolorSparkles
} from './MulticolorIcons';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(10, 4, 20, 0.85)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '20px'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="clay-card"
        style={{
          width: '100%',
          maxWidth: '620px',
          maxHeight: '85vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MulticolorHelp size={22} />
            <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
              GemmaLens Multimodal Architecture
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="clay-button-elevated"
            style={{ padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={15} />
          </motion.button>
        </div>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '13px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MulticolorSparkles size={16} />
              <span>4-Step Multimodal Reasoning Pipeline</span>
            </h4>
            <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><strong>Visual Ingestion</strong>: Upload an image or PDF (capped at 15 MB) or capture a single camera frame on demand.</li>
              <li><strong>Reasoning Mode Selection</strong>: Choose one of 5 specialized pipelines (Scene, Chart, Document, UI-to-Code, Visual Q&A).</li>
              <li><strong>Server-Side Engine Routing</strong>: The Express backend loads credentials server-side and routes the payload to the official Google GenAI SDK running <strong>Gemma 4 26B</strong> (<code>gemma-4-26b-a4b-it</code>).</li>
              <li><strong>Structured Schema Validation</strong>: Model responses are validated into structured JSON, tabular data, and safe sandboxed HTML preview.</li>
            </ol>
          </div>

          <div className="clay-card-light" style={{ padding: '16px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MulticolorRobotVision size={16} />
              <span>Verified Engine: Gemma 4 26B</span>
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Current live engine is <strong>Google Gemma 4 26B</strong> (<code>models/gemma-4-26b-a4b-it</code>). Inference is verified live against genuine image inputs and outputs parsed schema contracts.
            </p>
          </div>

          <div className="clay-card-light" style={{ padding: '16px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MulticolorShield size={16} />
              <span>Security & Sandbox Guarantees</span>
            </h4>
            <ul style={{ paddingLeft: '18px', fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <li>API keys are strictly server-side; never exposed to browser bundles or client localStorage.</li>
              <li>UI-to-Code generation runs in an isolated <code style={{ color: 'var(--accent-coral)' }}>&lt;iframe sandbox="allow-scripts"&gt;</code> without combining <code style={{ color: 'var(--accent-coral)' }}>allow-same-origin</code>.</li>
              <li>No external databases; session history is lightweight metadata only, never persisting user image bytes.</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
