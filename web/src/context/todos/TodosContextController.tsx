"use client";

import React, { useState } from "react";

import { TodosContext } from "./TodosContext";
import { TodosContextControllerProps, TodosContextType } from "./TodosContext.types";
import { CreateToDoValidationType, GetToDosValidationType, ToDoValidation } from "dummy-todo-api/v1/todo/validation";
import { ToDosService } from "@/lib/api-client";
import { ToDo } from "dummy-todo-api/v1/todo/controller";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const TodosContextController = ({ children }: TodosContextControllerProps) => {
  const [todos, setTodos] = useState<ToDo[]>([]);

  const createToDoForm = useForm<CreateToDoValidationType>({
    resolver: zodResolver(ToDoValidation.createToDo),
  });

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
      const result = await ToDosService.createTodo({
        title: "placeholder",
        dueDate: new Date(),
        priority: "medium",
        ...body,
      });

      await getTodos({ page: 0, limit: 10 });

      createToDoForm.clearErrors();
      createToDoForm.resetField("body.description", { defaultValue: "" });

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  const props: TodosContextType = {
    createTodo,
    getTodos,
    todos,
    createToDoForm,
  };

  return <TodosContext.Provider value={props}>{children}</TodosContext.Provider>;
};
