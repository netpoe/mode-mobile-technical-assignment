# Mode Mobile Web3 ToDo App

Having followed the instructions, I present to you my own version of Web3 ToDos.

This repo:

- Is a NextJS 14+ app with App Router
- The UI libraries include Tailwind CSS and Shadcn
- State management uses advanced implementation of native `useContext` hooks
- Wallet connection is handled by AppKit (former WalletConnect)

[Demo ToDos Web3 App Video](https://vimeo.com/1021849672?share=copy#t=0)
<img width="1201" alt="Screenshot 2024-10-21 at 13 32 26" src="https://github.com/user-attachments/assets/ad35f364-75ca-42a0-a402-c07e5151802c">

## Highlights

I made important decisions to avoid repeating myself. The client app uses the ToDos API as a linked local yarn
dependency to reuse the Typescript types and Zod objects that were already in place.

This app uses the latest version of AppKit (WalletConnect changed its name).

This app uses the "Wagmi React Hooks" way of rendering data from the contracts.

Also, I'm not sure if it was on purpose, but the contract ABIs were incomplete and threw an error when trying to mint or
burn, so I updated the ABI files too. I created a new hardhart project to compile the TestNFT contract and get the full
ABI.

The project uses automatic industry standard linting and formatting. VS Code setting files included.

Web3 Authentication is checked on the server side too.

I tried to use the included Bruno API files, but Bruno is very limited on their plugins such as exporting for OpenAPI or
even creating typings, so I opted out of Bruno.

### Regarding SSR

Since the ToDos will be fetched after successful wallet authentication and message signing verification, the ToDos must
be requested client-side. I understand the use of SSR when necessary, though.

## Project Setup

Navigate into the `web` directory and run:

```bash
yarn
```

Then, simply update the `.env.example` file with your own WalletConnect AppKit API token and run:

```bash
make up-dev
```

This command should link the local dependencies.

Finally, run:

```bash
yarn dev
```

OR, if you're in VS Code, try running the app with the debugger settings set in `launch.json` by hitting the F5 button
on your keyboard, or running the debugger manually.

At this point, you should see the app in `localhost:3002`.

## Unit Tests

Make sure you've run `yarn` to install the dependencies at the `web` project and then a simple:

```bash
yarn test
```

should run `UpdateTodoForm.test.tsx`.

## Architectural Choices

> Add a README that explains the architectural choices, particularly around session management, server-side rendering,
> and blockchain interactions.

The "Wagmi" way of interacting with Solidity contracts is by their `useReadContract` and `useWriteContract` hooks. Once
the `EvmWalletSelectorController`  is setup in `layout.tsx`, the correct way of fetching, for example, the balance of
the ERC20 contract is this one:

```typescript
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

```

You'll notice that the return value is a blank component with no styling, since I will style the value later:

```typescript
<CustomLabel className="text-right">
    <CustomLabel.Head className="justify-end">
        <h5 className="mb-0">ERC20 Balance</h5>
    </CustomLabel.Head>
    <CustomLabel.Description className="justify-end">
        <h4 className="mb-0 max-w-[180px] truncate">
            <Erc20BalanceOf />
        </h4>
    </CustomLabel.Description>
</CustomLabel>
```

It is important to notice this block:

```typescript
useEffect(() => {
  if (!data || !refetch || !ERC20Contract) return;

  ERC20Contract.balanceOf = {
    value: data as bigint,
    refetch,
  };
}, [data, refetch]);
```

Since we want to refetch the value after the NFT has been burnt, I needed a way to keep this function to use it later:

```typescript
// ...

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

  // ...

  useEffect(() => {
    if (!isSuccess || !ERC20Contract || !ERC721Contract) return;

    console.log(ERC20Contract.balanceOf);

    const refetch = ERC20Contract.balanceOf?.refetch || undefined;

    if (!refetch) return;

    refetch();
  }, [isSuccess, ERC20Contract, fetchERC20ContractValues, ERC721Contract]);

  return (
    <Button
      className={clsx("mr-4", className)}
      size="sm"
      variant="ghost"
      onClick={onClickBurnNFT}
      disabled={!isMintingEnabled}
    >
      {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      Burn
    </Button>
  );
};
```

With the correct use of an `Erc20Context`, I can get the `refetch` function stored in the `ERC20Instance` singleton and
succesfully refetch the value for `Erc20BalanceOf.tsx`.
