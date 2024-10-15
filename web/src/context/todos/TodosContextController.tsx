"use client";

import React, { useState } from "react";

import { TodosContext } from "./TodosContext";
import { TodosContextControllerProps, TodosContextType } from "./TodosContext.types";
import { CreateToDoRequest } from "@/lib/api-client/models/ToDos";
import { ToDosService } from "@/lib/api-client";

export const TodosContextController = ({ children }: TodosContextControllerProps) => {
  const [state, setState] = useState(undefined);

  async function createTodo(body: CreateToDoRequest) {
    try {
      const result = await ToDosService.postTodos(body);

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  const props: TodosContextType = {
    createTodo,
  };

  return <TodosContext.Provider value={props}>{children}</TodosContext.Provider>;
};
