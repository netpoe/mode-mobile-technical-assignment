"use client";

import React, { useEffect, useState } from "react";

import { Erc20Context } from "./Erc20Context";
import { Erc20ContextControllerProps, Erc20ContextType } from "./Erc20Context.types";
import { ERC20Instance } from "@/lib/evm/ERC20/ERC20Instance";
import { publicClient } from "@/lib/evm/client";
import { useAccount } from "wagmi";

export const Erc20ContextController = ({ children, abi, address: contractAddress }: Erc20ContextControllerProps) => {
  const [contract, setContract] = useState<ERC20Instance | undefined>(undefined);

  const { address } = useAccount();

  async function loadContract() {
    try {
      const _contract = new ERC20Instance(
        contractAddress || ERC20Instance.defaultContractAddress,
        abi || ERC20Instance.defaultABI,
        publicClient,
      );

      const instance = await fetchContractValues(_contract);

      setContract(instance);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchContractValues(_contract: ERC20Instance) {
    if (!_contract) return;

    try {
      const instances = await Promise.all([
        _contract.getName(),
        _contract.getSymbol(),
        _contract.getBalanceOf(address!),
      ]);
      const instance = instances[instances.length - 1];

      return instance;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadContract();
  }, [address]);

  const props: Erc20ContextType = {
    contract,
    loadContract,
    fetchContractValues,
  };

  return <Erc20Context.Provider value={props}>{children}</Erc20Context.Provider>;
};
