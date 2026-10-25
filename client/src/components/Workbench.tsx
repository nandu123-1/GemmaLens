import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  RefreshCw,
  FileText,
  AlertCircle,
  Maximize2
} from 'lucide-react';
import { AnalysisMode } from '../types';
import {
  MulticolorRobotVision,
  MulticolorChart,
  MulticolorInvoice,
  MulticolorCodeWireframe,
  MulticolorVisualQA,
  MulticolorCloudUpload,
  MulticolorCameraLens,
  MulticolorSparkles
} from './MulticolorIcons';

interface WorkbenchProps {
  currentMode: AnalysisMode;
  onSelectMode: (mode: AnalysisMode) => void;
  selectedFile: File | null;
  onSelectFile: (file: File | null) => void;
  question: string;
  onChangeQuestion: (q: string) => void;
  onAnalyze: () => void;
  onLoadSample: () => void;
  onOpenWebcam: () => void;
  isProcessing: boolean;
  isDemoMode: boolean;
  error: string | null;
  onClearError: () => void;
}

const MODE_META: Record<AnalysisMode, {
  title: string;
  description: string;
  defaultPrompt: string;
  chips: string[];
  icon: React.ComponentType<{ size?: number; className?: string }>;
}> = {
  scene: {
    title: 'Scene & Spatial Reasoning',
    description: 'Deconstruct visible entities, 2D relative spatial positions, and environmental safety hazards.',
    defaultPrompt: 'Identify all primary objects, their spatial arrangement, and assess potential hazards or notable scene characteristics.',
    chips: [
      'Assess spatial clearance & obstacles',
      'Distinguish facts from inferences',
      'Check safety hazards and warning signs'
    ],
    icon: MulticolorRobotVision
  },
  chart: {
    title: 'Chart & Data Intelligence',
    description: 'Extract axes, units, series trends, and numerical values from graphs, plots, and architecture diagrams into structured tables.',
    defaultPrompt: 'Identify the chart type, extract visible data series into a table, and explain key trends and outliers.',
    chips: [
      'Extract the visible series & main trend',
      'Tabulate all readable numeric data',
      'Identify highest/lowest outliers'
    ],
    icon: MulticolorChart
  },
  document: {
    title: 'Document Intelligence & Audit',
    description: 'Read and audit text, headings, dates, and tables from photographed pages, receipts, and invoices. Validates math integrity.',
    defaultPrompt: 'Summarize this document, extract key entities and dates, and audit any calculations or line items.',
    chips: [
      'Summarize key facts and dates',
      'Audit line items & check math',
      'Extract structured metadata'
    ],
    icon: MulticolorInvoice
  },
  ui_to_code: {
    title: 'UI Sketch → Code',
    description: 'Convert whiteboard wireframes, napkin sketches, or UI screenshots into clean, standalone HTML + CSS executable inside an isolated sandbox.',
    defaultPrompt: 'Analyze this UI layout, typography, and visual hierarchy, then generate a self-contained responsive HTML + CSS component.',
    chips: [
      'Generate responsive HTML + CSS',
      'Extract color palette & tokens',
      'Map component hierarchy'
    ],
    icon: MulticolorCodeWireframe
  },
  qa: {
    title: 'Visual Q&A / General Reasoning',
    description: 'Ask specific questions grounded in observable visual details with explicit uncertainty reporting.',
    defaultPrompt: 'Explain what is happening in this image and what is most notable or unusual about it.',
    chips: [
      'What is the primary action occurring here?',
      'Are there any anomalies or defects?',
      'What immediate action is recommended?'
    ],
    icon: MulticolorVisualQA
  }
};

const BENCHMARKS = [
  { id: 'scene', label: 'Robotics Scene', filename: 'scene.png', icon: MulticolorRobotVision, mode: 'scene' as AnalysisMode },
  { id: 'chart', label: 'Revenue Chart', filename: 'chart.png', icon: MulticolorChart, mode: 'chart' as AnalysisMode },
  { id: 'receipt', label: 'Café Invoice', filename: 'receipt.png', icon: MulticolorInvoice, mode: 'document' as AnalysisMode },
  { id: 'ui', label: 'UI Wireframe', filename: 'ui_sketch.png', icon: MulticolorCodeWireframe, mode: 'ui_to_code' as AnalysisMode },
];

export const Workbench: React.FC<WorkbenchProps> = ({
  currentMode,
  onSelectMode,
  selectedFile,
  onSelectFile,
  question,
  onChangeQuestion,
  onAnalyze,
  onLoadSample,
  onOpenWebcam,
  isProcessing,
  isDemoMode,
  error,
  onClearError
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const meta = MODE_META[currentMode];
  const ModeIcon = meta.icon;

  // Multi-step loading progression
  useEffect(() => {
    let timer1: ReturnType<typeof setTimeout>;
    let timer2: ReturnType<typeof setTimeout>;
    if (isProcessing) {
      setProcessingStep(1);
      timer1 = setTimeout(() => setProcessingStep(2), 1200);
      timer2 = setTimeout(() => setProcessingStep(3), 3200);
    } else {
      setProcessingStep(0);
    }
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isProcessing]);

  // Global Clipboard Paste Support (Ctrl+V / Cmd+V for images)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!e.clipboardData || !e.clipboardData.items) return;
      for (let i = 0; i < e.clipboardData.items.length; i++) {
        const item = e.clipboardData.items[i];
        if (item.type.indexOf('image') !== -1) {
          const blob = item.getAsFile();
          if (blob) {
            const pastedFile = new File([blob], `clipboard_image_${Date.now()}.png`, { type: blob.type });
            validateAndSetFile(pastedFile);
            e.preventDefault();
            break;
          }
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  // Hotkey support: Ctrl+Enter / Cmd+Enter to dispatch analysis
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (selectedFile && !isProcessing) {
          e.preventDefault();
          onAnalyze();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedFile, isProcessing, onAnalyze]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    onClearError();
    const maxBytes = 15 * 1024 * 1024;
    if (file.size > maxBytes) {
      alert(`File size exceeds 15 MB limit (${(file.size / (1024 * 1024)).toFixed(1)} MB). Please select a smaller file.`);
      return;
    }
    onSelectFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const loadBenchmarkSample = async (filename: string, targetMode: AnalysisMode) => {
    try {
      onSelectMode(targetMode);
      onClearError();
      const res = await fetch(`/samples/${filename}`);
      if (!res.ok) throw new Error(`Sample ${filename} could not be loaded.`);
      const blob = await res.blob();
      const file = new File([blob], filename, { type: blob.type || 'image/png' });
      onSelectFile(file);
    } catch (err: unknown) {
      console.error('Error loading sample benchmark:', err);
    }
  };

  // Preview URL for uploaded image
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }
    if (selectedFile.type.startsWith('image/')) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        padding: '24px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        height: '100%'
      }}
    >
      {/* Mode Title & Clay Banner */}
      <div className="clay-card" style={{ padding: '20px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #2d1c4a 0%, #1f1135 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--clay-inset-shadow)'
              }}>
                <ModeIcon size={22} />
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                {meta.title}
              </h2>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.5, maxWidth: '640px' }}>
              {meta.description}
            </p>
          </div>

          <div style={{
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            padding: '5px 12px',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, rgba(255, 110, 108, 0.2) 0%, rgba(251, 221, 116, 0.15) 100%)',
            color: 'var(--accent-gold)',
            border: '1px solid var(--accent-gold-border)',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            boxShadow: 'inset 1px 1px 2px rgba(255, 255, 255, 0.15)'
          }}>
            Engine: Gemma 4 26B
          </div>
        </div>
      </div>

      {/* Benchmark Selector Pills */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
          <span>Quick Benchmark Datasets</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
          {BENCHMARKS.map((bm) => {
            const BmIcon = bm.icon;
            const isSelected = selectedFile?.name === bm.filename;
            return (
              <motion.button
                key={bm.id}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => loadBenchmarkSample(bm.filename, bm.mode)}
                className={`focus-ring ${isSelected ? 'clay-pill-active' : 'clay-button-elevated'}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 12px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                <BmIcon size={16} />
                <span>{bm.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Error Alert if any */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              padding: '12px 16px',
              borderRadius: '14px',
              backgroundColor: 'var(--danger-dim)',
              border: '1px solid rgba(255, 82, 82, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: '#fecdd3',
              boxShadow: 'var(--clay-inset-shadow)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertCircle size={18} color="var(--danger-red)" />
              <span>{error}</span>
            </div>
            <button
              onClick={onClearError}
              style={{ background: 'none', border: 'none', color: '#fecdd3', cursor: 'pointer' }}
            >
              <X size={15} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visual Upload / Input Box */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)' }}>
            Visual Input (Image or PDF)
          </label>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenWebcam}
            className="clay-button-elevated focus-ring"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              fontSize: '11px',
              fontWeight: 700
            }}
          >
            <MulticolorCameraLens size={14} />
            <span>Open Camera Frame</span>
          </motion.button>
        </div>

        <input
          id="visual-file-input"
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {!selectedFile ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            className="clay-inset"
            style={{
              padding: '36px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              borderColor: isDragOver ? 'var(--accent-coral)' : 'rgba(103, 86, 140, 0.3)',
              backgroundColor: isDragOver ? 'rgba(255, 110, 108, 0.1)' : 'var(--bg-inset)',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #2d1c4a 0%, #1f1135 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--clay-elevated-shadow)',
              marginBottom: '14px'
            }}>
              <MulticolorCloudUpload size={32} />
            </div>

            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Drag & Drop Image or PDF here
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <label
                htmlFor="visual-file-input"
                className="clay-button-coral focus-ring"
                style={{
                  fontSize: '12px',
                  padding: '7px 18px',
                  display: 'inline-block',
                  cursor: 'pointer'
                }}
              >
                Browse Files
              </label>
            </div>

            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Supports PNG, JPG, WEBP, GIF, PDF up to 15 MB • Paste (⌘V) enabled
            </div>
          </div>
        ) : (
          <div className="clay-card-light" style={{
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0 }}>
              {previewUrl ? (
                <div style={{ position: 'relative' }}>
                  <img
                    src={previewUrl}
                    alt="Upload preview"
                    style={{
                      width: '68px',
                      height: '68px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      border: '1px solid var(--accent-coral-border)',
                      cursor: 'pointer',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.4)'
                    }}
                    onClick={() => setIsFullscreenPreview(true)}
                  />
                  <button
                    onClick={() => setIsFullscreenPreview(true)}
                    title="Enlarge preview"
                    style={{
                      position: 'absolute',
                      right: '3px',
                      bottom: '3px',
                      backgroundColor: 'rgba(10, 4, 20, 0.8)',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#ffffff',
                      padding: '3px',
                      cursor: 'pointer'
                    }}
                  >
                    <Maximize2 size={11} />
                  </button>
                </div>
              ) : (
                <div style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-elevated)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-gold)',
                  boxShadow: 'var(--clay-inset-shadow)'
                }}>
                  <FileText size={28} />
                </div>
              )}

              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {selectedFile.name}
                </div>
                <div style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-secondary)',
                  marginTop: '4px'
                }}>
                  {(selectedFile.size / 1024).toFixed(1)} KB • {selectedFile.type || 'PDF/Binary'}
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSelectFile(null)}
              className="clay-button-elevated"
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)'
              }}
              title="Remove file"
            >
              <X size={15} />
            </motion.button>
          </div>
        )}
      </div>

      {/* Query Formulation Input */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)' }}>
            Reasoning Query / Direct Prompt
          </label>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
            Optional
          </span>
        </div>

        <textarea
          rows={3}
          value={question}
          onChange={(e) => onChangeQuestion(e.target.value)}
          placeholder={meta.defaultPrompt}
          className="clay-inset focus-ring"
          style={{
            width: '100%',
            padding: '14px 16px',
            fontSize: '13px',
            color: 'var(--text-primary)',
            resize: 'vertical',
            outline: 'none',
            lineHeight: 1.5
          }}
        />

        {/* Example Task Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {meta.chips.map((chip, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onChangeQuestion(chip)}
              className="clay-button-elevated focus-ring"
              style={{
                padding: '5px 12px',
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--text-secondary)'
              }}
            >
              {chip}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Execution Action Button */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
        <motion.button
          whileHover={{ scale: selectedFile && !isProcessing ? 1.02 : 1 }}
          whileTap={{ scale: selectedFile && !isProcessing ? 0.98 : 1 }}
          onClick={onAnalyze}
          disabled={!selectedFile || isProcessing}
          className="clay-button-coral focus-ring"
          style={{
            flex: 1,
            padding: '16px 24px',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          {isProcessing ? (
            <>
              <RefreshCw size={18} className="animate-spin" />
              <span>
                {processingStep === 1 && "Preparing visual input..."}
                {processingStep === 2 && "Gemma 4 26B multimodal reasoning..."}
                {processingStep >= 3 && "Structuring validated output..."}
              </span>
            </>
          ) : (
            <>
              <MulticolorSparkles size={20} />
              <span>Run Gemma 4 26B ({meta.title})</span>
              <span style={{ fontSize: '11px', opacity: 0.8, fontFamily: 'var(--font-mono)', padding: '2px 6px', borderRadius: '4px', background: 'rgba(0,0,0,0.2)' }}>⌘↵</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Fullscreen Preview Modal */}
      {isFullscreenPreview && previewUrl && (
        <div
          onClick={() => setIsFullscreenPreview(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(10, 4, 20, 0.9)',
            backdropFilter: 'blur(8px)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <img
            src={previewUrl}
            alt="Fullscreen preview"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              borderRadius: '16px',
              boxShadow: '0 25px 60px -10px rgba(0,0,0,0.9)',
              border: '1px solid var(--accent-coral-border)'
            }}
          />
        </div>
      )}
    </motion.div>
  );
};
