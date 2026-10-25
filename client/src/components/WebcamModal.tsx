import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, RefreshCw, Check, AlertCircle } from 'lucide-react';
import { MulticolorCameraLens, MulticolorCheck } from './MulticolorIcons';

interface WebcamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCaptureFrame: (file: File) => void;
}

export const WebcamModal: React.FC<WebcamModalProps> = ({
  isOpen,
  onClose,
  onCaptureFrame
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedBlob, setCapturedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async () => {
    setError(null);
    setCapturedBlob(null);
    setPreviewUrl(null);
    setIsLoading(true);

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: 'user' }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error('Webcam access error:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('Camera permission denied. Please allow camera access in your browser settings.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setError('No camera device detected on your system.');
      } else {
        setError(`Camera error: ${err.message || 'Unable to open camera.'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const captureFrame = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (blob) {
        setCapturedBlob(blob);
        setPreviewUrl(URL.createObjectURL(blob));
        stopCamera();
      }
    }, 'image/jpeg', 0.92);
  };

  const retake = () => {
    setCapturedBlob(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    startCamera();
  };

  const confirmFrame = () => {
    if (!capturedBlob) return;
    const file = new File([capturedBlob], `camera_frame_${Date.now()}.jpg`, {
      type: 'image/jpeg'
    });
    onCaptureFrame(file);
    onClose();
  };

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
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '18px 22px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MulticolorCameraLens size={22} />
            <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Capture Still Camera Frame
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

        {/* Video / Preview Area */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '340px',
          backgroundColor: '#0a0514',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {isLoading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '13px' }}>
              <RefreshCw size={18} className="animate-spin" />
              <span>Connecting camera device...</span>
            </div>
          )}

          {error && (
            <div style={{
              padding: '20px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              maxWidth: '380px'
            }}>
              <AlertCircle size={28} color="var(--danger-red)" />
              <p style={{ fontSize: '13px', color: '#fecdd3', lineHeight: 1.5 }}>{error}</p>
              <button
                onClick={startCamera}
                className="clay-button-elevated"
                style={{
                  marginTop: '8px',
                  padding: '7px 16px',
                  fontSize: '12px',
                  fontWeight: 700
                }}
              >
                Try Again
              </button>
            </div>
          )}

          {!previewUrl && !error && (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}

          {previewUrl && (
            <img
              src={previewUrl}
              alt="Captured frame"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          )}
        </div>

        {/* Modal Controls */}
        <div style={{
          padding: '16px 22px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--bg-surface)'
        }}>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
            Single frame analysis • No continuous video streaming
          </span>

          <div style={{ display: 'flex', gap: '10px' }}>
            {!previewUrl ? (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={captureFrame}
                disabled={isLoading || Boolean(error)}
                className="clay-button-coral focus-ring"
                style={{
                  padding: '9px 18px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <MulticolorCameraLens size={16} />
                <span>Snap Frame</span>
              </motion.button>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={retake}
                  className="clay-button-elevated focus-ring"
                  style={{
                    padding: '9px 16px',
                    fontSize: '12px',
                    fontWeight: 700
                  }}
                >
                  Retake
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={confirmFrame}
                  className="clay-button-coral focus-ring"
                  style={{
                    padding: '9px 18px',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <MulticolorCheck size={16} />
                  <span>Use This Frame</span>
                </motion.button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
