"use client";

import React from "react";
import { createAppKit } from "@reown/appkit/react";
import { polygonAmoy } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { type Config, cookieToInitialState, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { EvmWalletSelectorContext } from "./EvmWalletSelectorContext";
import {
  EvmWalletSelectorContextControllerProps,
  EvmWalletSelectorContextType,
} from "./EvmWalletSelectorContext.types";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error("No WalletConnect Project Id found");
}

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const networks = [polygonAmoy];

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
});

createAppKit({
  defaultNetwork: polygonAmoy,
  adapters: [wagmiAdapter],
  networks: [polygonAmoy],
  metadata,
  projectId,
  features: {
    analytics: true,
  },
});

const queryClient = new QueryClient();

export const EvmWalletSelectorContextController = ({
  children,
  cookies,
}: EvmWalletSelectorContextControllerProps & { cookies: string | null }) => {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies);

  const props: EvmWalletSelectorContextType = {
    wagmiConfig: wagmiAdapter.wagmiConfig,
  };

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <EvmWalletSelectorContext.Provider value={props}>{children}</EvmWalletSelectorContext.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
