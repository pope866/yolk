import React from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign, Activity, TrendingUp, BarChart } from 'lucide-react';

const AccountSummary: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center text-gray-400 mb-1">
            <DollarSign size={14} className="mr-1" />
            <span className="text-xs">Balance</span>
          </div>
          <p className="text-lg font-bold">$10,452.36</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center text-gray-400 mb-1">
            <Activity size={14} className="mr-1" />
            <span className="text-xs">Today's P&L</span>
          </div>
          <div className="flex items-center">
            <p className="text-lg font-bold text-green-500">+$186.25</p>
            <ArrowUpRight size={16} className="ml-1 text-green-500" />
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm">
            <TrendingUp size={16} className="text-gray-400 mr-2" />
            <span>Win rate</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">68%</span>
            <div className="ml-2 w-16 bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm">
            <BarChart size={16} className="text-gray-400 mr-2" />
            <span>Total trades</span>
          </div>
          <span className="font-medium">32</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm">
            <ArrowUpRight size={16} className="text-gray-400 mr-2" />
            <span>Winning trades</span>
          </div>
          <span className="font-medium text-green-500">22</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm">
            <ArrowDownRight size={16} className="text-gray-400 mr-2" />
            <span>Losing trades</span>
          </div>
          <span className="font-medium text-red-500">10</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-700">
        <h4 className="font-medium mb-2">Account Details</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Account type</span>
            <span className="text-sm">Demo</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Leverage</span>
            <span className="text-sm">1:100</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Margin level</span>
            <span className="text-sm">2345.78%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;