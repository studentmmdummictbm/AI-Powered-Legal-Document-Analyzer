
import React from 'react';

export const Loader: React.FC = () => {
  const messages = [
    "Analyzing legal jargon...",
    "Extracting critical clauses...",
    "Assessing potential risks...",
    "Cross-referencing legal standards...",
    "Finalizing report...",
  ];
  const [messageIndex, setMessageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="relative flex justify-center items-center">
          <div className="absolute w-24 h-24 rounded-full animate-spin border-4 border-dashed border-cyan-400"></div>
          <div className="absolute w-16 h-16 rounded-full animate-spin border-4 border-dashed border-cyan-600"></div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-200 mt-8">Analyzing Document</h3>
      <p className="text-gray-400 mt-2 transition-opacity duration-500">{messages[messageIndex]}</p>
    </div>
  );
};
