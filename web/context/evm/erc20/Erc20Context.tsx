import { createContext } from "react";

import { Erc20ContextType } from "./Erc20Context.types";

export const Erc20Context = createContext<Erc20ContextType | undefined>(undefined);
