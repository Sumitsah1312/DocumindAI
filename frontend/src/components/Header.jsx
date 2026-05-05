import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, FileText } from 'lucide-react';

export default function Header({ isDark, toggleTheme }) {
  return (
    <motion.header 
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <motion.div 
          style={{ 
            background: 'var(--primary-gradient)', 
            color: 'white', 
            padding: '0.6rem', 
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)'
          }}
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FileText size={28} />
        </motion.div>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em' }}>
            DocuMind AI
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            Upload a PDF and ask questions
          </p>
        </div>
      </div>
      <motion.button 
        className="btn btn-icon" 
        onClick={toggleTheme} 
        aria-label="Toggle theme"
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>
    </motion.header>
  );
}
