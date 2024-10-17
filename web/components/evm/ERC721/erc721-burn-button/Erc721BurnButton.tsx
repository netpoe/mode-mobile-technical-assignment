import clsx from "clsx";
import { Erc721BurnButtonProps } from "./Erc721BurnButton.types";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useErc20Context } from "@/context/evm/erc20/useErc20Context";
import { useTodosContext } from "@/context/todos/useTodosContext";
import { useEvmSignatureVerificationContext } from "@/context/evm/evm-signature-verification/useEvmSignatureVerificationContext";
import { Button } from "@/components/ui/button";
import { ERC721Instance } from "@/lib/evm/ERC721/ERC721Instance";
import evm from "@/lib/evm";
import { useErc721Context } from "@/context/evm/erc721/useErc721Context";

export const Erc721BurnButton: React.FC<Erc721BurnButtonProps> = ({ className }) => {
  const {
    data: hash,
    isPending,
    writeContract,
    isError: isWriteContractError,
    error: writeContractError,
  } = useWriteContract();

  const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt({
    confirmations: 1,
    hash,
    onReplaced: (replacement) => console.log(replacement),
  });

  const { contract: ERC20Contract, fetchContractValues: fetchERC20ContractValues } = useErc20Context();

  const {
    isMintingEnabled,
    tokenIds,
    fetchContractValues: fetchERC721ContractValues,
    contract: ERC721Contract,
  } = useErc721Context();

  const { toast } = useToast();

  console.log({ writeContractError });

  function onClickBurnNFT() {
    try {
      console.log(tokenIds);

      writeContract({
        abi: ERC721Instance.defaultABI,
        address: ERC721Instance.defaultContractAddress,
        functionName: "burn",
        args: [tokenIds[tokenIds.length - 1]],
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Something Went Wrong",
        description: (error as Error)?.message,
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    if (!isPending) return;

    toast({
      title: "Your Burn Is Processing",
      description: `Your transaction should reflect after ${evm.const.DEFAULT_TX_CONFIRMATIONS_COUNT} confirmation(s).`,
    });
  }, [isPending]);

  useEffect(() => {
    if (!isSuccess) return;

    toast({
      title: "Your Burn Went Through!",
      description: `You should have received ERC20 tokens!`,
    });
  }, [isSuccess]);

  useEffect(() => {
    if (!isError) return;

    toast({
      title: "Something Went Wrong",
      description: `Your burn transaction didn't go through. Try again?`,
      variant: "destructive",
    });
  }, [isError]);

  useEffect(() => {
    if (!isSuccess || !ERC20Contract || !ERC721Contract) return;

    fetchERC20ContractValues(ERC20Contract);
    fetchERC721ContractValues(ERC721Contract);
  }, [isSuccess, ERC20Contract, fetchERC20ContractValues, ERC721Contract]);

  return (
    <Button
      className={clsx("mr-4", className)}
      size="sm"
      variant="ghost"
      onClick={onClickBurnNFT}
      disabled={!isMintingEnabled}
    >
      Burn
    </Button>
  );
};
