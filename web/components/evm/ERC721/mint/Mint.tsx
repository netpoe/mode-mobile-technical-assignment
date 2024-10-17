import { MintProps } from "./Mint.types";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import evm from "@/lib/evm";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useErc20Context } from "@/context/evm/erc20/useErc20Context";
import { ERC721Instance } from "@/lib/evm/ERC721/ERC721Instance";
import { useErc721Context } from "@/context/evm/erc721/useErc721Context";
import clsx from "clsx";

export const ERC721MintButton: React.FC<MintProps> = ({ className }) => {
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

  const { toast } = useToast();

  const { isMintingEnabled } = useErc721Context();

  function onClickMintNFT() {
    try {
      writeContract({
        abi: ERC721Instance.defaultABI,
        address: ERC721Instance.defaultContractAddress,
        functionName: "mint",
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
      title: "Your Mint Is Processing",
      description: `Your transaction should reflect after ${evm.const.DEFAULT_TX_CONFIRMATIONS_COUNT} confirmation(s).`,
    });
  }, [isPending]);

  useEffect(() => {
    if (!isSuccess) return;

    toast({
      title: "Your Mint Went Through!",
      description: `Enjoy your new NFT. Keep your productivity forward!`,
    });
  }, [isSuccess]);

  useEffect(() => {
    if (!isError) return;

    console.log({ writeContractError });

    toast({
      title: "Something Went Wrong",
      description: `Your mint transaction didn't go through. Try again?`,
      variant: "destructive",
    });
  }, [isError]);

  useEffect(() => {
    if (!isSuccess || !ERC20Contract) return;

    fetchERC20ContractValues(ERC20Contract);
  }, [isSuccess, ERC20Contract, fetchERC20ContractValues]);

  return (
    <Button
      size="lg"
      disabled={!isMintingEnabled}
      onClick={onClickMintNFT}
      className={clsx("mb-4 w-full sm:mb-0 sm:w-auto", className)}
    >
      {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      Mint My NFT!
    </Button>
  );
};
