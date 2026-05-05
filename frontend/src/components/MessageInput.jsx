import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function MessageInput({ onSend, disabled, isGenerating }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled && !isGenerating) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="glass-card"
      style={{ 
        display: 'flex', 
        gap: '0.75rem', 
        padding: '1rem',
        alignItems: 'center'
      }}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={disabled ? 'Please upload a document to begin...' : 'Ask a question about the document...'}
        disabled={disabled || isGenerating}
        style={{
          flex: 1,
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--surface-color)',
          color: 'var(--text-primary)',
          outline: 'none',
          transition: 'var(--transition)',
          fontSize: '0.95rem',
          boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)'
        }}
        onFocus={(e) => { e.target.style.borderColor = 'var(--primary-color)'; e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.2)'; }}
        onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.boxShadow = 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)'; }}
      />
      <motion.button 
        type="submit" 
        className="btn btn-primary" 
        disabled={!input.trim() || disabled || isGenerating}
        style={{ padding: '0.85rem 1.5rem', borderRadius: 'var(--radius-xl)' }}
        whileHover={(!input.trim() || disabled || isGenerating) ? {} : { scale: 1.05 }}
        whileTap={(!input.trim() || disabled || isGenerating) ? {} : { scale: 0.95 }}
      >
        <Send size={18} />
        <span style={{ marginLeft: '0.25rem' }}>Ask</span>
      </motion.button>
    </motion.form>
  );
}
