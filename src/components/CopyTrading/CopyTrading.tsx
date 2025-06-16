import React, { useState } from 'react';
import { Copy, Users, TrendingUp, Shield, AlertCircle } from 'lucide-react';

const CopyTrading: React.FC = () => {
  const [isCopyTradingEnabled, setIsCopyTradingEnabled] = useState(false);

  const toggleCopyTrading = () => {
    setIsCopyTradingEnabled(!isCopyTradingEnabled);
    console.log(isCopyTradingEnabled ? "Copy Trading Disabled" : "Copy Trading Enabled");
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-750 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center mb-4">
          <Copy className="w-6 h-6 text-blue-500 mr-3" />
          <h2 className="text-2xl font-bold">Copy Trading</h2>
        </div>
        
        <p className="text-gray-400 mb-6">
          Enable copy trading to automatically replicate demo trades on your real account.
        </p>

        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg mb-6">
          <div className="flex items-center">
            <span className="text-lg font-medium mr-4">Copy Trading Status:</span>
            <span className={`font-bold ${isCopyTradingEnabled ? 'text-green-500' : 'text-red-500'}`}>
              {isCopyTradingEnabled ? 'ON' : 'OFF'}
            </span>
          </div>
          
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isCopyTradingEnabled}
              onChange={toggleCopyTrading}
              className="sr-only peer"
            />
            <div className="w-12 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>

        {isCopyTradingEnabled && (
          <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="text-yellow-500 font-medium">Warning:</span>
            </div>
            <p className="text-yellow-500 text-sm mt-2">
              Copy trading is now active. All demo trades will be replicated on your real account with real money.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-medium mb-1">Active Traders</h3>
            <p className="text-2xl font-bold text-blue-500">24</p>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h3 className="font-medium mb-1">Success Rate</h3>
            <p className="text-2xl font-bold text-green-500">78%</p>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <Shield className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h3 className="font-medium mb-1">Risk Level</h3>
            <p className="text-2xl font-bold text-purple-500">Medium</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyTrading;