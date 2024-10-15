import { ToDo } from "dummy-todo-api/v1/todo/controller";
import { CreateToDoValidationType, GetToDosValidationType } from "dummy-todo-api/v1/todo/validation";
import { ReactNode } from "react";

export type TodosContextControllerProps = {
  children: ReactNode;
};

export type TodosContextType = {
  todos: ToDo[];
  createTodo: (_body: CreateToDoValidationType["body"]) => Promise<void>;
  getTodos: (_body: GetToDosValidationType["query"]) => Promise<void>;
};
