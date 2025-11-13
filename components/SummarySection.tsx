
import React from 'react';
import { BookOpenIcon } from './icons';

interface SummarySectionProps {
  summary: string;
}

export const SummarySection: React.FC<SummarySectionProps> = ({ summary }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <BookOpenIcon className="w-6 h-6 text-cyan-400 mr-3" />
        <h3 className="text-lg font-semibold text-gray-200">Executive Summary</h3>
      </div>
      <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{summary}</p>
    </div>
  );
};
