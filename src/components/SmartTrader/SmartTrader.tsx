import React from 'react';
import { useTradingStore } from '../../store/tradingStore';
import PriceChart from '../Trading/PriceChart';
import MarketSelector from '../Trading/MarketSelector';
import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';

const SmartTrader = () => {
  const { activeSymbol, ticks } = useTradingStore();
  const latestPrice = ticks[ticks.length - 1]?.quote || 0;
  const previousPrice = ticks[ticks.length - 2]?.quote || 0;
  const priceChange = latestPrice - previousPrice;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">{activeSymbol}</h2>
          <div className="flex items-center mt-1">
            <span className="text-3xl font-bold">{latestPrice.toFixed(5)}</span>
            <div className={`ml-3 flex items-center ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {priceChange >= 0 ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
              <span className="font-medium">{Math.abs(priceChange).toFixed(5)}</span>
            </div>
          </div>
        </div>
        <MarketSelector />
      </div>

      <div className="flex-1 bg-gray-900 rounded-lg p-4">
        <PriceChart />
      </div>

      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="bg-gray-900 p-4 rounded-lg">
          <div className="flex items-center text-gray-400 mb-2">
            <DollarSign size={16} className="mr-2" />
            <span>24h Volume</span>
          </div>
          <span className="text-xl font-bold">$24.5M</span>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg">
          <div className="flex items-center text-gray-400 mb-2">
            <ArrowUpRight size={16} className="mr-2" />
            <span>24h High</span>
          </div>
          <span className="text-xl font-bold text-green-500">1.23456</span>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg">
          <div className="flex items-center text-gray-400 mb-2">
            <ArrowDownRight size={16} className="mr-2" />
            <span>24h Low</span>
          </div>
          <span className="text-xl font-bold text-red-500">1.23000</span>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg">
          <div className="flex items-center text-gray-400 mb-2">
            <DollarSign size={16} className="mr-2" />
            <span>Spread</span>
          </div>
          <span className="text-xl font-bold">0.00013</span>
        </div>
      </div>
    </div>
  );
};

export default SmartTrader;