import React from 'react';
import { 
  BarChart2, 
  Bell, 
  HelpCircle, 
  Menu, 
  User,
  TrendingUp,
  Globe,
  Clock
} from 'lucide-react';
import { useTradingStore } from '../../store/tradingStore';

const Header: React.FC = () => {
  const { isConnected, activeSymbol, ticks } = useTradingStore();
  const latestPrice = ticks[ticks.length - 1]?.quote || 0;
  const previousPrice = ticks[ticks.length - 2]?.quote || 0;
  const priceChange = latestPrice - previousPrice;
  
  return (
    <header className="bg-gray-900 border-b border-gray-700">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Left section */}
          <div className="flex items-center">
            <button className="md:hidden text-gray-400 hover:text-white p-2">
              <Menu size={20} />
            </button>
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">MP</span>
                </div>
                <span className="text-xl font-semibold tracking-tight">Mr Pope Trading</span>
              </div>
              
              {/* Market Status */}
              <div className="hidden md:flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Globe size={16} className="text-gray-400" />
                  <span className="text-sm">Market Status:</span>
                  <span className={`text-sm font-medium ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
                    {isConnected ? 'Open' : 'Closed'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock size={16} className="text-gray-400" />
                  <span className="text-sm">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Center section - Active Symbol Info */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="px-4 py-2 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div>
                  <span className="text-sm text-gray-400">Active Symbol</span>
                  <div className="text-lg font-semibold">{activeSymbol}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Price</span>
                  <div className="flex items-center">
                    <span className="text-lg font-semibold">{latestPrice.toFixed(5)}</span>
                    <span className={`ml-2 text-sm ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(5)}
                    </span>
                  </div>
                </div>
                <TrendingUp 
                  size={24} 
                  className={`${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`} 
                />
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <button className="relative text-gray-400 hover:text-white p-2 transition-colors">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">3</span>
            </button>
            <button className="text-gray-400 hover:text-white p-2 transition-colors">
              <HelpCircle size={18} />
            </button>
            <div className="border-l border-gray-700 h-6 mx-2"></div>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-full h-8 w-8 flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">Mr Pope</p>
                <p className="text-xs text-gray-400">Pro Account</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;