import { ERC20Instance } from "@/lib/evm/ERC20/ERC20Instance";
import { ZeroXAddress } from "@/lib/evm/evm.types";
import { ReactNode } from "react";

export type Erc20ContextControllerProps = {
  children: ReactNode;
  abi?: Record<string, any>;
  address?: ZeroXAddress;
};

export type Erc20ContextType = {
  contract?: ERC20Instance;
  loadContract: () => void;
};
