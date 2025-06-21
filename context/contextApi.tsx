'use client';

import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext } from 'react';

interface ContextApiProps {
  fetchPolls: (params: { limit: number; offset: number }) => {
    data: any;
    isLoading: boolean;
    error: unknown;
  };
}

const ContextApi = createContext<ContextApiProps | undefined>(undefined);

const ContextApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const fetchPolls = ({ limit, offset }: { limit: number; offset: number }) => {
    const { data, isLoading, error } = useQuery({
      queryKey: ['poll', limit, offset],
      queryFn: async () => {
        const response = await fetch(`http://localhost:3000/polls/pagination?limit=${limit}&offset=${offset}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      },
      refetchOnWindowFocus: false,
    });

    return { data, isLoading, error };
  };

  return (
    <ContextApi.Provider value={{ fetchPolls }}>
      {children}
    </ContextApi.Provider>
  );
};

const useContextApi = (): ContextApiProps => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error('useContextApi must be used within a ContextApiProvider');
  }
  return context;
};

export { useContextApi, ContextApiProvider };
