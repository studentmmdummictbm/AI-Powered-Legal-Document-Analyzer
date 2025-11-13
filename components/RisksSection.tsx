
import React from 'react';
import type { Risk } from '../types';
import { AlertTriangleIcon, AlertCircleIcon, CheckCircleIcon, InfoIcon } from './icons';

interface RisksSectionProps {
  risks: Risk[];
}

const riskStyles = {
  High: {
    icon: <AlertTriangleIcon className="w-5 h-5 text-red-400" />,
    borderColor: 'border-red-500/50',
    bgColor: 'bg-red-900/20',
    textColor: 'text-red-300',
  },
  Medium: {
    icon: <AlertCircleIcon className="w-5 h-5 text-yellow-400" />,
    borderColor: 'border-yellow-500/50',
    bgColor: 'bg-yellow-900/20',
    textColor: 'text-yellow-300',
  },
  Low: {
    icon: <CheckCircleIcon className="w-5 h-5 text-green-400" />,
    borderColor: 'border-green-500/50',
    bgColor: 'bg-green-900/20',
    textColor: 'text-green-300',
  },
  Informational: {
    icon: <InfoIcon className="w-5 h-5 text-blue-400" />,
    borderColor: 'border-blue-500/50',
    bgColor: 'bg-blue-900/20',
    textColor: 'text-blue-300',
  },
};

export const RisksSection: React.FC<RisksSectionProps> = ({ risks }) => {

  if (risks.length === 0) {
    return <p className="text-gray-400">No potential risks were identified in this document.</p>;
  }

  return (
    <div className="space-y-4">
      {risks.map((risk, index) => {
        const styles = riskStyles[risk.level] || riskStyles.Informational;
        return (
          <div key={index} className={`border ${styles.borderColor} ${styles.bgColor} rounded-lg p-4`}>
            <div className="flex items-center mb-3">
              {styles.icon}
              <h4 className={`ml-2 font-semibold ${styles.textColor}`}>{risk.level} Risk</h4>
            </div>
            <div className="space-y-3">
              <div>
                <h5 className="text-sm font-semibold text-gray-400 mb-1">Potentially Risky Clause</h5>
                <p className="text-gray-300 bg-gray-900/50 p-3 rounded-md border border-gray-700 text-sm">"{risk.clause}"</p>
              </div>
              <div>
                <h5 className="text-sm font-semibold text-gray-400 mb-1">Reasoning</h5>
                <p className="text-gray-300 text-sm">{risk.reasoning}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
