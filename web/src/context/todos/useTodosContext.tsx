import { useContext } from "react";

import { TodosContext } from "./TodosContext";

export const useTodosContext = () => {
  const context = useContext(TodosContext);

  if (context === undefined) {
    throw new Error("useTodosContext must be used within a TodosContext");
  }

  return context;
};
