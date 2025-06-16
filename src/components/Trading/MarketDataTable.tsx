import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import SkeletonLoader from '../UI/SkeletonLoader';
import { useAsyncOperation } from '../../hooks/useAsyncOperation';

interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high24h: number;
  low24h: number;
}

const MarketDataTable: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const { state, execute } = useAsyncOperation<MarketData[]>();
  
  const fetchMarketData = async (): Promise<MarketData[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const symbols = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'BTC/USD', 'ETH/USD', 'AUD/USD', 'USD/CAD', 'NZD/USD'];
    
    return symbols.map(symbol => ({
      symbol,
      price: Math.random() * 100 + 1,
      change: (Math.random() - 0.5) * 2,
      changePercent: (Math.random() - 0.5) * 10,
      volume: Math.random() * 1000000,
      high24h: Math.random() * 100 + 1,
      low24h: Math.random() * 100 + 1,
    }));
  };

  useEffect(() => {
    execute(fetchMarketData);
  }, []);

  useEffect(() => {
    if (state.data) {
      setMarketData(state.data);
    }
  }, [state.data]);

  const handleRefresh = () => {
    execute(fetchMarketData);
  };

  const renderSkeletonRows = () => {
    return Array.from({ length: 8 }).map((_, index) => (
      <tr key={index} className="border-b border-gray-700">
        <td className="px-6 py-4">
          <SkeletonLoader width="w-16" height="h-4" />
        </td>
        <td className="px-6 py-4">
          <SkeletonLoader width="w-20" height="h-4" />
        </td>
        <td className="px-6 py-4">
          <SkeletonLoader width="w-16" height="h-4" />
        </td>
        <td className="px-6 py-4">
          <SkeletonLoader width="w-12" height="h-4" />
        </td>
        <td className="px-6 py-4">
          <SkeletonLoader width="w-24" height="h-4" />
        </td>
        <td className="px-6 py-4">
          <SkeletonLoader width="w-20" height="h-4" />
        </td>
        <td className="px-6 py-4">
          <SkeletonLoader width="w-20" height="h-4" />
        </td>
        <td className="px-6 py-4">
          <SkeletonLoader width="w-6" height="h-6" variant="circular" />
        </td>
      </tr>
    ));
  };

  return (
    <div className="bg-gray-750 rounded-lg border border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <h3 className="text-lg font-medium">Live Market Data</h3>
        <button
          onClick={handleRefresh}
          disabled={state.loading}
          className="flex items-center space-x-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white rounded-md transition-colors"
        >
          <RefreshCw size={16} className={state.loading ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>
      
      {state.loading && state.progress > 0 && (
        <div className="px-4 py-2 bg-gray-800">
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div 
              className="bg-blue-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${state.progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Symbol</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Price</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Change</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Change %</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Volume</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">24h High</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">24h Low</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {state.loading ? renderSkeletonRows() : marketData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{item.symbol}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{item.price.toFixed(5)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {item.change >= 0 ? '+' : ''}{item.change.toFixed(5)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium ${item.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{item.volume.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{item.high24h.toFixed(5)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{item.low24h.toFixed(5)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.change >= 0 ? (
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

      {state.error && (
        <div className="p-4 bg-red-500 bg-opacity-10 border-t border-red-500">
          <p className="text-red-500 text-sm">Error: {state.error}</p>
        </div>
      )}
    </div>
  );
};

export default MarketDataTable;