"use client";

import React, { useEffect, useState } from "react";

import { Erc721Context } from "./Erc721Context";
import { Erc721ContextControllerProps, Erc721ContextType } from "./Erc721Context.types";
import { useEvmWalletSelectorContext } from "../wallet-selector/useEvmWalletSelectorContext";
import { useAccount, useClient, useWatchContractEvent } from "wagmi";
import { ERC721Instance } from "@/lib/evm/ERC721/ERC721Instance";
import { ZeroXAddress } from "@/lib/evm/evm.types";
import { useEvmSignatureVerificationContext } from "../evm-signature-verification/useEvmSignatureVerificationContext";
import { useTodosContext } from "@/context/todos/useTodosContext";
import { Log } from "viem";
import { isEqual, uniqWith } from "lodash";

export const Erc721ContextController = ({ children, abi, address: contractAddress }: Erc721ContextControllerProps) => {
  const [contract, setContract] = useState<ERC721Instance | undefined>(undefined);
  const [tokenIds, setTokenIds] = useState<bigint[]>([]);

  const { wagmiConfig } = useEvmWalletSelectorContext();

  const { address, isConnected } = useAccount();

  const publicClient = useClient({ config: wagmiConfig })!;

  const { ownershipVerification } = useEvmSignatureVerificationContext();

  const { todos } = useTodosContext();

  function recordTokenIdFromTransferEventLogs(logs: Log[]) {
    console.log("Transfer Event", logs);

    logs.forEach((log) => {
      if ((log as any)?.args?.tokenId) {
        setTokenIds((prev) => uniqWith([(log as any)?.args?.tokenId as bigint, ...prev], isEqual));
      }
    });
  }

  useWatchContractEvent({
    address: ERC721Instance.defaultContractAddress as ZeroXAddress,
    abi: ERC721Instance.defaultABI,
    eventName: "Transfer",
    onLogs: recordTokenIdFromTransferEventLogs,
  });

  const isMintingEnabled =
    isConnected && ownershipVerification.isSignatureVerified && todos.filter((todo) => todo.completed).length >= 2;

  async function loadContract() {
    try {
      const _contract = new ERC721Instance(
        contractAddress || ERC721Instance.defaultContractAddress,
        abi || ERC721Instance.defaultABI,
        publicClient,
      );

      await fetchContractValues(_contract);

      setContract(_contract);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchContractValues(_contract: ERC721Instance) {
    if (!_contract) return;

    try {
      await Promise.all([_contract.getName(), _contract.getSymbol(), _contract.getBalanceOf(address!)]);

      console.log(_contract.name, _contract.symbol);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadContract();
  }, [address]);

  const props: Erc721ContextType = {
    contract,
    loadContract,
    fetchContractValues,
    isMintingEnabled,
    tokenIds,
  };

  return <Erc721Context.Provider value={props}>{children}</Erc721Context.Provider>;
};
