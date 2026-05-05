import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileType } from 'lucide-react';

export default function UploadSection({ onUpload }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndUpload(e.target.files[0]);
    }
  };

  const validateAndUpload = (file) => {
    if (file.type !== 'application/pdf') {
      alert('Please upload a valid .pdf file.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('File size exceeds 2MB limit. Please upload a smaller PDF.');
      return;
    }
    onUpload(file);
    if (inputRef.current) {
        inputRef.current.value = '';
    }
  };

  return (
    <motion.div 
      className="glass-card glass-card-hover" 
      style={{ padding: '2rem', textAlign: 'center' }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div 
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragActive ? 'var(--primary-color)' : 'var(--border-color)'}`,
          borderRadius: 'var(--radius-lg)',
          padding: '4rem 2rem',
          backgroundColor: dragActive ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
          transition: 'var(--transition)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}
        onClick={() => inputRef.current?.click()}
      >
        <motion.div
          animate={dragActive ? { y: -10, scale: 1.1 } : { y: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <UploadCloud size={64} style={{ color: dragActive ? 'var(--primary-color)' : 'var(--text-tertiary)' }} />
        </motion.div>
        
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            Drop your PDF here
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
            Or click to browse from your computer
          </p>
        </div>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          marginTop: '1rem', 
          padding: '0.5rem 1rem', 
          backgroundColor: 'rgba(239, 68, 68, 0.1)', 
          borderRadius: 'var(--radius-full)',
          color: 'var(--danger-color)', 
          fontSize: '0.8rem', 
          fontWeight: 600 
        }}>
          <FileType size={14} />
          Warning: Upload small PDFs (preferably 1 page, max 2MB)
        </div>
      </div>
      <input 
        type="file" 
        accept="application/pdf" 
        ref={inputRef} 
        onChange={handleChange} 
        style={{ display: 'none' }} 
      />
    </motion.div>
  );
}
