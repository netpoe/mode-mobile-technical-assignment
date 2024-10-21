import { createContext } from "react";

import { TodosContextType } from "./TodosContext.types";

export const TodosContext = createContext<TodosContextType | undefined>(undefined);
