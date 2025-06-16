import React from 'react';
import { LineChart, BarChart2, PieChart, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-750 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Profit</p>
              <p className="text-2xl font-bold text-green-500">+$2,456.78</p>
            </div>
            <div className="bg-green-500 bg-opacity-10 p-3 rounded-full">
              <TrendingUp className="text-green-500" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-500">
            <ArrowUpRight size={16} />
            <span>+15.3% from last month</span>
          </div>
        </div>

        <div className="bg-gray-750 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Win Rate</p>
              <p className="text-2xl font-bold">68.5%</p>
            </div>
            <div className="bg-blue-500 bg-opacity-10 p-3 rounded-full">
              <PieChart className="text-blue-500" size={24} />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '68.5%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-gray-750 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Trades</p>
              <p className="text-2xl font-bold">1,234</p>
            </div>
            <div className="bg-purple-500 bg-opacity-10 p-3 rounded-full">
              <BarChart2 className="text-purple-500" size={24} />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-green-500">845</span> Won
            </div>
            <div>
              <span className="text-red-500">389</span> Lost
            </div>
          </div>
        </div>

        <div className="bg-gray-750 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg. Trade Duration</p>
              <p className="text-2xl font-bold">24m 35s</p>
            </div>
            <div className="bg-orange-500 bg-opacity-10 p-3 rounded-full">
              <LineChart className="text-orange-500" size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-orange-500">
            <span>Average across all trades</span>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-750 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-medium mb-4">Performance by Market</h3>
          <div className="space-y-4">
            {[
              { market: 'EUR/USD', profit: 1234.56, percentage: 75 },
              { market: 'GBP/USD', profit: 856.23, percentage: 62 },
              { market: 'BTC/USD', profit: -234.12, percentage: 45 },
              { market: 'ETH/USD', profit: 567.89, percentage: 58 }
            ].map((item) => (
              <div key={item.market} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.market}</span>
                  <span className={item.profit >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {item.profit >= 0 ? '+' : ''}{item.profit.toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${item.profit >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-750 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-medium mb-4">Trading Sessions</h3>
          <div className="space-y-4">
            {[
              { session: 'Asian', trades: 245, winRate: 65 },
              { session: 'London', trades: 456, winRate: 72 },
              { session: 'New York', trades: 334, winRate: 68 },
              { session: 'Sydney', trades: 199, winRate: 58 }
            ].map((item) => (
              <div key={item.session} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{item.session}</span>
                    <span className="text-gray-400">{item.trades} trades</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${item.winRate}%` }}
                    ></div>
                  </div>
                </div>
                <span className="ml-4 text-blue-500">{item.winRate}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;