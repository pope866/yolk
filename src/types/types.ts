export interface Trade {
  id: string;
  market: string;
  type: 'buy' | 'sell';
  entryPrice: number;
  closePrice?: number;
  openTime: string;
  closeTime?: string;
  profit?: number;
  status: 'open' | 'closed';
  stake: number;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  parameters: Record<string, any>;
}

export interface Market {
  symbol: string;
  name: string;
  type: 'forex' | 'crypto' | 'stock' | 'commodity';
  pip: number;
  minStake: number;
  maxStake: number;
}

export interface BotSettings {
  maxTrades: number;
  defaultStake: number;
  takeProfit: number;
  stopLoss: number;
  riskPerTrade: number;
}

export interface MarketData {
  symbol: string;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface IndicatorValue {
  timestamp: number;
  value: number | number[];
}

export interface AccountInfo {
  accountId: string;
  type: 'demo' | 'real';
  balance: number;
  equity: number;
  availableMargin: number;
  usedMargin: number;
  leverage: string;
}

export interface TradingStats {
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  averageWin: number;
  averageLoss: number;
  profitFactor: number;
  totalProfit: number;
  maxDrawdown: number;
}