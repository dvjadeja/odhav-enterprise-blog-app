"use client";

import React from "react";
import { QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "@/lib/utils/get-query-client";

interface QueryClientProviderProps {
  children: React.ReactNode;
}

const QueryClientProvider = ({ children }: QueryClientProviderProps) => {
  const queryClient = getQueryClient();

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </TanstackQueryClientProvider>
  );
};

export default QueryClientProvider;
