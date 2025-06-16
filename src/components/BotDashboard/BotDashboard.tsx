import React from 'react';
import { Bot, TrendingUp, Zap, Shield, Target, BarChart3, Activity, Cpu, Brain } from 'lucide-react';

interface BotBoxProps {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const BotBox: React.FC<BotBoxProps> = ({ name, icon, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-gradient-to-br from-green-400 to-green-600 border-2 border-green-700 rounded-xl p-6 font-bold text-white shadow-lg cursor-pointer transition-all duration-300 hover:from-green-500 hover:to-green-700 hover:transform hover:-translate-y-1 hover:shadow-xl text-center min-h-[100px] flex flex-col items-center justify-center space-y-2"
  >
    {icon}
    <span className="text-sm">{name}</span>
  </div>
);

const BotDashboard: React.FC = () => {
  const bots = [
    { name: "WEALTH FISHER", icon: <TrendingUp size={24} /> },
    { name: "PS OVER 4", icon: <Target size={24} /> },
    { name: "PS 2025", icon: <Brain size={24} /> },
    { name: "ACCUMULATORS", icon: <BarChart3 size={24} /> },
    { name: "EVEN ODD SWITCHER", icon: <Activity size={24} /> },
    { name: "AUTO RISE & FALL", icon: <Zap size={24} /> },
    { name: "PS AI BOT", icon: <Cpu size={24} /> },
    { name: "OVER & UNDER SWITCHER", icon: <Shield size={24} /> },
    { name: "RISE & FALL", icon: <Bot size={24} /> }
  ];

  const handleBotClick = (botName: string) => {
    console.log(`Selected bot: ${botName}`);
    // Add bot selection logic here
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-100 mb-2">Trading Bot Dashboard</h2>
        <p className="text-gray-400">Select a bot to start automated trading</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bots.map((bot, index) => (
          <BotBox
            key={index}
            name={bot.name}
            icon={bot.icon}
            onClick={() => handleBotClick(bot.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default BotDashboard;