import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentDocument, setCurrentDocument] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (role, content, sources = []) => {
    setMessages((prev) => [
      ...prev,
      {
        role,
        content,
        sources,
        timestamp: new Date(),
      },
    ]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const selectDocument = (document) => {
    setCurrentDocument(document);
    clearMessages();
  };

  const value = {
    currentDocument,
    setCurrentDocument: selectDocument,
    messages,
    addMessage,
    clearMessages,
    isLoading,
    setIsLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
