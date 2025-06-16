import React from 'react';
import { ExternalLink, BarChart3 } from 'lucide-react';

const LDPTool: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <BarChart3 className="w-6 h-6 text-blue-500 mr-3" />
          <h2 className="text-2xl font-bold">LDP Trading Tool</h2>
        </div>
        <a 
          href="https://smarttrader.deriv.com/en/trading.html" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          Open in New Tab
        </a>
      </div>

      <div className="bg-gray-750 rounded-lg border border-gray-700 p-4">
        <p className="text-gray-400 mb-4">Loading live market data in LDP Tool...</p>
        <div className="bg-gray-900 rounded-lg overflow-hidden" style={{ height: '600px' }}>
          <iframe 
            src="https://smarttrader.deriv.com/en/trading.html" 
            width="100%" 
            height="100%"
            className="border-0"
            title="Deriv SmartTrader"
          />
        </div>
      </div>
    </div>
  );
};

export default LDPTool;