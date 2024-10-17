import { ERC721Instance } from "@/lib/evm/ERC721/ERC721Instance";
import { ZeroXAddress } from "@/lib/evm/evm.types";
import { ReactNode } from "react";

export type Erc721ContextControllerProps = {
  children: ReactNode;
  abi?: Record<string, any>;
  address?: ZeroXAddress;
};

export type Erc721ContextType = {
  contract?: ERC721Instance;
  loadContract: () => void;
  mint: () => void;
  burn: () => void;
  fetchContractValues: (_contract: ERC721Instance) => void;
};
