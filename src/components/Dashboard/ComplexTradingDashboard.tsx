import React, { useState, useEffect } from 'react';
import AdvancedChart from '../Trading/AdvancedChart';
import MarketDataTable from '../Trading/MarketDataTable';
import BotExecutionPanel from '../Bot/BotExecutionPanel';
import AccountSummary from '../Account/AccountSummary';
import PerformanceMetrics from '../Analytics/PerformanceMetrics';
import LoadingSpinner from '../UI/LoadingSpinner';
import SkeletonLoader from '../UI/SkeletonLoader';

const ComplexTradingDashboard: React.FC = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate dashboard initialization
    const initializeDashboard = async () => {
      const steps = [
        { name: 'Loading user preferences...', duration: 800 },
        { name: 'Connecting to market data...', duration: 1200 },
        { name: 'Initializing trading components...', duration: 1000 },
        { name: 'Loading account information...', duration: 600 },
        { name: 'Finalizing dashboard...', duration: 400 }
      ];

      let progress = 0;
      const progressStep = 100 / steps.length;

      for (const step of steps) {
        await new Promise(resolve => setTimeout(resolve, step.duration));
        progress += progressStep;
        setLoadingProgress(progress);
      }

      setIsInitialLoading(false);
    };

    initializeDashboard();
  }, []);

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="xl" color="blue" />
          <h2 className="text-2xl font-bold mt-6 mb-4">Loading Trading Dashboard</h2>
          <div className="w-80 mx-auto">
            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-400">{Math.round(loadingProgress)}% complete</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Advanced Trading Dashboard</h1>
        <p className="text-blue-100">Real-time market analysis and automated trading execution</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Chart and Market Data */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-gray-750 rounded-lg border border-gray-700 p-6">
            <AdvancedChart />
          </div>
          
          <MarketDataTable />
        </div>

        {/* Right Column - Controls and Analytics */}
        <div className="space-y-6">
          <BotExecutionPanel />
          
          <div className="bg-gray-750 rounded-lg border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h3 className="font-medium">Account Summary</h3>
            </div>
            <div className="p-4">
              <AccountSummary />
            </div>
          </div>
          
          <div className="bg-gray-750 rounded-lg border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h3 className="font-medium">Performance Metrics</h3>
            </div>
            <div className="p-4">
              <PerformanceMetrics />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplexTradingDashboard;