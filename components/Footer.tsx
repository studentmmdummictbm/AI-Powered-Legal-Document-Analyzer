
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 mt-auto">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 text-center text-gray-500 text-sm">
        <p>
          &copy; {new Date().getFullYear()} AI Legal Document Analyzer. Created by Pratipal Kumar Singh.
        </p>
        <p className="mt-1">
          Disclaimer: This tool is for informational purposes only and does not constitute legal advice.
        </p>
      </div>
    </footer>
  );
};
