import { useContext } from "react";

import { Erc20Context } from "./Erc20Context";

export const useErc20Context = () => {
  const context = useContext(Erc20Context);

  if (context === undefined) {
    throw new Error("useErc20Context must be used within a Erc20Context");
  }

  return context;
};
