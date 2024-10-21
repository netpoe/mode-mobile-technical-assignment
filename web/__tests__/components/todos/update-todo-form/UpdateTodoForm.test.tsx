import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UpdateTodoForm } from "@/components/todos/update-todo-form/UpdateTodoForm";
import { ToDo } from "dummy-todo-api/v1/todo/controller";
import { TodosContextController } from "@/context/todos/TodosContextController";
import { ToDosService } from "@/lib/api-client/services/ToDosService";

jest.mock("@/lib/api-client/services/ToDosService", () => ({
  ToDosService: {
    updateTodo: jest.fn(),
    getTodos: jest.fn(),
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Marks ToDo as 'complete', calls updateTodo and getTodos, then displays 'pending' state", async () => {
    (ToDosService.updateTodo as jest.Mock).mockResolvedValue({ status: 200 });
    (ToDosService.getTodos as jest.Mock).mockResolvedValue({
      data: [{ ...mockTodo, completed: true }],
    });

    render(
      <TodosContextController>
        <UpdateTodoForm todo={mockTodo} />
      </TodosContextController>,
    );

    const completeButton = screen.getByRole("button", { name: /Mark As Complete/i });
    expect(completeButton).toBeInTheDocument();

    await userEvent.click(completeButton);

    // Check if updateTodo is called with the correct params
    const mockTodoMinusId = { ...mockTodo } as Partial<ToDo>;
    delete mockTodoMinusId.id;
    const mockTodoUpdated = { ...mockTodoMinusId, completed: true };

    await waitFor(() => {
      expect(ToDosService.updateTodo).toHaveBeenCalledWith(mockTodoUpdated, { id: mockTodo.id });
    });

    // Check if getTodos is called after updateTodo
    await waitFor(() => {
      expect(ToDosService.getTodos).toHaveBeenCalled();
    });

    render(
      <TodosContextController>
        <UpdateTodoForm todo={{ ...mockTodoUpdated, id: mockTodo.id } as ToDo} />
      </TodosContextController>,
    );

    // Check if the button text changes to "Mark As Pending"
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Mark As Pending/i })).toBeInTheDocument();
    });
  });
});
