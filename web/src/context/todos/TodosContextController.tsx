"use client";

import React, { useState } from "react";

import { TodosContext } from "./TodosContext";
import { TodosContextControllerProps, TodosContextType } from "./TodosContext.types";
import { CreateToDoValidationType, GetToDosValidationType } from "dummy-todo-api/v1/todo/validation";
import { ToDosService } from "@/lib/api-client";
import { ToDo } from "dummy-todo-api/v1/todo/controller";

export const TodosContextController = ({ children }: TodosContextControllerProps) => {
  const [todos, setTodos] = useState<ToDo[]>([]);

  async function getTodos(body: GetToDosValidationType["query"]) {
    try {
      const result = await ToDosService.getTodos(body);

      console.log(result);

      if (!result?.data) {
        throw new Error("Invalid ToDo Data");
      }

      setTodos(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function createTodo(body: CreateToDoValidationType["body"]) {
    try {
      const result = await ToDosService.createTodo(body);

      getTodos({ page: 0, limit: 10 });

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  const props: TodosContextType = {
    createTodo,
    getTodos,
    todos,
  };

  return <TodosContext.Provider value={props}>{children}</TodosContext.Provider>;
};
