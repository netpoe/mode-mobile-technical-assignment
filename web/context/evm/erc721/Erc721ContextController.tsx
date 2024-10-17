"use client";

import React, { useEffect, useState } from "react";

import { Erc721Context } from "./Erc721Context";
import { Erc721ContextControllerProps, Erc721ContextType } from "./Erc721Context.types";
import { useEvmWalletSelectorContext } from "../wallet-selector/useEvmWalletSelectorContext";
import { useAccount, useClient, useWaitForTransactionReceipt, useWatchContractEvent, useWriteContract } from "wagmi";
import { ERC721Instance } from "@/lib/evm/ERC721/ERC721Instance";
import { useErc20Context } from "../erc20/useErc20Context";
import { ZeroXAddress } from "@/lib/evm/evm.types";

export const Erc721ContextController = ({ children, abi, address: contractAddress }: Erc721ContextControllerProps) => {
  const [contract, setContract] = useState<ERC721Instance | undefined>(undefined);

  const { wagmiConfig } = useEvmWalletSelectorContext();

  const { address } = useAccount();

  const publicClient = useClient({ config: wagmiConfig })!;

  const { data: hash, isPending, writeContract } = useWriteContract();

  const { isLoading: isTxConfirming, isSuccess: isTxConfirmed } = useWaitForTransactionReceipt({
    confirmations: 1,
    hash,
    onReplaced: (replacement) => console.log(replacement),
  });

  useWatchContractEvent({
    address: ERC721Instance.defaultContractAddress as ZeroXAddress,
    abi: ERC721Instance.defaultABI,
    eventName: "Transfer",
    onLogs(logs) {
      console.log("Transfer Event", logs);
    },
  });

  const { contract: ERC20Contract, fetchContractValues: fetchERC20ContractValues } = useErc20Context();

  console.log({ hash, isPending, isTxConfirming, isTxConfirmed });

  async function loadContract() {
    try {
      const _contract = new ERC721Instance(
        contractAddress || ERC721Instance.defaultContractAddress,
        abi || ERC721Instance.defaultABI,
        publicClient,
      );

      _contract.setWriteContractHandler(writeContract);

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

  async function mint() {
    if (!contract) return;

    try {
      contract.mint();
    } catch (error) {
      console.error(error);
    }
  }

  async function burn() {
    if (!contract) return;

    try {
      // contract.burn(totalSupply!);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadContract();
  }, [address]);

  useEffect(() => {
    if (!isTxConfirmed || !ERC20Contract) return;

    fetchERC20ContractValues(ERC20Contract);
  }, [isTxConfirmed, ERC20Contract, fetchERC20ContractValues]);

  const props: Erc721ContextType = {
    contract,
    loadContract,
    fetchContractValues,
    mint,
    burn,
  };

  return <Erc721Context.Provider value={props}>{children}</Erc721Context.Provider>;
};
