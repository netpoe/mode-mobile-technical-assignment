import clsx from "clsx";
import { Erc20BalanceOfProps } from "./Erc20BalanceOf.types";
import { useAccount, useReadContract } from "wagmi";
import { ERC20Instance } from "@/lib/evm/ERC20/ERC20Instance";
import { useEffect, useState } from "react";
import { formatEther, parseEther } from "viem";
import { useErc20Context } from "@/context/evm/erc20/useErc20Context";

export const Erc20BalanceOf: React.FC<Erc20BalanceOfProps> = ({ className }) => {
  const [balanceOf, setBalanceOf] = useState<bigint>(0n);

  const { contract: ERC20Contract } = useErc20Context();

  const { address } = useAccount();

  const { data, error, isLoading, isFetched, refetch } = useReadContract({
    abi: ERC20Instance.defaultABI,
    address: ERC20Instance.defaultContractAddress,
    functionName: "balanceOf",
    args: [address],
  });

  useEffect(() => {
    if (isLoading || !isFetched || !data) return;

    console.log({ data });
    setBalanceOf(data as bigint);
  }, [data, isLoading, isFetched]);

  useEffect(() => {
    if (!data || !refetch || !ERC20Contract) return;

    ERC20Contract.balanceOf = {
      value: data as bigint,
      refetch,
    };
  }, [data, refetch]);

  return <>{formatEther(balanceOf).toString()}</>;
};
