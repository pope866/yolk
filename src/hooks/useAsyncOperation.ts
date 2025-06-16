import { useState, useCallback } from 'react';

interface AsyncOperationState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  progress: number;
}

interface UseAsyncOperationReturn<T> {
  state: AsyncOperationState<T>;
  execute: (operation: () => Promise<T>) => Promise<void>;
  reset: () => void;
  setProgress: (progress: number) => void;
}

export function useAsyncOperation<T = any>(): UseAsyncOperationReturn<T> {
  const [state, setState] = useState<AsyncOperationState<T>>({
    data: null,
    loading: false,
    error: null,
    progress: 0
  });

  const execute = useCallback(async (operation: () => Promise<T>) => {
    setState(prev => ({ ...prev, loading: true, error: null, progress: 0 }));
    
    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setState(prev => ({
          ...prev,
          progress: Math.min(prev.progress + Math.random() * 20, 90)
        }));
      }, 200);

      const result = await operation();
      
      clearInterval(progressInterval);
      setState(prev => ({ ...prev, progress: 100 }));
      
      // Small delay to show 100% completion
      setTimeout(() => {
        setState({
          data: result,
          loading: false,
          error: null,
          progress: 100
        });
      }, 300);
      
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
        progress: 0
      });
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      progress: 0
    });
  }, []);

  const setProgress = useCallback((progress: number) => {
    setState(prev => ({ ...prev, progress }));
  }, []);

  return { state, execute, reset, setProgress };
}