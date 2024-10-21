import clsx from "clsx";
import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";

import evm from "@/lib/evm";

import { WalletSelectorProps } from "./WalletSelector.types";
import { Button } from "@/components/ui/button";

export const WalletSelector: React.FC<WalletSelectorProps> = ({ className }) => {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();

  const handleOnDisplayWidgetClick = () => {
    if (isConnected) {
      open({ view: "Account" });
    } else {
      open();
    }
  };

  return (
    <div className={clsx(className)}>
      <Button color="secondary" variant="outline" onClick={handleOnDisplayWidgetClick}>
        {isConnected ? <>{evm.format.truncate(address!)}</> : <>Connect Wallet</>}
      </Button>
    </div>
  );
};
