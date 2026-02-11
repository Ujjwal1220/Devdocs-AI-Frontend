import { useState } from "react";
import {
  Upload,
  FileText,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { uploadDocument } from "../services/api";
import { useApp } from "../context/AppContext";

const DocumentUpload = ({ onUploadSuccess }) => {
  const { setCurrentDocument } = useApp();
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file) => {
    // Validate file type
    const allowedTypes = ["application/pdf", "text/plain"];
    if (!allowedTypes.includes(file.type)) {
      setUploadStatus({
        type: "error",
        message: "Only PDF and TXT files are supported",
      });
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadStatus({
        type: "error",
        message: "File size must be less than 10MB",
      });
      return;
    }

    setUploading(true);
    setUploadStatus(null);

    try {
      const response = await uploadDocument(file);

      setUploadStatus({
        type: "success",
        message: "Document uploaded! Redirecting to chat...",
      });

      // Set as current document
      setCurrentDocument(response.data);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setUploadStatus(null);
        onUploadSuccess?.(); // Switch to chat tab
      }, 1000);
    } catch (error) {
      setUploadStatus({
        type: "error",
        message:
          error.response?.data?.error || "Upload failed. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${isDragging ? "border-primary-500 bg-primary-50" : "border-gray-300 hover:border-gray-400"}
          ${uploading ? "pointer-events-none opacity-50" : "cursor-pointer"}
        `}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input").click()}
      >
        <input
          id="file-input"
          type="file"
          accept=".pdf,.txt"
          onChange={handleFileSelect}
          className="hidden"
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
            <p className="text-gray-600">Processing document...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="p-4 bg-primary-100 rounded-full">
              <Upload className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                Drop your document here or click to browse
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Supports PDF and TXT files (max 10MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Upload Status */}
      {uploadStatus && (
        <div
          className={`
            mt-4 p-4 rounded-lg flex items-center gap-3
            ${uploadStatus.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}
          `}
        >
          {uploadStatus.type === "success" ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{uploadStatus.message}</span>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
