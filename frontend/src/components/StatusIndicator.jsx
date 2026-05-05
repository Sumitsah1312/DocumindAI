import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, AlertCircle, FileText, RefreshCw } from 'lucide-react';

export default function StatusIndicator({ status, fileName, message, onUpload }) {
  if (status === 'idle') return null;

  return (
    <motion.div 
      className="glass-card" 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '1.25rem 1.5rem' 
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          background: status === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)',
          color: status === 'error' ? 'var(--danger-color)' : 'var(--primary-color)',
          padding: '0.75rem',
          borderRadius: 'var(--radius-lg)'
        }}>
          {status === 'uploading' || status === 'processing' ? (
            <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} />
          ) : status === 'error' ? (
            <AlertCircle size={24} />
          ) : (
            <CheckCircle2 size={24} />
          )}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
            {status === 'uploading' && 'Uploading PDF...'}
            {status === 'processing' && 'Analyzing Document...'}
            {status === 'ready' && 'Document Active'}
            {status === 'error' && 'Error Uploading'}
          </span>
          {fileName && (
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.1rem' }}>
              <FileText size={14} />
              {fileName}
            </div>
          )}
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {message && (
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ fontSize: '0.85rem', color: 'var(--primary-color)', fontStyle: 'italic', background: 'rgba(99, 102, 241, 0.1)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-full)' }}
            >
              {message}
            </motion.div>
          </AnimatePresence>
        )}
        
        <div style={{ position: 'relative' }}>
          <input 
            type="file" 
            accept="application/pdf" 
            id="reupload" 
            style={{ display: 'none' }} 
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                onUpload(e.target.files[0]);
              }
            }}
          />
          <motion.label 
            htmlFor="reupload"
            className="btn btn-icon"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.6rem 1rem', borderRadius: 'var(--radius-full)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw size={16} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Replace</span>
          </motion.label>
        </div>
      </div>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
}
