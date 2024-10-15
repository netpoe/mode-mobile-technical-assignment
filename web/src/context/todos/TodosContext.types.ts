import { CreateToDoRequest } from "@/lib/api-client/models/ToDos";
import { ReactNode } from "react";

export type TodosContextControllerProps = {
  children: ReactNode;
};

export type TodosContextType = {
  createTodo: (_body: CreateToDoRequest) => Promise<void>;
};
