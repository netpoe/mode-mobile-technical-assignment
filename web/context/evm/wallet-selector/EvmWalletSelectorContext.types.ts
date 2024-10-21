import { type Config } from "wagmi";
import { ReactNode } from "react";

export type EvmWalletSelectorContextControllerProps = {
  children: ReactNode;
};

export type EvmWalletSelectorContextType = {
  wagmiConfig: Config;
};
