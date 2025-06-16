import React, { createContext, useContext, useState } from 'react';

interface BotState {
  isConnected: boolean;
  isRunning: boolean;
  balance: number;
  profit: number;
  activeMarket: string;
  activeStrategy: string;
}

interface BotContextType {
  botState: BotState;
  updateBotState: (newState: Partial<BotState>) => void;
}

const initialBotState: BotState = {
  isConnected: true,
  isRunning: false,
  balance: 10452.36,
  profit: 186.25,
  activeMarket: 'EURUSD',
  activeStrategy: 'macd'
};

const BotContext = createContext<BotContextType | undefined>(undefined);

export const BotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [botState, setBotState] = useState<BotState>(initialBotState);
  
  const updateBotState = (newState: Partial<BotState>) => {
    setBotState(prevState => ({
      ...prevState,
      ...newState
    }));
  };
  
  return (
    <BotContext.Provider value={{ botState, updateBotState }}>
      {children}
    </BotContext.Provider>
  );
};

export const useBot = (): BotContextType => {
  const context = useContext(BotContext);
  if (context === undefined) {
    throw new Error('useBot must be used within a BotProvider');
  }
  return context;
};