import { create } from 'zustand';
import DerivAPIService from '../services/DerivAPI';

interface TradingState {
  isConnected: boolean;
  activeSymbol: string;
  ticks: any[];
  balance: number;
  activeContracts: any[];
  error: string | null;
  connect: () => Promise<void>;
  setActiveSymbol: (symbol: string) => void;
  subscribeToTicks: (symbol: string) => Promise<void>;
  buyContract: (parameters: any) => Promise<void>;
}

const derivAPI = DerivAPIService.getInstance();

export const useTradingStore = create<TradingState>((set, get) => ({
  isConnected: false,
  activeSymbol: 'R_100',
  ticks: [],
  balance: 0,
  activeContracts: [],
  error: null,

  connect: async () => {
    try {
      await derivAPI.connect();
      set({ isConnected: true, error: null });
    } catch (error) {
      set({ error: 'Failed to connect to Deriv API' });
    }
  },

  setActiveSymbol: (symbol: string) => {
    set({ activeSymbol: symbol });
    get().subscribeToTicks(symbol);
  },

  subscribeToTicks: async (symbol: string) => {
    try {
      await derivAPI.subscribeToTicks(symbol, (tick) => {
        set((state) => ({
          ticks: [...state.ticks.slice(-100), tick]
        }));
      });
    } catch (error) {
      set({ error: 'Failed to subscribe to market data' });
    }
  },

  buyContract: async (parameters) => {
    try {
      const result = await derivAPI.buyContract(parameters);
      set((state) => ({
        activeContracts: [...state.activeContracts, result.buy]
      }));
    } catch (error) {
      set({ error: 'Failed to execute trade' });
    }
  }
}));