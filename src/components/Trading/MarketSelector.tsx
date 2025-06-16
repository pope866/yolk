import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';

interface Market {
  symbol: string;
  name: string;
  type: string;
}

const markets: Market[] = [
  { symbol: 'EURUSD', name: 'Euro / US Dollar', type: 'forex' },
  { symbol: 'GBPUSD', name: 'British Pound / US Dollar', type: 'forex' },
  { symbol: 'USDJPY', name: 'US Dollar / Japanese Yen', type: 'forex' },
  { symbol: 'BTCUSD', name: 'Bitcoin / US Dollar', type: 'crypto' },
  { symbol: 'ETHUSD', name: 'Ethereum / US Dollar', type: 'crypto' },
  { symbol: 'AAPL', name: 'Apple Inc.', type: 'stock' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', type: 'stock' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'stock' },
];

const MarketSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState(markets[0]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredMarkets = markets.filter(market => 
    market.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
    market.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSelectMarket = (market: Market) => {
    setSelectedMarket(market);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-md text-sm transition-colors"
      >
        <span className="font-medium">{selectedMarket.symbol}</span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
          <div className="p-2 border-b border-gray-700">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search markets..."
                className="w-full bg-gray-700 text-white pl-8 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="max-h-72 overflow-y-auto">
            {filteredMarkets.map(market => (
              <button
                key={market.symbol}
                className={`w-full text-left p-3 hover:bg-gray-700 transition-colors ${selectedMarket.symbol === market.symbol ? 'bg-gray-700' : ''}`}
                onClick={() => handleSelectMarket(market)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{market.symbol}</p>
                    <p className="text-xs text-gray-400">{market.name}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full uppercase ${
                    market.type === 'forex' ? 'bg-blue-500 bg-opacity-20 text-blue-400' :
                    market.type === 'crypto' ? 'bg-purple-500 bg-opacity-20 text-purple-400' :
                    'bg-green-500 bg-opacity-20 text-green-400'
                  }`}>
                    {market.type}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketSelector;