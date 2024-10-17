import { type Config } from "wagmi";
import { ReactNode } from "react";

export type ZeroXAddress = `0x${string}`;

export type EvmWalletSelectorContextControllerProps = {
  children: ReactNode;
};

export type EvmWalletSelectorContextType = {
  wagmiConfig: Config;
};
