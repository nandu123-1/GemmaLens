import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Workbench } from './components/Workbench';
import { ResultPane } from './components/ResultPane';
import { WebcamModal } from './components/WebcamModal';
import { HistoryModal } from './components/HistoryModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { AnalysisMode, AnalysisResult, ServerHealth, HistoryItem } from './types';

const STORAGE_KEY_HISTORY = 'gemmalens_history_v1';

export const App: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<AnalysisMode>('scene');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [question, setQuestion] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isDemoResult, setIsDemoResult] = useState<boolean>(false);
  const [illustrativeNotice, setIllustrativeNotice] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const [health, setHealth] = useState<ServerHealth | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const [isWebcamOpen, setIsWebcamOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [mobileActivePane, setMobileActivePane] = useState<'workbench' | 'result'>('workbench');
  const [isNarrow, setIsNarrow] = useState<boolean>(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsNarrow(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // When result arrives on mobile, auto-switch to result pane
  useEffect(() => {
    if (result && isNarrow) {
      setMobileActivePane('result');
    }
  }, [result, isNarrow]);

  // 1. Fetch Server Health on mount
  useEffect(() => {
    fetchHealth();
    loadHistory();
  }, []);

  const fetchHealth = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data: ServerHealth = await res.json();
        setHealth(data);
      } else {
        setHealth({
          status: 'error',
          provider: 'Unknown',
          model: 'gemma-4-26b-a4b-it',
          hasApiKey: false,
          mode: 'demo',
          message: 'Unable to connect to backend server.',
          maxUploadSizeMb: 15
        });
      }
    } catch (err) {
      console.error('Failed to fetch /api/health:', err);
    }
  };

  const loadHistory = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Error loading history:', err);
    }
  };

  const saveToHistory = (itemResult: AnalysisResult, isDemo: boolean) => {
    try {
      const item: HistoryItem = {
        id: `analysis_${Date.now()}`,
        timestamp: new Date().toISOString(),
        mode: itemResult.mode,
        title: itemResult.title,
        summary: itemResult.summary,
        isDemo,
        result: itemResult
      };
      const updated = [item, ...history].slice(0, 30); // Store up to 30 items
      setHistory(updated);
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
    } catch (err) {
      console.error('Error saving history item:', err);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY_HISTORY);
  };

  // Run Inference Execution
  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please select or upload an image/document before running analysis.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('mode', currentMode);
    if (question && question.trim().length > 0) {
      formData.append('question', question.trim());
    }

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to complete multimodal reasoning analysis.');
      }

      setResult(data.result);
      setIsDemoResult(Boolean(data.isDemo));
      setIllustrativeNotice(data.illustrativeNotice);
      saveToHistory(data.result, Boolean(data.isDemo));
    } catch (err: unknown) {
      console.error('Analysis dispatch failed:', err);
      const errMsg = err instanceof Error ? err.message : 'Unknown error during multimodal analysis.';
      setError(errMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  // Load Built-in Benchmark
  const handleLoadSample = async () => {
    setError(null);
    let sampleFilename = 'scene.png';
    let targetMode: AnalysisMode = currentMode;

    switch (currentMode) {
      case 'scene':
        sampleFilename = 'scene.png';
        break;
      case 'chart':
        sampleFilename = 'chart.png';
        break;
      case 'document':
        sampleFilename = 'receipt.png';
        break;
      case 'ui_to_code':
        sampleFilename = 'ui_sketch.png';
        break;
      case 'qa':
        sampleFilename = 'scene.png';
        break;
    }

    try {
      const res = await fetch(`/samples/${sampleFilename}`);
      if (!res.ok) throw new Error(`Could not load benchmark sample asset: ${sampleFilename}`);
      const blob = await res.blob();
      const file = new File([blob], sampleFilename, { type: blob.type || 'image/png' });
      setSelectedFile(file);
      setCurrentMode(targetMode);
    } catch (err: unknown) {
      console.error('Sample loading failed:', err);
      setError('Failed to load sample benchmark image.');
    }
  };

  const isDemoMode = health?.mode === 'demo' || !health?.hasApiKey;

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: 'var(--bg-ink)' }}>
      {/* Left Navigation Sidebar */}
      <Sidebar
        currentMode={currentMode}
        onSelectMode={(mode) => {
          setCurrentMode(mode);
          setError(null);
        }}
        historyCount={history.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        isDemoMode={isDemoMode}
        isMobile={isNarrow}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Container */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100vh' }}>
        <Header
          health={health}
          onLoadSample={handleLoadSample}
          onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
          isProcessing={isProcessing}
          isNarrow={isNarrow}
          onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        {/* Mobile Pane Switcher if narrow and result exists */}
        {isNarrow && result && (
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-surface)',
            padding: '8px 16px',
            gap: '10px'
          }}>
            <button
              onClick={() => setMobileActivePane('workbench')}
              className={`focus-ring ${mobileActivePane === 'workbench' ? 'clay-pill-active' : 'clay-button-elevated'}`}
              style={{
                flex: 1,
                padding: '8px',
                fontSize: '12px',
                fontWeight: 700,
                color: mobileActivePane === 'workbench' ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              Workbench Input
            </button>
            <button
              onClick={() => setMobileActivePane('result')}
              className={`focus-ring ${mobileActivePane === 'result' ? 'clay-pill-active' : 'clay-button-elevated'}`}
              style={{
                flex: 1,
                padding: '8px',
                fontSize: '12px',
                fontWeight: 700,
                color: mobileActivePane === 'result' ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              Analysis Results
            </button>
          </div>
        )}

        {/* Central Workspace / Results Split */}
        <div style={{
          flex: 1,
          display: isNarrow ? 'flex' : 'grid',
          gridTemplateColumns: !isNarrow ? (result ? '5fr 6fr' : '1fr') : undefined,
          flexDirection: isNarrow ? 'column' : undefined,
          overflow: 'hidden'
        }}>
          {(!isNarrow || mobileActivePane === 'workbench' || !result) && (
            <Workbench
              currentMode={currentMode}
              onSelectMode={(mode) => {
                setCurrentMode(mode);
                setError(null);
              }}
              selectedFile={selectedFile}
              onSelectFile={setSelectedFile}
              question={question}
              onChangeQuestion={setQuestion}
              onAnalyze={handleAnalyze}
              onLoadSample={handleLoadSample}
              onOpenWebcam={() => setIsWebcamOpen(true)}
              isProcessing={isProcessing}
              isDemoMode={isDemoMode}
              error={error}
              onClearError={() => setError(null)}
            />
          )}

          {result && (!isNarrow || mobileActivePane === 'result') && (
            <ResultPane
              result={result}
              isDemo={isDemoResult}
              illustrativeNotice={illustrativeNotice}
              onClear={() => {
                setResult(null);
                setIllustrativeNotice(undefined);
                if (isNarrow) setMobileActivePane('workbench');
              }}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <WebcamModal
        isOpen={isWebcamOpen}
        onClose={() => setIsWebcamOpen(false)}
        onCaptureFrame={(file) => {
          setSelectedFile(file);
          setError(null);
        }}
      />

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        items={history}
        onSelectHistory={(item) => {
          setCurrentMode(item.mode);
          setResult(item.result);
          setIsDemoResult(item.isDemo);
        }}
        onClearHistory={handleClearHistory}
      />

      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />
    </div>
  );
};

export default App;
