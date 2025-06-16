import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi } from 'lightweight-charts';
import { useTradingStore } from '../../store/tradingStore';
import LoadingSpinner from '../UI/LoadingSpinner';
import SkeletonLoader from '../UI/SkeletonLoader';

interface ChartData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const AdvancedChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  
  const { ticks, activeSymbol, isConnected } = useTradingStore();

  // Simulate data loading with progress
  useEffect(() => {
    const loadChartData = async () => {
      setIsLoading(true);
      setLoadingProgress(0);

      // Simulate progressive data loading
      const intervals = [20, 40, 60, 80, 100];
      for (let i = 0; i < intervals.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setLoadingProgress(intervals[i]);
      }

      // Generate mock historical data
      const data: ChartData[] = [];
      const basePrice = 1.08650;
      let currentPrice = basePrice;
      
      for (let i = 0; i < 100; i++) {
        const time = Date.now() - (100 - i) * 60000; // 1 minute intervals
        const change = (Math.random() - 0.5) * 0.001;
        currentPrice += change;
        
        const open = currentPrice;
        const close = currentPrice + (Math.random() - 0.5) * 0.0005;
        const high = Math.max(open, close) + Math.random() * 0.0003;
        const low = Math.min(open, close) - Math.random() * 0.0003;
        const volume = Math.random() * 1000000;
        
        data.push({ time, open, high, low, close, volume });
      }
      
      setChartData(data);
      setIsLoading(false);
    };

    loadChartData();
  }, [activeSymbol]);

  useEffect(() => {
    if (!chartContainerRef.current || isLoading) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#1a1a1a' },
        textColor: '#DDD',
      },
      grid: {
        vertLines: { color: '#2c2c2c' },
        horzLines: { color: '#2c2c2c' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 500,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    const volumeSeries = chart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
    });

    chart.priceScale('').applyOptions({
      scaleMargins: {
        top: 0.7,
        bottom: 0,
      },
    });

    // Set data
    const candleData = chartData.map(d => ({
      time: d.time / 1000,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    }));

    const volumeData = chartData.map(d => ({
      time: d.time / 1000,
      value: d.volume,
      color: d.close > d.open ? '#26a69a' : '#ef5350',
    }));

    candlestickSeries.setData(candleData);
    volumeSeries.setData(volumeData);

    chartRef.current = chart;
    candlestickSeriesRef.current = candlestickSeries;
    volumeSeriesRef.current = volumeSeries;

    const handleResize = () => {
      if (chartContainerRef.current && chart) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [chartData, isLoading]);

  if (isLoading) {
    return (
      <div className="w-full h-[500px] bg-gray-900 rounded-lg flex flex-col items-center justify-center">
        <LoadingSpinner size="lg" color="blue" text="Loading chart data..." />
        <div className="w-64 mt-4">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="text-center text-sm text-gray-400 mt-2">{loadingProgress}%</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Advanced Price Chart</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
          <span className="text-sm text-gray-400">
            {isConnected ? 'Live Data' : 'Disconnected'}
          </span>
        </div>
      </div>
      <div ref={chartContainerRef} className="w-full h-[500px] bg-gray-900 rounded-lg" />
    </div>
  );
};

export default AdvancedChart;