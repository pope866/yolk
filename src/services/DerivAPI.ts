import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic';

class DerivAPIService {
  private static instance: DerivAPIService;
  private api: DerivAPIBasic | null = null;
  private connection: WebSocket | null = null;
  private app_id = '1089'; // Replace with your app_id
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 2000; // Start with 2 seconds
  private subscribers: Map<string, (data: any) => void> = new Map();
  
  private constructor() {}
  
  static getInstance(): DerivAPIService {
    if (!DerivAPIService.instance) {
      DerivAPIService.instance = new DerivAPIService();
    }
    return DerivAPIService.instance;
  }

  private async setupWebSocket(): Promise<WebSocket> {
    return new Promise((resolve, reject) => {
      try {
        const ws = new WebSocket(
          `wss://ws.binaryws.com/websockets/v3?app_id=${this.app_id}`
        );

        ws.onopen = () => {
          console.log('WebSocket connection established');
          this.reconnectAttempts = 0;
          resolve(ws);
        };

        ws.onclose = () => {
          console.log('WebSocket connection closed');
          this.handleReconnect();
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          if (this.reconnectAttempts === 0) {
            reject(error);
          }
        };

        ws.onmessage = (msg) => {
          try {
            const data = JSON.parse(msg.data);
            if (data.error) {
              console.error('API Error:', data.error);
              return;
            }
            
            // Handle different message types
            if (data.msg_type === 'tick') {
              const subscriber = this.subscribers.get('tick');
              if (subscriber) subscriber(data.tick);
            }
          } catch (error) {
            console.error('Error processing message:', error);
          }
        };

      } catch (error) {
        console.error('Error setting up WebSocket:', error);
        reject(error);
      }
    });
  }

  private async handleReconnect(): Promise<void> {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`);

    await new Promise(resolve => setTimeout(resolve, delay));
    
    try {
      await this.connect();
      // Resubscribe to active subscriptions
      for (const [type, callback] of this.subscribers.entries()) {
        if (type === 'tick') {
          await this.subscribeToTicks(callback);
        }
      }
    } catch (error) {
      console.error('Reconnection failed:', error);
    }
  }

  async connect(): Promise<void> {
    try {
      if (this.connection?.readyState === WebSocket.OPEN) {
        console.log('Already connected');
        return;
      }

      this.connection = await this.setupWebSocket();
      this.api = new DerivAPIBasic({ connection: this.connection });
    } catch (error) {
      console.error('Connection failed:', error);
      throw new Error('Failed to connect to Deriv API');
    }
  }

  async authorize(token: string): Promise<any> {
    if (!this.api) throw new Error('API not initialized');
    
    try {
      const response = await this.api.authorize(token);
      return response;
    } catch (error) {
      console.error('Authorization failed:', error);
      throw error;
    }
  }

  async subscribeToTicks(callback: (tick: any) => void): Promise<any> {
    if (!this.api) throw new Error('API not initialized');
    
    try {
      this.subscribers.set('tick', callback);
      const response = await this.api.subscribe({
        ticks: 'R_100',
        subscribe: 1
      });
      return response;
    } catch (error) {
      console.error('Failed to subscribe to ticks:', error);
      throw error;
    }
  }

  async getActiveSymbols(): Promise<any> {
    if (!this.api) throw new Error('API not initialized');
    
    try {
      const response = await this.api.activeSymbols();
      return response.active_symbols;
    } catch (error) {
      console.error('Failed to fetch active symbols:', error);
      throw error;
    }
  }

  async buyContract(parameters: {
    contract_type: string;
    currency: string;
    amount: number;
    symbol: string;
    duration: number;
    duration_unit: string;
  }): Promise<any> {
    if (!this.api) throw new Error('API not initialized');
    
    try {
      const response = await this.api.buy({
        buy: 1,
        ...parameters
      });
      return response;
    } catch (error) {
      console.error('Failed to buy contract:', error);
      throw error;
    }
  }

  disconnect(): void {
    this.subscribers.clear();
    if (this.connection) {
      this.connection.close();
      this.connection = null;
      this.api = null;
    }
  }
}

export default DerivAPIService;