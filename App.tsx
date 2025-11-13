
import React, { useState, useCallback } from 'react';
import { DocumentInput } from './components/DocumentInput';
import { AnalysisOutput } from './components/AnalysisOutput';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import type { AnalysisResult } from './types';
import { analyzeDocument } from './services/geminiService';

const App: React.FC = () => {
  const [documentText, setDocumentText] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!documentText.trim()) {
      setError('Please enter some text from a legal document to analyze.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeDocument(documentText);
      setAnalysisResult(result);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to analyze document. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [documentText]);
  
  const handleSetSampleText = (sample: string) => {
    setDocumentText(sample);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          <DocumentInput
            documentText={documentText}
            setDocumentText={setDocumentText}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            onSetSampleText={handleSetSampleText}
          />
          <AnalysisOutput
            result={analysisResult}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
