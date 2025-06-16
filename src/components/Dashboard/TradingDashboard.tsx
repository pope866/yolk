import React from 'react';
import SmartTrader from '../SmartTrader/SmartTrader';
import BotControls from '../Bot/BotControls';
import TradeHistory from '../Trading/TradeHistory';
import BotStrategy from '../Bot/BotStrategy';
import AccountSummary from '../Account/AccountSummary';
import PerformanceMetrics from '../Analytics/PerformanceMetrics';
import Calculator from '../Calculator/Calculator';

const TradingDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-8">
        <SmartTrader />
      </div>
      
      <div className="lg:col-span-4 space-y-4">
        <div className="bg-gray-750 rounded-lg overflow-hidden border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h2 className="font-medium">Bot Controls</h2>
          </div>
          <div className="p-4">
            <BotControls />
          </div>
        </div>
        
        <div className="bg-gray-750 rounded-lg overflow-hidden border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h2 className="font-medium">Bot Strategy</h2>
          </div>
          <div className="p-4">
            <BotStrategy />
          </div>
        </div>
        
        <Calculator />
        
        <div className="bg-gray-750 rounded-lg overflow-hidden border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h2 className="font-medium">Account Summary</h2>
          </div>
          <div className="p-4">
            <AccountSummary />
          </div>
        </div>
        
        <div className="bg-gray-750 rounded-lg overflow-hidden border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h2 className="font-medium">Performance</h2>
          </div>
          <div className="p-4">
            <PerformanceMetrics />
          </div>
        </div>
        
        <div className="bg-gray-750 rounded-lg overflow-hidden border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h2 className="font-medium">Trade History</h2>
          </div>
          <div className="p-4">
            <TradeHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingDashboard;