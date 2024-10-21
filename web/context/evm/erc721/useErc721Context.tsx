import { useContext } from "react";

import { Erc721Context } from "./Erc721Context";

export const useErc721Context = () => {
  const context = useContext(Erc721Context);

  if (context === undefined) {
    throw new Error("useErc721Context must be used within a Erc721Context");
  }

  return context;
};
