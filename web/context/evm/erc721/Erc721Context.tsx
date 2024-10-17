import { createContext } from "react";

import { Erc721ContextType } from "./Erc721Context.types";

export const Erc721Context = createContext<Erc721ContextType | undefined>(undefined);
