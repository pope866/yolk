import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BotProvider } from './context/BotContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BotProvider>
      <App />
    </BotProvider>
  </StrictMode>
);