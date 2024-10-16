"use client";

import React, { useState } from "react";

import { TodosContext } from "./TodosContext";
import { TodosContextControllerProps, TodosContextType } from "./TodosContext.types";
import {
  CreateToDoValidationType,
  GetToDosValidationType,
  UpdateToDoValidationType,
} from "dummy-todo-api/v1/todo/validation";
import { ToDosService } from "@/lib/api-client";
import { ToDo } from "dummy-todo-api/v1/todo/controller";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const TodosContextController = ({ children }: TodosContextControllerProps) => {
  const [todos, setTodos] = useState<ToDo[]>([]);

  const createToDoForm = useForm<CreateToDoValidationType>({
    // Tried to import from api -> ToDoValidation, but it throws a depth Error.
    resolver: zodResolver(
      z.object({
        body: z.object({
          title: z.string().min(1).max(255),
          description: z.string().min(1).max(255),
          dueDate: z.coerce.date(),
          priority: z.enum(["low", "medium", "high"]),
        }),
      }),
    ),
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
        ...body,
        title: "placeholder",
        dueDate: new Date(),
        priority: "medium",
      });

      await getTodos({ page: 0, limit: 10 });

      createToDoForm.clearErrors();
      createToDoForm.resetField("body.description", { defaultValue: "" });

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateTodo(
    body: UpdateToDoValidationType["body"],
    params: UpdateToDoValidationType["params"],
    updateToDoForm: UseFormReturn<UpdateToDoValidationType>,
  ) {
    try {
      const result = await ToDosService.updateTodo(body, params);

      await getTodos({ page: 0, limit: 10 });

      updateToDoForm.clearErrors();

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  const props: TodosContextType = {
    createTodo,
    updateTodo,
    getTodos,
    todos,
    createToDoForm,
  };

  return <TodosContext.Provider value={props}>{children}</TodosContext.Provider>;
};
