import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { sendChatMessage } from "../services/api";
import Message from "./Message";

const ChatInterface = () => {
  const { currentDocument, messages, addMessage, isLoading, setIsLoading } =
    useApp();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim() || !currentDocument || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    // Add user message
    addMessage("user", userMessage);

    try {
      // Build messages array for context
      const chatHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Send to backend
      const response = await sendChatMessage(
        userMessage,
        currentDocument.documentId,
        chatHistory,
      );

      // Add AI response
      addMessage("assistant", response.data.message);
    } catch (error) {
      console.error("Chat error:", error);
      addMessage(
        "assistant",
        "Sorry, I encountered an error. Please try again.",
        [],
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentDocument) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-2">No document selected</p>
          <p className="text-sm text-gray-500">
            Upload a document to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4 bg-white">
        <h2 className="text-lg font-semibold text-gray-900">
          {currentDocument.fileName}
        </h2>
        <p className="text-sm text-gray-500">
          Ask me anything about this document
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md">
              <p className="text-gray-600 mb-4">
                Start a conversation about "{currentDocument.fileName}"
              </p>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <button
                  onClick={() => setInput("What is this document about?")}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
                >
                  What is this document about?
                </button>
                <button
                  onClick={() => setInput("Summarize the main points")}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
                >
                  Summarize the main points
                </button>
                <button
                  onClick={() => setInput("Explain the key concepts")}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
                >
                  Explain the key concepts
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}
            {isLoading && (
              <div className="flex gap-4 mb-6">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-lg px-4 py-3">
                    <p className="text-gray-600">Thinking...</p>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 px-6 py-4 bg-white">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about the document..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
