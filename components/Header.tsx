
import React from 'react';
import { ScaleIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 flex items-center">
        <ScaleIcon className="w-8 h-8 text-cyan-400 mr-3" />
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          AI Legal Document Analyzer
        </h1>
      </div>
    </header>
  );
};
