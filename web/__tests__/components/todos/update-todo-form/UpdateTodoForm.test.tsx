import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UpdateTodoForm } from "@/components/todos/update-todo-form/UpdateTodoForm";
import { ToDo } from "dummy-todo-api/v1/todo/controller";
import { TodosContextController } from "@/context/todos/TodosContextController";

// Mock the TodosService
jest.mock("@/lib/api-client/services/ToDosService", () => ({
  ToDosService: {
    updateTodo: jest.fn(),
  },
}));

describe("UpdateTodoForm", () => {
  const mockTodo: ToDo = {
    id: "1",
    title: "Test Todo",
    description: "Test Description",
    dueDate: new Date("2023-12-31"),
    priority: "medium",
    completed: false,
  };

  it("renders the form with pre-filled values", () => {
    render(
      <TodosContextController>
        <UpdateTodoForm todo={mockTodo} />
      </TodosContextController>,
    );

    expect(
      screen.getByRole("button", {
        name: /Mark As Complete/i,
      }),
    ).toBeDefined();
  });
});
