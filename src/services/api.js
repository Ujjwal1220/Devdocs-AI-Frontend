import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Upload a document (PDF or TXT)
 * @param {File} file - File to upload
 * @returns {Promise} - Upload response with documentId
 */
export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/**
 * Send a chat message (RAG-powered)
 * @param {string} message - User message
 * @param {string} documentId - Document ID to query
 * @param {Array} messages - Previous messages for context
 * @returns {Promise} - AI response with sources
 */
export const sendChatMessage = async (message, documentId, messages = []) => {
  const response = await api.post("/chat", {
    message,
    documentId,
    messages,
  });

  return response.data;
};

/**
 * Get all uploaded documents
 * @returns {Promise} - List of documents
 */
export const getDocuments = async () => {
  const response = await api.get("/documents");
  return response.data;
};

/**
 * Get a specific document
 * @param {string} documentId - Document ID
 * @returns {Promise} - Document details
 */
export const getDocument = async (documentId) => {
  const response = await api.get(`/documents/${documentId}`);
  return response.data;
};

/**
 * Delete a document
 * @param {string} documentId - Document ID
 * @returns {Promise} - Deletion confirmation
 */
export const deleteDocument = async (documentId) => {
  const response = await api.delete(`/documents/${documentId}`);
  return response.data;
};

export default api;
