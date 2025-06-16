import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Trade {
  id: string;
  market: string;
  type: 'buy' | 'sell';
  entryPrice: number;
  closePrice: number;
  profit: number;
  time: string;
}

const mockTrades: Trade[] = [
  { id: '1', market: 'EURUSD', type: 'buy', entryPrice: 1.0865, closePrice: 1.0893, profit: 28, time: '14:25:36' },
  { id: '2', market: 'GBPUSD', type: 'sell', entryPrice: 1.2745, closePrice: 1.2715, profit: 30, time: '14:10:22' },
  { id: '3', market: 'EURUSD', type: 'buy', entryPrice: 1.0850, closePrice: 1.0840, profit: -10, time: '13:55:18' },
  { id: '4', market: 'BTCUSD', type: 'buy', entryPrice: 42500, closePrice: 42650, profit: 150, time: '13:30:05' },
];

const TradeHistory: React.FC = () => {
  return (
    <div>
      <div className="space-y-3">
        {mockTrades.map(trade => (
          <div key={trade.id} className="p-3 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className={`rounded-full p-1 mr-2 ${trade.type === 'buy' ? 'bg-green-500 bg-opacity-20' : 'bg-red-500 bg-opacity-20'}`}>
                  {trade.type === 'buy' 
                    ? <ArrowUpRight size={16} className="text-green-500" /> 
                    : <ArrowDownRight size={16} className="text-red-500" />}
                </div>
                <div>
                  <p className="font-medium">{trade.market}</p>
                  <p className="text-xs text-gray-400">{trade.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${trade.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {trade.profit >= 0 ? '+' : ''}{trade.profit}
                </p>
                <p className="text-xs text-gray-400">
                  {trade.entryPrice} → {trade.closePrice}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-3 text-center text-sm text-blue-400 hover:text-blue-300">
        View all trades
      </button>
    </div>
  );
};

export default TradeHistory;