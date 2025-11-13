
import React, { useState } from 'react';
import type { AnalysisResult } from '../types';
import { Loader } from './Loader';
import { SummarySection } from './SummarySection';
import { ClausesSection } from './ClausesSection';
import { RisksSection } from './RisksSection';
import { FileTextIcon, AlertTriangleIcon, CheckCircleIcon } from './icons';

interface AnalysisOutputProps {
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
}

type ActiveTab = 'summary' | 'clauses' | 'risks';

export const AnalysisOutput: React.FC<AnalysisOutputProps> = ({ result, isLoading, error }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('summary');

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return (
        <div className="text-center p-8 bg-red-900/20 border border-red-500/50 rounded-lg">
          <AlertTriangleIcon className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-300">Analysis Failed</h3>
          <p className="text-red-400 mt-2">{error}</p>
        </div>
      );
    }
    if (result) {
      return (
        <div>
          <div className="border-b border-gray-700 mb-6">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
              <TabButton
                label="Summary"
                isActive={activeTab === 'summary'}
                onClick={() => setActiveTab('summary')}
              />
              <TabButton
                label={`Key Clauses (${result.clauses.length})`}
                isActive={activeTab === 'clauses'}
                onClick={() => setActiveTab('clauses')}
              />
               <TabButton
                label={`Risk Analysis (${result.risks.length})`}
                isActive={activeTab === 'risks'}
                onClick={() => setActiveTab('risks')}
                hasRisks={result.risks.length > 0}
              />
            </nav>
          </div>
          <div>
            {activeTab === 'summary' && <SummarySection summary={result.summary} />}
            {activeTab === 'clauses' && <ClausesSection clauses={result.clauses} />}
            {activeTab === 'risks' && <RisksSection risks={result.risks} />}
          </div>
        </div>
      );
    }
    return (
      <div className="text-center p-8 bg-gray-800/50 border border-dashed border-gray-600 rounded-lg h-full flex flex-col justify-center items-center">
        <FileTextIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-300">Analysis Results</h3>
        <p className="text-gray-500 mt-2 max-w-sm">
          Your document's summary, extracted clauses, and risk analysis will appear here once the analysis is complete.
        </p>
      </div>
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      {renderContent()}
    </div>
  );
};

const TabButton = ({ label, isActive, onClick, hasRisks = false }: { label: string, isActive: boolean, onClick: () => void, hasRisks?: boolean }) => {
  const activeClasses = 'border-cyan-400 text-cyan-300';
  const inactiveClasses = 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500';
  const riskClasses = hasRisks && !isActive ? 'text-yellow-400' : '';
  
  return (
    <button
      onClick={onClick}
      className={`${
        isActive ? activeClasses : inactiveClasses
      } ${riskClasses} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none`}
    >
      {label}
    </button>
  );
};
