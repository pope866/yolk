import React, { useState } from 'react';
import { ChevronDown, ChevronRight, AlertCircle, Info } from 'lucide-react';

interface StrategyOption {
  id: string;
  name: string;
  description: string;
}

const strategies: StrategyOption[] = [
  { 
    id: 'macd', 
    name: 'MACD Crossover',
    description: 'Trades based on Moving Average Convergence Divergence crossovers'
  },
  { 
    id: 'rsi', 
    name: 'RSI Overbought/Oversold',
    description: 'Enter trades when Relative Strength Index indicates overbought or oversold conditions'
  },
  { 
    id: 'bollingerband', 
    name: 'Bollinger Band Breakout',
    description: 'Trade breakouts when price moves outside Bollinger Bands'
  },
  { 
    id: 'custom', 
    name: 'Custom Strategy',
    description: 'Build your own strategy with multiple indicators and conditions'
  },
];

const BotStrategy: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] = useState(strategies[0]);
  const [showParameters, setShowParameters] = useState(true);
  
  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Trading Strategy
        </label>
        <select 
          className="w-full bg-gray-700 text-white rounded-md border-0 focus:ring-2 focus:ring-blue-500"
          value={selectedStrategy.id}
          onChange={(e) => {
            const strategy = strategies.find(s => s.id === e.target.value);
            if (strategy) setSelectedStrategy(strategy);
          }}
        >
          {strategies.map(strategy => (
            <option key={strategy.id} value={strategy.id}>
              {strategy.name}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-gray-500">{selectedStrategy.description}</p>
      </div>
      
      <div className="border-t border-gray-700 pt-3">
        <button 
          className="flex items-center justify-between w-full text-sm font-medium"
          onClick={() => setShowParameters(!showParameters)}
        >
          <span>Strategy Parameters</span>
          {showParameters ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
        
        {showParameters && (
          <div className="mt-3 space-y-3">
            {selectedStrategy.id === 'macd' && (
              <>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Fast EMA Period
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 text-white text-sm rounded-md border-0 focus:ring-2 focus:ring-blue-500"
                    defaultValue="12"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Slow EMA Period
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 text-white text-sm rounded-md border-0 focus:ring-2 focus:ring-blue-500"
                    defaultValue="26"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Signal Period
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 text-white text-sm rounded-md border-0 focus:ring-2 focus:ring-blue-500"
                    defaultValue="9"
                  />
                </div>
              </>
            )}
            
            {selectedStrategy.id === 'rsi' && (
              <>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    RSI Period
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 text-white text-sm rounded-md border-0 focus:ring-2 focus:ring-blue-500"
                    defaultValue="14"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Overbought Level
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 text-white text-sm rounded-md border-0 focus:ring-2 focus:ring-blue-500"
                    defaultValue="70"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Oversold Level
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 text-white text-sm rounded-md border-0 focus:ring-2 focus:ring-blue-500"
                    defaultValue="30"
                  />
                </div>
              </>
            )}
            
            <div className="mt-4 flex items-center">
              <Info size={14} className="text-blue-400 mr-2" />
              <span className="text-xs text-blue-400">
                Adjusting these parameters can significantly impact the trading performance.
              </span>
            </div>
          </div>
        )}
      </div>
      
      <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors text-sm font-medium">
        Apply Strategy
      </button>
    </div>
  );
};

export default BotStrategy;