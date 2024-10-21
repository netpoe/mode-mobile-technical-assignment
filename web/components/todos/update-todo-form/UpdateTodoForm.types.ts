import { ToDo } from "dummy-todo-api/v1/todo/controller";
import { ReactNode } from "react";

export type UpdateTodoFormProps = {
  todo: ToDo;
  children?: ReactNode;
  className?: string;
};
