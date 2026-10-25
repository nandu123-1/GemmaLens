import React from 'react';
import { Menu, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { ServerHealth } from '../types';
import { MulticolorGemLogo, MulticolorSparkles, MulticolorHelp } from './MulticolorIcons';

interface HeaderProps {
  health: ServerHealth | null;
  onLoadSample: () => void;
  onOpenHowItWorks: () => void;
  isProcessing: boolean;
  isNarrow?: boolean;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  health,
  onLoadSample,
  onOpenHowItWorks,
  isProcessing,
  isNarrow,
  onToggleSidebar
}) => {
  const isLive = health?.hasApiKey && health?.mode === 'live';

  return (
    <header style={{
      height: '66px',
      backgroundColor: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      flexShrink: 0,
      zIndex: 20
    }}>
      {/* Title & Pipeline breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {isNarrow && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleSidebar}
            aria-label="Toggle Navigation Menu"
            className="clay-button-elevated"
            style={{
              padding: '7px 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Menu size={16} />
          </motion.button>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            fontSize: '15px',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>Multimodal Reasoning</span>
          </span>

          <span style={{
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 110, 108, 0.16)',
            color: 'var(--accent-coral)',
            border: '1px solid var(--accent-coral-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            boxShadow: 'inset 1px 1px 2px rgba(255, 255, 255, 0.15)'
          }}>
            <Zap size={12} />
            <span>{health?.model || 'gemma-4-26b-a4b-it'}</span>
          </span>
        </div>
      </div>

      {/* Provider Status & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Status Indicator Clay Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          padding: '6px 14px',
          borderRadius: '9999px',
          fontSize: '11px',
          fontWeight: 700,
          backgroundColor: isLive ? 'rgba(251, 221, 116, 0.16)' : 'rgba(245, 158, 11, 0.15)',
          border: `1px solid ${isLive ? 'var(--accent-gold-border)' : 'rgba(245, 158, 11, 0.4)'}`,
          color: isLive ? 'var(--accent-gold)' : '#fbbf24',
          boxShadow: 'inset 1px 1px 2px rgba(255, 255, 255, 0.15)'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: isLive ? 'var(--accent-gold)' : '#fbbf24',
            boxShadow: `0 0 8px ${isLive ? 'var(--accent-gold)' : '#fbbf24'}`
          }} />
          <span>{isLive ? 'Gemma 4 26B (Live Engine)' : 'Offline / Sample Mode'}</span>
        </div>

        {/* Load Sample Benchmark */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={onLoadSample}
          disabled={isProcessing}
          className="clay-button-elevated focus-ring"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 14px',
            fontSize: '12px',
            fontWeight: 700
          }}
        >
          <MulticolorSparkles size={15} />
          <span>Load Benchmark</span>
        </motion.button>

        {/* Pipeline Architecture Help */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={onOpenHowItWorks}
          title="Multimodal Pipeline Architecture"
          className="clay-button-elevated focus-ring"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 12px',
            fontSize: '12px',
            fontWeight: 600
          }}
        >
          <MulticolorHelp size={15} />
          <span>Docs</span>
        </motion.button>
      </div>
    </header>
  );
};
