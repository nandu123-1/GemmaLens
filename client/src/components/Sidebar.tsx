import React from 'react';
import { motion } from 'framer-motion';
import { AnalysisMode } from '../types';
import {
  MulticolorRobotVision,
  MulticolorChart,
  MulticolorInvoice,
  MulticolorCodeWireframe,
  MulticolorVisualQA,
  MulticolorGemLogo,
  MulticolorHistory
} from './MulticolorIcons';

interface SidebarProps {
  currentMode: AnalysisMode;
  onSelectMode: (mode: AnalysisMode) => void;
  historyCount: number;
  onOpenHistory: () => void;
  isDemoMode: boolean;
  isMobile?: boolean;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

const MODES: Array<{
  id: AnalysisMode;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge: string;
  desc: string;
}> = [
  { id: 'scene', label: 'Scene & Spatial', icon: MulticolorRobotVision, badge: 'Vision', desc: 'Objects & hazard layout' },
  { id: 'chart', label: 'Chart & Data', icon: MulticolorChart, badge: 'Analytics', desc: 'Extract trends & tables' },
  { id: 'document', label: 'Document Intel', icon: MulticolorInvoice, badge: 'OCR/Audit', desc: 'Invoices, text & math' },
  { id: 'ui_to_code', label: 'UI Sketch → Code', icon: MulticolorCodeWireframe, badge: 'Frontend', desc: 'Sandboxed HTML+CSS' },
  { id: 'qa', label: 'Visual Q&A', icon: MulticolorVisualQA, badge: 'Reasoning', desc: 'Grounded QA & logic' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentMode,
  onSelectMode,
  historyCount,
  onOpenHistory,
  isDemoMode,
  isMobile,
  isOpenMobile,
  onCloseMobile
}) => {
  return (
    <>
      {isMobile && isOpenMobile && (
        <div
          onClick={onCloseMobile}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(10, 4, 20, 0.75)',
            backdropFilter: 'blur(5px)',
            zIndex: 140
          }}
        />
      )}
      <aside style={{
        width: '270px',
        backgroundColor: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        height: '100vh',
        position: isMobile ? 'fixed' : 'relative',
        left: isMobile ? (isOpenMobile ? 0 : '-290px') : 0,
        top: 0,
        zIndex: isMobile ? 150 : 'auto',
        transition: isMobile ? 'left 0.28s cubic-bezier(0.16, 1, 0.3, 1)' : 'none'
      }}>
        {/* Brand Header */}
        <div style={{
          padding: '20px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <motion.div
            whileHover={{ rotate: 12, scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #2d1c4a 0%, #1f1135 100%)',
              border: '1px solid var(--accent-coral-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--clay-elevated-shadow)',
              flexShrink: 0
            }}
          >
            <MulticolorGemLogo size={28} />
          </motion.div>
          <div>
            <div style={{
              fontSize: '17px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>GemmaLens</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Visual Intelligence Workspace
            </div>
          </div>
        </div>

        {/* Mode Navigation */}
        <div style={{ padding: '16px 14px', flex: 1, overflowY: 'auto' }}>
          <div style={{
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontWeight: 700,
            color: 'var(--text-tertiary)',
            padding: '0 8px 10px 8px'
          }}>
            Reasoning Pipelines
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {MODES.map((mode) => {
              const Icon = mode.icon;
              const isActive = currentMode === mode.id;

              return (
                <motion.button
                  key={mode.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onSelectMode(mode.id);
                    if (isMobile) onCloseMobile?.();
                  }}
                  className={`focus-ring ${isActive ? 'clay-pill-active' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    border: isActive ? '1px solid rgba(255, 110, 108, 0.45)' : '1px solid transparent',
                    backgroundColor: isActive ? 'transparent' : 'transparent',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isActive ? 'rgba(255, 110, 108, 0.2)' : 'var(--bg-elevated)',
                    boxShadow: isActive ? 'inset 1px 1px 3px rgba(255, 255, 255, 0.2)' : 'var(--clay-inset-shadow)',
                    flexShrink: 0
                  }}>
                    <Icon size={20} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: isActive ? 700 : 600,
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span>{mode.label}</span>
                      <span style={{
                        fontSize: '9px',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: '9999px',
                        backgroundColor: isActive ? 'var(--accent-coral)' : 'var(--bg-elevated)',
                        color: isActive ? '#ffffff' : 'var(--text-tertiary)',
                        textTransform: 'uppercase'
                      }}>
                        {mode.badge}
                      </span>
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: 'var(--text-tertiary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      marginTop: '1px'
                    }}>
                      {mode.desc}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* Footer Audit History & Info */}
        <div style={{
          padding: '16px 14px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          backgroundColor: 'var(--bg-surface)'
        }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenHistory}
            className="clay-button-elevated focus-ring"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              fontSize: '12px',
              fontWeight: 700,
              width: '100%'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MulticolorHistory size={18} />
              <span>Session History</span>
            </div>
            <span style={{
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(251, 221, 116, 0.2)',
              color: 'var(--accent-gold)'
            }}>
              {historyCount}
            </span>
          </motion.button>

          {isDemoMode && (
            <div style={{
              padding: '8px 12px',
              borderRadius: '10px',
              backgroundColor: 'rgba(251, 221, 116, 0.1)',
              border: '1px solid var(--accent-gold-border)',
              fontSize: '11px',
              color: 'var(--accent-gold)',
              lineHeight: 1.4
            }}>
              Demo mode active (Offline sample datasets available)
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
