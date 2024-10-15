"use client";

import React, { useState } from "react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { WagmiProvider, cookieStorage, createStorage } from "wagmi";
import { polygonAmoy } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import wagmi from "@/lib/wagmi";

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

const chains = [polygonAmoy] as const;
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

createWeb3Modal({
  wagmiConfig,
  projectId,
});

export const EvmWalletSelectorContextController = ({ children }: EvmWalletSelectorContextControllerProps) => {
  const [queryClient] = useState(() => new QueryClient());

  const props: EvmWalletSelectorContextType = {
    wagmiConfig: wagmi.defaultConfig,
  };

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <EvmWalletSelectorContext.Provider value={props}>{children}</EvmWalletSelectorContext.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
