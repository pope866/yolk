import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
import { useBot } from '../../context/BotContext';
import ComplexTradingDashboard from '../Dashboard/ComplexTradingDashboard';
import AnalyticsPage from '../Analytics/AnalyticsPage';
import TradingBots from '../TradingBots/TradingBots';
import BotDashboard from '../BotDashboard/BotDashboard';
import CopyTrading from '../CopyTrading/CopyTrading';
import LiveSignals from '../LiveSignals/LiveSignals';
import LDPTool from '../LDPTool/LDPTool';
import LoginForm from '../Auth/LoginForm';
import SignupForm from '../Auth/SignupForm';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { botState } = useBot();
  const [activePage, setActivePage] = React.useState('dashboard');
  
  const renderPage = () => {
    switch (activePage) {
      case 'login':
        return <LoginForm />;
      case 'signup':
        return <SignupForm />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'trading-bots':
        return <TradingBots />;
      case 'bot-dashboard':
        return <BotDashboard />;
      case 'copy-trading':
        return <CopyTrading />;
      case 'live-signals':
        return <LiveSignals />;
      case 'ldp-tool':
        return <LDPTool />;
      case 'history':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Trading History</h2>
            <div className="bg-gray-750 p-6 rounded-lg border border-gray-700">
              <p className="text-gray-400">Trading history will be displayed here.</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Settings</h2>
            <div className="bg-gray-750 p-6 rounded-lg border border-gray-700">
              <p className="text-gray-400">Application settings will be displayed here.</p>
            </div>
          </div>
        );
      case 'docs':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Documentation</h2>
            <div className="bg-gray-750 p-6 rounded-lg border border-gray-700">
              <p className="text-gray-400">Documentation and guides will be displayed here.</p>
            </div>
          </div>
        );
      case 'support':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Support</h2>
            <div className="bg-gray-750 p-6 rounded-lg border border-gray-700">
              <p className="text-gray-400">Support and help resources will be displayed here.</p>
            </div>
          </div>
        );
      default:
        return <ComplexTradingDashboard />;
    }
  };

  // For login and signup pages, render without the main layout
  if (activePage === 'login' || activePage === 'signup') {
    return renderPage();
  }
  
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Navbar activeSection={activePage} onSectionChange={setActivePage} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-800 p-4">
          <div className="container mx-auto">
            {renderPage()}
          </div>
          <div className={`fixed bottom-4 right-4 transition-all duration-300 transform ${botState.isRunning ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center">
              <div className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse"></div>
              Bot is running
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;