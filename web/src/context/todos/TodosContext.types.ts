import { ToDo } from "dummy-todo-api/v1/todo/controller";
import { CreateToDoValidationType, GetToDosValidationType } from "dummy-todo-api/v1/todo/validation";
import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";

export type TodosContextControllerProps = {
  children: ReactNode;
};

export type TodosContextType = {
  todos: ToDo[];
  createToDoForm: UseFormReturn<CreateToDoValidationType>;
  createTodo: (_body: CreateToDoValidationType["body"]) => Promise<void>;
  getTodos: (_body: GetToDosValidationType["query"]) => Promise<void>;
};
