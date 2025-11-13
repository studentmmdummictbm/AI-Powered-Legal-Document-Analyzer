
import React, { useState } from 'react';
import type { Clause } from '../types';
import { ChevronDownIcon, ClipboardIcon } from './icons';

interface ClausesSectionProps {
  clauses: Clause[];
}

export const ClausesSection: React.FC<ClausesSectionProps> = ({ clauses }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (clauses.length === 0) {
    return <p className="text-gray-400">No key clauses were identified in this document.</p>;
  }

  return (
    <div className="space-y-3">
      {clauses.map((clause, index) => (
        <ClauseItem
          key={index}
          clause={clause}
          isOpen={openIndex === index}
          onToggle={() => toggleAccordion(index)}
        />
      ))}
    </div>
  );
};

const ClauseItem: React.FC<{ clause: Clause; isOpen: boolean; onToggle: () => void }> = ({ clause, isOpen, onToggle }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(clause.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800/50">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-200 hover:bg-gray-700/50"
      >
        <span>{clause.type}</span>
        <ChevronDownIcon
          className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 border-t border-gray-700">
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{clause.text}</p>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleCopy}
              className="flex items-center text-sm text-gray-400 hover:text-cyan-400 transition-colors focus:outline-none"
            >
              <ClipboardIcon className="w-4 h-4 mr-2" />
              {copied ? 'Copied!' : 'Copy Text'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
