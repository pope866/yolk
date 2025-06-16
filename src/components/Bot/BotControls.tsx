import React, { useState } from 'react';
import { Play, Square, RefreshCw, Settings, AlertTriangle } from 'lucide-react';
import { useTradingStore } from '../../store/tradingStore';

const BotControls: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const { buyContract, activeSymbol, error } = useTradingStore();
  
  const handleStartBot = async () => {
    setIsRunning(true);
    try {
      await buyContract({
        contract_type: 'CALL',
        currency: 'USD',
        amount: 10,
        symbol: activeSymbol,
        duration: 5,
        duration_unit: 'm'
      });
    } catch (error) {
      console.error('Failed to start bot:', error);
      setIsRunning(false);
    }
  };
  
  const handleStopBot = () => {
    setIsRunning(false);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        <button
          onClick={handleStartBot}
          disabled={isRunning}
          className={`flex flex-col items-center justify-center p-3 rounded-lg ${
            isRunning
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-green-500 bg-opacity-10 text-green-500 hover:bg-opacity-20'
          }`}
        >
          <Play size={20} />
          <span className="text-xs mt-1">Start</span>
        </button>
        
        <button
          onClick={handleStopBot}
          disabled={!isRunning}
          className={`flex flex-col items-center justify-center p-3 rounded-lg ${
            !isRunning
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-red-500 bg-opacity-10 text-red-500 hover:bg-opacity-20'
          }`}
        >
          <Square size={20} />
          <span className="text-xs mt-1">Stop</span>
        </button>
        
        <button
          onClick={() => setIsRunning(false)}
          className="flex flex-col items-center justify-center p-3 rounded-lg bg-blue-500 bg-opacity-10 text-blue-500 hover:bg-opacity-20"
        >
          <RefreshCw size={20} />
          <span className="text-xs mt-1">Reset</span>
        </button>
      </div>
      
      {error && (
        <div className="mt-4 p-2 bg-red-500 bg-opacity-10 rounded-md flex items-start">
          <AlertTriangle size={16} className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-red-500">{error}</p>
        </div>
      )}
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Settings size={16} className="text-gray-400 mr-2" />
            <span className="text-sm">Max trades</span>
          </div>
          <select className="bg-gray-700 text-white text-sm rounded-md border-0 focus:ring-2 focus:ring-blue-500">
            <option>1</option>
            <option>2</option>
            <option selected>3</option>
            <option>5</option>
            <option>10</option>
          </select>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Settings size={16} className="text-gray-400 mr-2" />
            <span className="text-sm">Stake amount</span>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-400">$</span>
            <input
              type="number"
              className="pl-6 w-20 bg-gray-700 text-white text-sm rounded-md border-0 focus:ring-2 focus:ring-blue-500"
              defaultValue="10"
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Settings size={16} className="text-gray-400 mr-2" />
            <span className="text-sm">Take profit</span>
          </div>
          <div className="relative">
            <input
              type="number"
              className="pl-2 w-16 bg-gray-700 text-white text-sm rounded-md border-0 focus:ring-2 focus:ring-blue-500"
              defaultValue="50"
            />
            <span className="absolute inset-y-0 right-2 flex items-center text-gray-400">pips</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Settings size={16} className="text-gray-400 mr-2" />
            <span className="text-sm">Stop loss</span>
          </div>
          <div className="relative">
            <input
              type="number"
              className="pl-2 w-16 bg-gray-700 text-white text-sm rounded-md border-0 focus:ring-2 focus:ring-blue-500"
              defaultValue="25"
            />
            <span className="absolute inset-y-0 right-2 flex items-center text-gray-400">pips</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-2 bg-yellow-500 bg-opacity-10 rounded-md flex items-start">
        <AlertTriangle size={16} className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-yellow-500">Please review your risk settings before starting the bot. Once running, the bot will execute trades automatically.</p>
      </div>
    </div>
  );
};

export default BotControls;