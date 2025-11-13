import React, { useRef, useState } from 'react';
import { SparklesIcon, UploadIcon } from './icons';
import { sampleLegalText } from '../constants';
import mammoth from 'mammoth';

interface DocumentInputProps {
  documentText: string;
  setDocumentText: (text: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  onSetSampleText: (text: string) => void;
}

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const DocumentInput: React.FC<DocumentInputProps> = ({
  documentText,
  setDocumentText,
  onAnalyze,
  isLoading,
  onSetSampleText,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const readPdfFile = async (file: File): Promise<string> => {
    // Dynamically import pdf.js to prevent it from blocking initial app load
    const pdfjsLib = await import('pdfjs-dist');
    // Set the workerSrc for pdf.js just-in-time. This is required for it to work.
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.170/build/pdf.worker.min.mjs`;
    
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => ('str' in item ? item.str : '')).join(' ');
      fullText += pageText + '\n';
    }
    return fullText;
  };

  const readDocxFile = async (file: File): Promise<string> => {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const { value } = await mammoth.extractRawText({ arrayBuffer });
    return value;
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    setDocumentText('');

    // Cleanup function to reset state and file input
    const cleanup = () => {
        setIsUploading(false);
        if (event.target) {
          event.target.value = '';
        }
    };

    // File validation
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setUploadError(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`);
      cleanup();
      return;
    }

    const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf');
    const isDocx = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.name.endsWith('.docx');

    if (!isPdf && !isDocx) {
      setUploadError('Unsupported file type. Please upload a PDF or DOCX file.');
      cleanup();
      return;
    }

    try {
      let text = '';
      if (isPdf) {
        text = await readPdfFile(file);
      } else if (isDocx) {
        text = await readDocxFile(file);
      }
      
      if (!text.trim()) {
        throw new Error('Could not extract any text. The document might be empty, corrupted, image-based, or password-protected.');
      }
      
      setDocumentText(text);
    } catch (error: unknown) {
      console.error('File processing error:', error);
      let message = 'An unknown error occurred during file processing.';
       if (error instanceof Error) {
        if (error.name === 'PasswordException') {
           message = 'Failed to read PDF. The document is password-protected.';
        } else {
           message = error.message;
        }
      }
      setUploadError(message);
    } finally {
      cleanup();
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col h-full lg:sticky lg:top-24">
      <h2 className="text-xl font-semibold mb-2 text-gray-200">Legal Document Input</h2>
       <p className="text-sm text-gray-400 mb-4">
        Upload a document, load a sample, or paste the text directly into the editor below.
      </p>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        disabled={isLoading || isUploading}
      />

      <div className="grid grid-cols-2 gap-4 mb-4">
        <button
          onClick={handleUploadClick}
          disabled={isLoading || isUploading}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-colors"
        >
          <UploadIcon className="w-5 h-5 mr-2" />
          {isUploading ? 'Processing...' : 'Upload File'}
        </button>
        <button 
            onClick={() => onSetSampleText(sampleLegalText)} 
            disabled={isLoading || isUploading}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-colors"
        >
            Load Sample
        </button>
      </div>
      
      {uploadError && <p className="text-sm text-red-400 mb-2 text-center">{uploadError}</p>}
      <p className="text-xs text-gray-500 mb-4 text-center">Supported formats: PDF, DOCX (Max {MAX_FILE_SIZE_MB}MB)</p>


      <textarea
        value={documentText}
        onChange={(e) => setDocumentText(e.target.value)}
        placeholder="Enter document text here, or upload a file..."
        className="flex-grow w-full p-4 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-gray-300 resize-none"
        rows={15}
        disabled={isLoading || isUploading}
      />
      <button
        onClick={onAnalyze}
        disabled={isLoading || isUploading || !documentText.trim()}
        className="mt-6 w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:scale-100"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="http://www.w3.org/2000/svg">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5 mr-2" />
            Analyze Document
          </>
        )}
      </button>
    </div>
  );
};