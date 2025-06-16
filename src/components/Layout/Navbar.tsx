import React from 'react';
import { 
  BarChart2, 
  TrendingUp,
  LineChart,
  Settings,
  History,
  BookOpen,
  HelpCircle,
  Bell,
  PieChart,
  Bot,
  Copy,
  Activity,
  ExternalLink,
  User,
  UserPlus
} from 'lucide-react';

const NavItem = ({ icon: Icon, label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 transition-colors rounded-lg ${
      active 
        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

interface NavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, onSectionChange }) => {
  return (
    <nav className="w-64 bg-gray-900 border-r border-gray-800">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <BarChart2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">Mr Pope</span>
        </div>

        {/* Authentication Section */}
        <div className="mb-6">
          <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Account
          </h3>
          <div className="space-y-1">
            <NavItem
              icon={User}
              label="Login"
              active={activeSection === 'login'}
              onClick={() => onSectionChange('login')}
            />
            <NavItem
              icon={UserPlus}
              label="Sign Up"
              active={activeSection === 'signup'}
              onClick={() => onSectionChange('signup')}
            />
          </div>
        </div>

        {/* Main Navigation */}
        <div className="mb-6">
          <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Trading
          </h3>
          <div className="space-y-1">
            <NavItem
              icon={BarChart2}
              label="Dashboard"
              active={activeSection === 'dashboard'}
              onClick={() => onSectionChange('dashboard')}
            />
            <NavItem
              icon={Bot}
              label="Bot Dashboard"
              active={activeSection === 'bot-dashboard'}
              onClick={() => onSectionChange('bot-dashboard')}
            />
            <NavItem
              icon={TrendingUp}
              label="Trading Bots"
              active={activeSection === 'trading-bots'}
              onClick={() => onSectionChange('trading-bots')}
            />
            <NavItem
              icon={PieChart}
              label="Analytics"
              active={activeSection === 'analytics'}
              onClick={() => onSectionChange('analytics')}
            />
            <NavItem
              icon={Activity}
              label="Live Signals"
              active={activeSection === 'live-signals'}
              onClick={() => onSectionChange('live-signals')}
            />
            <NavItem
              icon={ExternalLink}
              label="LDP Tool"
              active={activeSection === 'ldp-tool'}
              onClick={() => onSectionChange('ldp-tool')}
            />
            <NavItem
              icon={Copy}
              label="Copy Trading"
              active={activeSection === 'copy-trading'}
              onClick={() => onSectionChange('copy-trading')}
            />
            <NavItem
              icon={History}
              label="History"
              active={activeSection === 'history'}
              onClick={() => onSectionChange('history')}
            />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Settings & Help
          </h3>
          <div className="space-y-1">
            <NavItem
              icon={Settings}
              label="Settings"
              active={activeSection === 'settings'}
              onClick={() => onSectionChange('settings')}
            />
            <NavItem
              icon={BookOpen}
              label="Documentation"
              active={activeSection === 'docs'}
              onClick={() => onSectionChange('docs')}
            />
            <NavItem
              icon={HelpCircle}
              label="Support"
              active={activeSection === 'support'}
              onClick={() => onSectionChange('support')}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">MP</span>
            </div>
            <div>
              <p className="text-sm font-medium">Mr Pope</p>
              <p className="text-xs text-gray-400">Pro Account</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Bell size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;