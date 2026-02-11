import { useState } from "react";
import { AppProvider } from "./context/AppContext";
import DocumentUpload from "./components/DocumentUpload";
import ChatInterface from "./components/ChatInterface";
import { FileText, MessageSquare } from "lucide-react";

function App() {
  const [showUpload, setShowUpload] = useState(true);

  return (
    <AppProvider>
      <div className="h-screen flex flex-col bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-500 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">DevDocs AI</h1>
                <p className="text-sm text-gray-500">
                  Intelligent Documentation Assistant
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowUpload(true)}
                className={`
                  px-4 py-2 rounded-lg flex items-center gap-2 transition-colors
                  ${showUpload ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
                `}
              >
                <FileText className="w-4 h-4" />
                Upload
              </button>
              <button
                onClick={() => setShowUpload(false)}
                className={`
                  px-4 py-2 rounded-lg flex items-center gap-2 transition-colors
                  ${!showUpload ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
                `}
              >
                <MessageSquare className="w-4 h-4" />
                Chat
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-hidden">
          {showUpload ? (
            <div className="h-full flex items-center justify-center">
              <DocumentUpload onUploadSuccess={() => setShowUpload(false)} />
            </div>
          ) : (
            <ChatInterface />
          )}
        </main>

        <footer className="bg-white border-t border-gray-200 px-6 py-3">
          <p className="text-xs text-gray-500 text-center">
            Powered by HuggingFace, Groq, and Pinecone • Built by Ujjwal Mishra
          </p>
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;
