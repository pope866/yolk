import React from 'react';
import { 
  BarChart2, 
  Settings, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  BookOpen,
  PieChart,
  Sliders
} from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active }) => {
  return (
    <li>
      <a
        href="#"
        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
          active 
            ? 'bg-gray-800 text-white' 
            : 'text-gray-400 hover:text-white hover:bg-gray-800'
        }`}
      >
        <span className="mr-3">{icon}</span>
        <span>{label}</span>
      </a>
    </li>
  );
};

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-gray-700 bg-gray-900">
      <div className="p-4 border-b border-gray-700">
        <div className="bg-gray-800 rounded-lg p-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Balance</p>
              <p className="text-lg font-semibold">$10,452.36</p>
            </div>
            <div className="bg-green-500 bg-opacity-20 text-green-400 text-xs px-2 py-1 rounded-full">
              +5.2%
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          <ul>
            <NavItem icon={<BarChart2 size={18} />} label="Dashboard" active />
            <NavItem icon={<TrendingUp size={18} />} label="Trading" />
            <NavItem icon={<Sliders size={18} />} label="Bot Settings" />
            <NavItem icon={<PieChart size={18} />} label="Performance" />
            <NavItem icon={<Clock size={18} />} label="Trade History" />
            <NavItem icon={<DollarSign size={18} />} label="Accounts" />
            <NavItem icon={<BookOpen size={18} />} label="Documentation" />
            <NavItem icon={<Settings size={18} />} label="Settings" />
          </ul>
        </nav>
      </div>
      <div className="p-4 border-t border-gray-700">
        <div className="bg-blue-500 bg-opacity-10 rounded-lg p-3">
          <h4 className="text-blue-400 font-medium text-sm">Pro Plan</h4>
          <p className="text-xs text-gray-400 mt-1">Your plan expires in 15 days</p>
          <button className="mt-2 text-xs bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md transition-colors w-full">
            Upgrade Plan
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;