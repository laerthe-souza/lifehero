import React, { createContext, useCallback, useContext, useState } from 'react';
import Loading from '../components/Loading';

interface LoadingContextData {
  callingLoadingFunction(isLoading: boolean): void;
}

const LoadingContext = createContext<LoadingContextData>(
  {} as LoadingContextData,
);

export const LoadingProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const callingLoadingFunction = useCallback((isLoading: boolean) => {
    setLoading(isLoading);
  }, []);

  return (
    <LoadingContext.Provider value={{ callingLoadingFunction }}>
      {children}
      <Loading isLoading={loading} />
    </LoadingContext.Provider>
  );
};

export function useLoading(): LoadingContextData {
  const context = useContext(LoadingContext);

  return context;
}
