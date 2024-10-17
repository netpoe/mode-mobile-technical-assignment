import { MintProps } from "./Mint.types";
import { useTodosContext } from "@/context/todos/useTodosContext";
import { useEvmSignatureVerificationContext } from "@/context/evm/evm-signature-verification/useEvmSignatureVerificationContext";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { ERC20Instance } from "@/lib/evm/ERC20/ERC20Instance";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import evm from "@/lib/evm";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useErc20Context } from "@/context/evm/erc20/useErc20Context";

export const ERC721MintButton: React.FC<MintProps> = ({ children, className }) => {
  const { ownershipVerification } = useEvmSignatureVerificationContext();

  const { todos } = useTodosContext();

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

  const { isConnected } = useAccount();

  const { toast } = useToast();

  console.log({ writeContractError });

  function onClickMintNFT() {
    try {
      writeContract({
        abi: ERC20Instance.defaultABI,
        address: ERC20Instance.defaultContractAddress,
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

  const isMintingEnabled =
    isConnected && ownershipVerification.isSignatureVerified && todos.filter((todo) => todo.completed).length >= 2;

  return (
    <Button size="lg" disabled={!isMintingEnabled} onClick={onClickMintNFT} className="mb-4 w-full sm:mb-0 sm:w-auto">
      {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      Mint My NFT!
    </Button>
  );
};
