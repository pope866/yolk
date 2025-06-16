import React, { useEffect } from 'react';
import Layout from './components/Layout/Layout';
import TradingDashboard from './components/Dashboard/TradingDashboard';
import { useTradingStore } from './store/tradingStore';

function App() {
  const { connect, subscribeToTicks, activeSymbol } = useTradingStore();

  useEffect(() => {
    connect();
    subscribeToTicks(activeSymbol);
  }, []);

  return (
    <Layout>
      <TradingDashboard />
    </Layout>
  );
}

export default App;