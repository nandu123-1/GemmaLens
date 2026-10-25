import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Table,
  Code2,
  VolumeX,
  X
} from 'lucide-react';
import { AnalysisResult } from '../types';
import {
  MulticolorSpeech,
  MulticolorDownload,
  MulticolorCopy,
  MulticolorCheck,
  MulticolorShield,
  MulticolorWarning,
  MulticolorSparkles,
  MulticolorHelp
} from './MulticolorIcons';

interface ResultPaneProps {
  result: AnalysisResult;
  isDemo: boolean;
  illustrativeNotice?: string;
  onClear: () => void;
}

export const ResultPane: React.FC<ResultPaneProps> = ({
  result,
  isDemo,
  illustrativeNotice,
  onClear
}) => {
  const [activeTab, setActiveTab] = useState<'insights' | 'data' | 'code'>(
    result.html ? 'code' : 'insights'
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Stop speech if component unmounts or result changes
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [result]);

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const narration = `${result.title}. ${result.summary}. Key finding: ${
      result.findings?.[0]?.detail || ''
    }`;

    const utterance = new SpeechSynthesisUtterance(narration);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadMarkdown = () => {
    let md = `# ${result.title}\n\n`;
    md += `**Model**: Gemma 4 26B Multimodal\n`;
    md += `**Pipeline Mode**: ${result.mode}\n\n`;
    md += `## Executive Summary\n${result.summary}\n\n`;

    if (result.findings && result.findings.length > 0) {
      md += `## Findings & Evidence\n`;
      result.findings.forEach((f) => {
        md += `### ${f.label} (${f.confidence ? `Confidence: ${f.confidence}` : 'Observed'})\n`;
        md += `${f.detail}\n`;
        if (f.evidence) md += `*Evidence*: ${f.evidence}\n`;
        md += `\n`;
      });
    }

    if (result.table) {
      md += `## Extracted Tabular Data\n`;
      md += `| ${result.table.columns.join(' | ')} |\n`;
      md += `| ${result.table.columns.map(() => '---').join(' | ')} |\n`;
      result.table.rows.forEach((row) => {
        md += `| ${row.map((cell) => (cell !== null && cell !== undefined ? String(cell) : '')).join(' | ')} |\n`;
      });
      md += `\n`;
    }

    if (result.limitations && result.limitations.length > 0) {
      md += `## Limitations & Caveats\n`;
      result.limitations.forEach((l) => (md += `- ${l}\n`));
      md += `\n`;
    }

    downloadFile(md, `gemmalens_${result.mode}_${Date.now()}.md`, 'text/markdown');
  };

  const handleDownloadJSON = () => {
    downloadFile(
      JSON.stringify(result, null, 2),
      `gemmalens_${result.mode}_${Date.now()}.json`,
      'application/json'
    );
  };

  const handleDownloadHTML = () => {
    if (!result.html) return;
    downloadFile(result.html, `gemmalens_ui_${Date.now()}.html`, 'text/html');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-surface)',
        borderLeft: '1px solid var(--border-subtle)',
        overflow: 'hidden'
      }}
    >
      {/* Result Header Bar */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        gap: '12px'
      }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: '9999px',
              backgroundColor: isDemo ? 'rgba(251, 221, 116, 0.16)' : 'rgba(255, 110, 108, 0.16)',
              color: isDemo ? 'var(--accent-gold)' : 'var(--accent-coral)',
              border: `1px solid ${isDemo ? 'var(--accent-gold-border)' : 'var(--accent-coral-border)'}`,
              boxShadow: 'inset 1px 1px 2px rgba(255, 255, 255, 0.15)'
            }}>
              {isDemo ? 'Walkthrough Benchmark' : 'Live Gemma 4 26B Output'}
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600 }}>
              Mode: {result.mode}
            </span>
          </div>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginTop: '4px',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {result.title}
          </h3>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Audio Voiceover Readout */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={toggleSpeech}
            title={isSpeaking ? 'Stop voiceover' : 'Read analysis aloud (TTS)'}
            className={`focus-ring ${isSpeaking ? 'clay-button-coral' : 'clay-button-elevated'}`}
            style={{
              padding: '7px 12px',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {isSpeaking ? <VolumeX size={14} /> : <MulticolorSpeech size={14} />}
            <span>{isSpeaking ? 'Stop' : 'Voice'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleDownloadMarkdown}
            title="Download formatted Markdown report"
            className="clay-button-elevated focus-ring"
            style={{
              padding: '7px 12px',
              fontSize: '11px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <MulticolorDownload size={14} />
            <span>Markdown</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleDownloadJSON}
            title="Download full JSON structure"
            className="clay-button-elevated focus-ring"
            style={{
              padding: '7px 12px',
              fontSize: '11px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <MulticolorDownload size={14} />
            <span>JSON</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClear}
            className="clay-button-elevated focus-ring"
            style={{
              padding: '7px 10px',
              color: 'var(--text-tertiary)'
            }}
            title="Close results"
          >
            <X size={15} />
          </motion.button>
        </div>
      </div>

      {/* Illustrative Notice Banner if this is Demo mode */}
      {isDemo && (
        <div style={{
          padding: '8px 20px',
          backgroundColor: 'rgba(251, 221, 116, 0.1)',
          borderBottom: '1px solid var(--accent-gold-border)',
          fontSize: '11px',
          color: 'var(--accent-gold)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <MulticolorSparkles size={14} />
          <span>
            {illustrativeNotice || "Illustrative sample walkthrough data. Upload your own image or PDF above for live Gemma 4 26B inference."}
          </span>
        </div>
      )}

      {/* View Tabs */}
      <div
        role="tablist"
        aria-label="Result View Tabs"
        style={{
          padding: '10px 20px 0 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: '12px',
          flexShrink: 0
        }}
      >
        <button
          role="tab"
          aria-selected={activeTab === 'insights'}
          aria-controls="panel-insights"
          id="tab-insights"
          onClick={() => setActiveTab('insights')}
          className={`focus-ring ${activeTab === 'insights' ? 'clay-pill-active' : ''}`}
          style={{
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: 700,
            border: activeTab === 'insights' ? '1px solid var(--accent-coral-border)' : '1px solid transparent',
            color: activeTab === 'insights' ? 'var(--text-primary)' : 'var(--text-secondary)',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FileText size={15} color={activeTab === 'insights' ? 'var(--accent-coral)' : 'var(--text-secondary)'} />
          <span>Insights & Evidence</span>
        </button>

        <button
          role="tab"
          aria-selected={activeTab === 'data'}
          aria-controls="panel-data"
          id="tab-data"
          onClick={() => setActiveTab('data')}
          className={`focus-ring ${activeTab === 'data' ? 'clay-pill-active' : ''}`}
          style={{
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: 700,
            border: activeTab === 'data' ? '1px solid var(--accent-coral-border)' : '1px solid transparent',
            color: activeTab === 'data' ? 'var(--text-primary)' : 'var(--text-secondary)',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Table size={15} color={activeTab === 'data' ? 'var(--accent-coral)' : 'var(--text-secondary)'} />
          <span>Structured Data</span>
        </button>

        {result.html && (
          <button
            role="tab"
            aria-selected={activeTab === 'code'}
            aria-controls="panel-code"
            id="tab-code"
            onClick={() => setActiveTab('code')}
            className={`focus-ring ${activeTab === 'code' ? 'clay-pill-active' : ''}`}
            style={{
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: 700,
              border: activeTab === 'code' ? '1px solid var(--accent-coral-border)' : '1px solid transparent',
              color: activeTab === 'code' ? 'var(--text-primary)' : 'var(--text-secondary)',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Code2 size={15} color={activeTab === 'code' ? 'var(--accent-coral)' : 'var(--text-secondary)'} />
            <span>Live UI Preview</span>
          </button>
        )}
      </div>

      {/* Tab Panels */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {activeTab === 'insights' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Executive Summary Clay Card */}
            <div className="clay-card" style={{ padding: '20px' }}>
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--text-tertiary)',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ color: 'var(--accent-gold)' }}>Executive Summary</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => copyToClipboard(result.summary, 'summary')}
                  title="Copy summary"
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                >
                  {copiedKey === 'summary' ? <MulticolorCheck size={16} /> : <MulticolorCopy size={16} />}
                </motion.button>
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                {result.summary}
              </p>
            </div>

            {/* Findings & Evidence */}
            {result.findings && result.findings.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--text-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <MulticolorShield size={16} />
                  <span>Detailed Findings & Observable Evidence</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {result.findings.map((f, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="clay-card-light"
                      style={{ padding: '16px' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {f.label}
                        </span>
                        {f.confidence && (
                          <span style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '9999px',
                            backgroundColor: f.confidence === 'high' ? 'rgba(56, 189, 248, 0.16)' : 'rgba(251, 221, 116, 0.16)',
                            color: f.confidence === 'high' ? 'var(--accent-cyan)' : 'var(--accent-gold)',
                            border: `1px solid ${f.confidence === 'high' ? 'rgba(56, 189, 248, 0.4)' : 'var(--accent-gold-border)'}`,
                            boxShadow: 'inset 1px 1px 2px rgba(255, 255, 255, 0.1)'
                          }}>
                            {f.confidence.toUpperCase()} CONFIDENCE
                          </span>
                        )}
                      </div>

                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: f.evidence ? '10px' : '0' }}>
                        {f.detail}
                      </p>

                      {f.evidence && (
                        <div className="clay-inset" style={{
                          fontSize: '11px',
                          color: 'var(--accent-gold)',
                          padding: '8px 12px',
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: '6px'
                        }}>
                          <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Evidence:</span>
                          <span>{f.evidence}</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Extracted Text (if present) */}
            {result.extractedText && (
              <div className="clay-card" style={{ padding: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
                  Extracted Raw Text / OCR
                </div>
                <pre className="clay-inset" style={{
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  whiteSpace: 'pre-wrap',
                  padding: '12px'
                }}>
                  {result.extractedText}
                </pre>
              </div>
            )}

            {/* Limitations & Uncertainty Caveats */}
            {result.limitations && result.limitations.length > 0 && (
              <div className="clay-card" style={{
                padding: '16px',
                border: '1px solid rgba(255, 110, 108, 0.35)'
              }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--accent-coral)',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <MulticolorWarning size={16} />
                  <span>Limitations & Observation Caveats</span>
                </div>
                <ul style={{ paddingLeft: '20px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {result.limitations.map((l, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{l}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggested Follow-Ups */}
            {result.followUpQuestions && result.followUpQuestions.length > 0 && (
              <div className="clay-card-light" style={{ padding: '16px' }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--text-tertiary)',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <MulticolorHelp size={16} />
                  <span>Suggested Next Inquiries</span>
                </div>
                <ul style={{ paddingLeft: '20px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {result.followUpQuestions.map((q, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{q}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'data' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Table View */}
            {result.table ? (
              <div className="clay-card" style={{ overflow: 'hidden' }}>
                <div style={{
                  padding: '14px 20px',
                  borderBottom: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Extracted Tabular Data
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--accent-gold)', fontWeight: 600 }}>
                    {result.table.rows.length} rows • {result.table.columns.length} columns
                  </span>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-subtle)' }}>
                        {result.table.columns.map((col, idx) => (
                          <th key={idx} style={{ padding: '12px 16px', color: 'var(--accent-coral)', fontWeight: 700 }}>
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.table.rows.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          style={{
                            borderBottom: '1px solid var(--border-subtle)',
                            backgroundColor: rIdx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.02)'
                          }}
                        >
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>
                              {cell !== null && cell !== undefined ? String(cell) : '—'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="clay-card" style={{
                padding: '32px',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                fontSize: '13px'
              }}>
                No tabular data extracted for this mode.
              </div>
            )}

            {/* JSON Schema View */}
            <div className="clay-card" style={{ padding: '20px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px'
              }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Validated JSON Structure
                </span>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => copyToClipboard(JSON.stringify(result.json || result, null, 2), 'json')}
                  className="clay-button-elevated focus-ring"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    fontSize: '11px',
                    fontWeight: 700
                  }}
                >
                  {copiedKey === 'json' ? <MulticolorCheck size={14} /> : <MulticolorCopy size={14} />}
                  <span>{copiedKey === 'json' ? 'Copied' : 'Copy JSON'}</span>
                </motion.button>
              </div>

              <pre className="clay-inset" style={{
                fontSize: '11px',
                color: 'var(--text-secondary)',
                padding: '16px',
                overflowX: 'auto',
                lineHeight: 1.5
              }}>
                {JSON.stringify(result.json || result, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'code' && result.html && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
            {/* Sandboxed Iframe Container */}
            <div className="clay-card" style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minHeight: '460px'
            }}>
              <div style={{
                padding: '12px 18px',
                borderBottom: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-elevated)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MulticolorShield size={16} />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Isolated Sandboxed Preview (sandbox="allow-scripts")
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => copyToClipboard(result.html || '', 'html')}
                    className="clay-button-elevated focus-ring"
                    style={{
                      padding: '5px 10px',
                      fontSize: '11px',
                      fontWeight: 700
                    }}
                  >
                    {copiedKey === 'html' ? 'Copied' : 'Copy HTML'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleDownloadHTML}
                    className="clay-button-coral focus-ring"
                    style={{
                      padding: '5px 12px',
                      fontSize: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <MulticolorDownload size={13} />
                    <span>Download HTML</span>
                  </motion.button>
                </div>
              </div>

              {/* Sandboxed Iframe */}
              <iframe
                srcDoc={result.html}
                title="Sandboxed UI preview"
                sandbox="allow-scripts"
                style={{
                  width: '100%',
                  flex: 1,
                  minHeight: '420px',
                  border: 'none',
                  backgroundColor: '#0a0514'
                }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
