import React from 'react';
import { Bot, TrendingUp, Shield, Zap } from 'lucide-react';

interface BotCardProps {
  name: string;
  description: string;
  features: string[];
  onGetBot: () => void;
}

const BotCard: React.FC<BotCardProps> = ({ name, description, features, onGetBot }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl border border-gray-200">
    <h3 className="text-xl font-bold text-green-700 mb-3">{name}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="bg-gray-50 p-4 rounded-lg mb-4">
      <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            {feature}
          </li>
        ))}
      </ul>
    </div>
    <button 
      onClick={onGetBot}
      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
    >
      Get This Bot
    </button>
  </div>
);

const TradingBots: React.FC = () => {
  const bots = [
    {
      name: "WEALTH FISHER",
      description: "A sophisticated bot designed to catch profitable opportunities in volatile markets.",
      features: [
        "Advanced trend analysis",
        "Auto risk management", 
        "High win rate strategy"
      ]
    },
    {
      name: "PS OVER 4",
      description: "Specialized in predicting over/under outcomes with high accuracy.",
      features: [
        "4.0+ prediction algorithm",
        "Real-time market scanning",
        "Adaptive to market changes"
      ]
    },
    {
      name: "PS 2025",
      description: "The next generation trading bot with AI-powered decision making.",
      features: [
        "Machine learning algorithms",
        "24/7 market monitoring",
        "Self-optimizing strategies"
      ]
    },
    {
      name: "ACCUMULATORS",
      description: "Build your portfolio steadily with this conservative yet effective bot.",
      features: [
        "Low-risk accumulation strategy",
        "Compound growth focused",
        "Daily profit targets"
      ]
    }
  ];

  const handleGetBot = (botName: string) => {
    console.log(`Getting bot: ${botName}`);
    // Add bot acquisition logic here
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-8 rounded-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-shadow">Premium Free Trading Bots</h1>
        <p className="text-xl">Enhance your trading with our exclusive free bots - no hidden costs!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bots.map((bot, index) => (
          <BotCard
            key={index}
            name={bot.name}
            description={bot.description}
            features={bot.features}
            onGetBot={() => handleGetBot(bot.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default TradingBots;