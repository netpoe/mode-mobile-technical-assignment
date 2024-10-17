import { createContext } from "react";

import { EvmSignatureVerificationContextType } from "./EvmSignatureVerificationContext.types";

export const EvmSignatureVerificationContext = createContext<EvmSignatureVerificationContextType | undefined>(
  undefined,
);
