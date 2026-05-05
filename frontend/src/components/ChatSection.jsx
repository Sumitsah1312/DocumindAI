import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Loader2 } from 'lucide-react';

export default function ChatSection({ messages, isGenerating }) {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isGenerating]);

  if (messages.length === 0 && !isGenerating) return null;

  return (
    <motion.div 
      className="glass-card" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.25rem', 
        flex: 1, 
        overflowY: 'auto',
        maxHeight: '450px',
        scrollbarWidth: 'thin'
      }}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <AnimatePresence initial={false}>
        {messages.map((msg, idx) => {
          const isUser = msg.role === 'user';
          return (
            <motion.div 
              key={idx} 
              style={{ 
                display: 'flex', 
                gap: '0.75rem', 
                alignItems: 'flex-start',
                flexDirection: isUser ? 'row-reverse' : 'row'
              }}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div style={{
                background: isUser ? 'var(--primary-gradient)' : 'var(--surface-color)',
                color: isUser ? 'white' : 'var(--primary-color)',
                padding: '0.6rem',
                borderRadius: 'var(--radius-full)',
                flexShrink: 0,
                border: isUser ? 'none' : '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                {isUser ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div style={{
                background: isUser ? 'var(--user-msg-bg)' : 'var(--ai-msg-bg)',
                padding: '1rem 1.25rem',
                borderRadius: isUser ? '20px 20px 0px 20px' : '20px 20px 20px 0px',
                border: isUser ? 'none' : '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
                maxWidth: '85%',
                fontSize: '0.95rem',
                color: isUser ? 'var(--user-msg-text)' : 'var(--text-primary)',
                lineHeight: 1.7
              }}>
                {msg.content}
              </div>
            </motion.div>
          );
        })}
        
        {isGenerating && (
           <motion.div 
             key="generating"
             style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.9 }}
             transition={{ type: "spring", stiffness: 400, damping: 25 }}
           >
           <div style={{
             background: 'var(--surface-color)',
             color: 'var(--primary-color)',
             padding: '0.6rem',
             borderRadius: 'var(--radius-full)',
             flexShrink: 0,
             border: '1px solid var(--border-color)',
             boxShadow: 'var(--shadow-sm)'
           }}>
             <Bot size={18} />
           </div>
           <div style={{
             background: 'var(--ai-msg-bg)',
             padding: '1rem 1.25rem',
             borderRadius: '20px 20px 20px 0px',
             border: '1px solid var(--border-color)',
             boxShadow: 'var(--shadow-sm)',
             display: 'flex',
             alignItems: 'center',
             gap: '0.75rem'
           }}>
             <Loader2 size={18} style={{ animation: 'spin 1s linear infinite', color: 'var(--primary-color)' }} />
             <motion.span 
              style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
             >
               Analyzing document...
             </motion.span>
           </div>
         </motion.div>
        )}
      </AnimatePresence>
      <div ref={endOfMessagesRef} style={{ height: '1px' }} />
    </motion.div>
  );
}
