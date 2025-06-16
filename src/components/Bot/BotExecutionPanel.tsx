import React, { useState, useEffect } from 'react';
import { Play, Square, Settings, Activity, AlertTriangle } from 'lucide-react';
import LoadingSpinner from '../UI/LoadingSpinner';
import ProgressBar from '../UI/ProgressBar';
import LoadingOverlay from '../UI/LoadingOverlay';
import { useAsyncOperation } from '../../hooks/useAsyncOperation';

interface BotStatus {
  isRunning: boolean;
  tradesExecuted: number;
  profit: number;
  winRate: number;
  currentStrategy: string;
}

const BotExecutionPanel: React.FC = () => {
  const [botStatus, setBotStatus] = useState<BotStatus>({
    isRunning: false,
    tradesExecuted: 0,
    profit: 0,
    winRate: 0,
    currentStrategy: 'MACD Crossover'
  });

  const [showInitializationOverlay, setShowInitializationOverlay] = useState(false);
  const [initializationProgress, setInitializationProgress] = useState(0);
  const { state: startBotState, execute: executeStartBot } = useAsyncOperation();
  const { state: stopBotState, execute: executeStopBot } = useAsyncOperation();

  const startBot = async () => {
    setShowInitializationOverlay(true);
    setInitializationProgress(0);

    // Simulate bot initialization process
    const steps = [
      { message: 'Connecting to trading servers...', duration: 1000 },
      { message: 'Loading market data...', duration: 1500 },
      { message: 'Initializing strategy parameters...', duration: 800 },
      { message: 'Validating account permissions...', duration: 1200 },
      { message: 'Starting trading engine...', duration: 1000 }
    ];

    let totalProgress = 0;
    const progressStep = 100 / steps.length;

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, step.duration));
      totalProgress += progressStep;
      setInitializationProgress(totalProgress);
    }

    await executeStartBot(async () => {
      setBotStatus(prev => ({ ...prev, isRunning: true }));
      return { success: true };
    });

    setShowInitializationOverlay(false);
  };

  const stopBot = async () => {
    await executeStopBot(async () => {
      setBotStatus(prev => ({ ...prev, isRunning: false }));
      return { success: true };
    });
  };

  // Simulate real-time updates when bot is running
  useEffect(() => {
    if (!botStatus.isRunning) return;

    const interval = setInterval(() => {
      setBotStatus(prev => ({
        ...prev,
        tradesExecuted: prev.tradesExecuted + Math.floor(Math.random() * 2),
        profit: prev.profit + (Math.random() - 0.4) * 50,
        winRate: Math.max(0, Math.min(100, prev.winRate + (Math.random() - 0.5) * 5))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [botStatus.isRunning]);

  return (
    <>
      <div className="bg-gray-750 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Bot Execution Panel</h3>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${botStatus.isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
            <span className="text-sm text-gray-400">
              {botStatus.isRunning ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <button
            onClick={startBot}
            disabled={botStatus.isRunning || startBotState.loading}
            className="flex flex-col items-center justify-center p-4 bg-green-500 bg-opacity-10 hover:bg-opacity-20 disabled:bg-gray-700 disabled:text-gray-500 text-green-500 rounded-lg transition-all duration-300 min-h-[80px]"
          >
            {startBotState.loading ? (
              <LoadingSpinner size="sm" color="green" />
            ) : (
              <Play size={24} />
            )}
            <span className="text-sm mt-2 font-medium">Start Bot</span>
          </button>

          <button
            onClick={stopBot}
            disabled={!botStatus.isRunning || stopBotState.loading}
            className="flex flex-col items-center justify-center p-4 bg-red-500 bg-opacity-10 hover:bg-opacity-20 disabled:bg-gray-700 disabled:text-gray-500 text-red-500 rounded-lg transition-all duration-300 min-h-[80px]"
          >
            {stopBotState.loading ? (
              <LoadingSpinner size="sm" color="white" />
            ) : (
              <Square size={24} />
            )}
            <span className="text-sm mt-2 font-medium">Stop Bot</span>
          </button>

          <button className="flex flex-col items-center justify-center p-4 bg-blue-500 bg-opacity-10 hover:bg-opacity-20 text-blue-500 rounded-lg transition-all duration-300 min-h-[80px]">
            <Settings size={24} />
            <span className="text-sm mt-2 font-medium">Settings</span>
          </button>
        </div>

        {/* Real-time Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center text-gray-400 mb-2">
              <Activity size={16} className="mr-2" />
              <span className="text-sm">Trades</span>
            </div>
            <p className="text-2xl font-bold">{botStatus.tradesExecuted}</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center text-gray-400 mb-2">
              <span className="text-sm">Profit/Loss</span>
            </div>
            <p className={`text-2xl font-bold ${botStatus.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {botStatus.profit >= 0 ? '+' : ''}${botStatus.profit.toFixed(2)}
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center text-gray-400 mb-2">
              <span className="text-sm">Win Rate</span>
            </div>
            <p className="text-2xl font-bold">{botStatus.winRate.toFixed(1)}%</p>
            <ProgressBar 
              progress={botStatus.winRate} 
              color="green" 
              size="sm" 
              className="mt-2"
            />
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center text-gray-400 mb-2">
              <span className="text-sm">Strategy</span>
            </div>
            <p className="text-sm font-medium">{botStatus.currentStrategy}</p>
          </div>
        </div>

        {/* Status Messages */}
        {botStatus.isRunning && (
          <div className="bg-green-500 bg-opacity-10 border border-green-500 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-3" />
              <span className="text-green-500 font-medium">Bot is actively trading</span>
            </div>
            <p className="text-green-500 text-sm mt-1">
              Monitoring market conditions and executing trades based on {botStatus.currentStrategy} strategy
            </p>
          </div>
        )}

        {(startBotState.error || stopBotState.error) && (
          <div className="bg-red-500 bg-opacity-10 border border-red-500 rounded-lg p-4">
            <div className="flex items-center">
              <AlertTriangle size={16} className="text-red-500 mr-2" />
              <span className="text-red-500 font-medium">Error</span>
            </div>
            <p className="text-red-500 text-sm mt-1">
              {startBotState.error || stopBotState.error}
            </p>
          </div>
        )}
      </div>

      <LoadingOverlay
        isVisible={showInitializationOverlay}
        message="Initializing Trading Bot..."
        progress={initializationProgress}
        onCancel={() => {
          setShowInitializationOverlay(false);
          setInitializationProgress(0);
        }}
      />
    </>
  );
};

export default BotExecutionPanel;