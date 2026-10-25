import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { HistoryItem } from '../types';
import { MulticolorHistory } from './MulticolorIcons';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: HistoryItem[];
  onSelectHistory: (item: HistoryItem) => void;
  onClearHistory: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  items,
  onSelectHistory,
  onClearHistory
}) => {
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
          maxWidth: '580px',
          maxHeight: '80vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '18px 22px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MulticolorHistory size={20} />
            <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Recent Session Analyses ({items.length})
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

        {/* Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)', fontSize: '13px' }}>
              No recent analyses stored in this session yet.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onSelectHistory(item);
                    onClose();
                  }}
                  className="clay-card-light focus-ring"
                  style={{
                    padding: '14px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{
                        fontSize: '9px',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        padding: '2px 7px',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(255, 110, 108, 0.2)',
                        color: 'var(--accent-coral)',
                        fontFamily: 'var(--font-mono)'
                      }}>
                        {item.mode}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {item.title}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      marginTop: '2px'
                    }}>
                      {item.summary}
                    </div>
                  </div>

                  <ArrowRight size={16} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{
            padding: '14px 22px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--bg-surface)'
          }}>
            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
              Metadata stored in browser localStorage
            </span>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onClearHistory}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: 'var(--danger-dim)',
                border: '1px solid rgba(255, 82, 82, 0.4)',
                color: '#ff8585',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Trash2 size={13} />
              <span>Clear History</span>
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
