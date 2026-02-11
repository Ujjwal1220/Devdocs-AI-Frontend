# DevDocs AI - Frontend

Beautiful React frontend for the DevDocs AI documentation assistant.

## 🎨 Features

- 📤 Drag & Drop document upload
- 💬 Real-time chat interface
- 🎯 Source citations for answers
- 📝 Markdown & code syntax highlighting
- 📱 Responsive design
- ⚡ Fast and intuitive UI

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Backend running on `http://localhost:7777`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on: **http://localhost:3000**

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API Client**: Axios
- **Markdown**: react-markdown
- **Code Highlighting**: react-syntax-highlighter

## 📁 Project Structure

```
src/
├── components/
│   ├── DocumentUpload.jsx   # File upload with drag & drop
│   ├── ChatInterface.jsx    # Main chat UI
│   └── Message.jsx          # Message bubbles with markdown
├── context/
│   └── AppContext.jsx       # Global state management
├── services/
│   └── api.js               # Backend API calls
├── App.jsx                  # Main app component
├── main.jsx                 # Entry point
└── index.css                # Global styles
```

## 🎯 Usage

### 1. Upload Document

1. Click **Upload** tab
2. Drag & drop PDF/TXT file (or click to browse)
3. Wait for processing
4. Document is ready for chat!

### 2. Chat with Document

1. Click **Chat** tab
2. Type your question
3. Get AI-powered answers with sources
4. Click on sources to see relevant chunks

## 🔧 Configuration

Create `.env` file (optional):

Default API URL is `http://localhost:7777/api`

### Add Features

- User authentication
- Multiple documents support
- Conversation history
- Export chat transcripts
- Dark mode toggle

## 🐛 Troubleshooting

**Upload fails:**

- Check file size (max 10MB)
- Only PDF and TXT files supported
- Ensure backend has Pinecone/HuggingFace keys

## 📝 Notes

- MongoDB is disabled in backend (no chat history persistence)
- Each page refresh clears conversation
- Multiple document support coming soon

## 🚀 Next Steps

- [ ] Add user authentication
- [ ] Implement chat history (when MongoDB is enabled)
- [ ] Support multiple documents
- [ ] Add dark mode
- [ ] Export conversations

## 👨‍💻 Author

Ujjwal Mishra
