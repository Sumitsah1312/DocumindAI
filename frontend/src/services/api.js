import { API_BASE_URL } from './config';

export const uploadPdf = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Failed to upload PDF');
  }
  
  return response.json();
};

export const queryAssistant = async (question, sessionId) => {
  const url = new URL(`${API_BASE_URL}/query`);
  // Add params exactly as requested
  url.searchParams.append('session_id', sessionId);
  url.searchParams.append('q', question);
  
  const response = await fetch(url, {
    method: 'GET',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch answer');
  }
  
  return response.json();
};
