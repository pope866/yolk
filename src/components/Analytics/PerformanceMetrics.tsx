import React from 'react';

// This is a simple chart component that draws bars
const BarChart: React.FC<{ data: number[], maxValue: number }> = ({ data, maxValue }) => {
  return (
    <div className="flex items-end h-20 space-x-1">
      {data.map((value, index) => (
        <div 
          key={index}
          className="flex-1 bg-blue-500 rounded-t transition-all duration-500 ease-in-out hover:bg-blue-400"
          style={{ 
            height: `${(value / maxValue) * 100}%`,
            opacity: 0.2 + (value / maxValue) * 0.8
          }}
        />
      ))}
    </div>
  );
};

const PerformanceMetrics: React.FC = () => {
  // Mock data for the chart
  const dailyProfits = [23, 45, -12, 78, 34, -8, 56];
  const maxProfit = Math.max(...dailyProfits.map(p => Math.abs(p)));
  
  // Calculate some metrics
  const totalProfitLoss = dailyProfits.reduce((sum, current) => sum + current, 0);
  const profitDays = dailyProfits.filter(p => p > 0).length;
  const lossDays = dailyProfits.filter(p => p < 0).length;
  
  return (
    <div>
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-1">7-Day Performance</h4>
        <BarChart data={dailyProfits.map(p => Math.abs(p))} maxValue={maxProfit} />
        <div className="flex justify-between mt-1">
          {dailyProfits.map((value, index) => (
            <div key={index} className={value >= 0 ? 'text-green-500' : 'text-red-500'}>
              <div className="h-1 w-1 rounded-full mx-auto" style={{ backgroundColor: value >= 0 ? '#10b981' : '#ef4444' }}></div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-800 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Total P&L</p>
          <p className={`text-lg font-bold ${totalProfitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {totalProfitLoss >= 0 ? '+' : ''}{totalProfitLoss}
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Profit Factor</p>
          <p className="text-lg font-bold">2.8</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Profitable Days</p>
          <div className="flex items-center">
            <p className="text-lg font-bold text-green-500">{profitDays}</p>
            <p className="text-sm ml-1 text-gray-400">/ 7</p>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Losing Days</p>
          <div className="flex items-center">
            <p className="text-lg font-bold text-red-500">{lossDays}</p>
            <p className="text-sm ml-1 text-gray-400">/ 7</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;