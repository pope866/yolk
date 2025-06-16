import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface Signal {
  asset: string;
  price: number;
  change: number;
  changePercent: number;
}

const LiveSignals: React.FC = () => {
  const [signals, setSignals] = useState<Signal[]>([
    { asset: 'EUR/USD', price: 1.0865, change: 0.0023, changePercent: 0.21 },
    { asset: 'GBP/USD', price: 1.2745, change: -0.0015, changePercent: -0.12 },
    { asset: 'USD/JPY', price: 149.85, change: 0.45, changePercent: 0.30 },
    { asset: 'BTC/USD', price: 42650.00, change: 1250.00, changePercent: 3.02 },
    { asset: 'ETH/USD', price: 2580.50, change: -45.20, changePercent: -1.72 },
    { asset: 'AAPL', price: 185.25, change: 2.15, changePercent: 1.17 },
    { asset: 'MSFT', price: 378.90, change: -1.85, changePercent: -0.49 },
    { asset: 'GOOGL', price: 142.30, change: 0.95, changePercent: 0.67 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSignals(prevSignals => 
        prevSignals.map(signal => ({
          ...signal,
          price: signal.price + (Math.random() - 0.5) * 0.01,
          change: (Math.random() - 0.5) * 0.02,
          changePercent: (Math.random() - 0.5) * 2
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Activity className="w-6 h-6 text-blue-500 mr-3" />
        <h2 className="text-2xl font-bold">Live Trading Signals</h2>
      </div>

      <div className="bg-gray-750 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Change %
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {signals.map((signal, index) => (
                <tr key={index} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{signal.asset}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{signal.price.toFixed(signal.asset.includes('USD') && !signal.asset.includes('/') ? 2 : 5)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${signal.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {signal.change >= 0 ? '+' : ''}{signal.change.toFixed(signal.asset.includes('USD') && !signal.asset.includes('/') ? 2 : 5)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${signal.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {signal.changePercent >= 0 ? '+' : ''}{signal.changePercent.toFixed(2)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {signal.change >= 0 ? (
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-500" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LiveSignals;