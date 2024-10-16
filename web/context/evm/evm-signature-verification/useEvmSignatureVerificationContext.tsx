import { useContext } from "react";

import { EvmSignatureVerificationContext } from "./EvmSignatureVerificationContext";

export const useEvmSignatureVerificationContext = () => {
  const context = useContext(EvmSignatureVerificationContext);

  if (context === undefined) {
    throw new Error("useEvmSignatureVerificationContext must be used within a EvmSignatureVerificationContext");
  }

  return context;
};
