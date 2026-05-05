import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import StatusIndicator from './components/StatusIndicator';
import ChatSection from './components/ChatSection';
import MessageInput from './components/MessageInput';
import { uploadPdf, queryAssistant } from './services/api';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [session, setSession] = useState({
    id: null,
    fileName: null,
    status: 'idle', // idle, uploading, ready, error
    message: null,
  });
  const [messages, setMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleUpload = async (file) => {
    if (session.id) {
      setMessages([]);
      setSession(prev => ({ 
        ...prev, 
        status: 'uploading', 
        fileName: file.name, 
        message: 'Previous session cleared. New document loaded.' 
      }));
    } else {
      setSession({ id: null, fileName: file.name, status: 'uploading', message: null });
    }

    try {
      const data = await uploadPdf(file);
      setSession(prev => ({
        ...prev,
        id: data.session_id,
        status: 'ready',
      }));
    } catch (error) {
      setSession(prev => ({ ...prev, status: 'error', message: 'Failed to upload document.' }));
    }
  };

  const handleSendQuery = async (question) => {
    if (!session.id) return;

    setMessages(prev => [...prev, { role: 'user', content: question }]);
    setIsGenerating(true);

    try {
      const data = await queryAssistant(question, session.id);
      setMessages(prev => [...prev, { role: 'ai', content: data.answer || data.response || 'No answer received.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: 'Sorry, I encountered an error fetching the answer.' }]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="app-container">
      <Header isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      
      <main style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, position: 'relative' }}>
        <AnimatePresence mode="wait">
          {session.status === 'idle' ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <UploadSection onUpload={handleUpload} />
            </motion.div>
          ) : (
            <motion.div
              key="status"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <StatusIndicator 
                status={session.status} 
                fileName={session.fileName} 
                message={session.message} 
                onUpload={handleUpload}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <ChatSection messages={messages} isGenerating={isGenerating} />
      </main>

      <footer style={{ marginTop: 'auto', paddingBottom: '1rem' }}>
        <MessageInput 
          onSend={handleSendQuery} 
          disabled={session.status !== 'ready'} 
          isGenerating={isGenerating} 
        />
      </footer>
    </div>
  );
}
