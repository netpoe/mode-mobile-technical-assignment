import clsx from "clsx";
import { UpdateTodoFormProps } from "./UpdateTodoForm.types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useTodosContext } from "@/context/todos/useTodosContext";
import { KeyboardEvent, useEffect, useState } from "react";
import { DeleteToDoValidationType, UpdateToDoValidationType } from "dummy-todo-api/v1/todo/validation";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { CheckCircledIcon, ReloadIcon } from "@radix-ui/react-icons";

export const UpdateTodoForm: React.FC<UpdateTodoFormProps> = ({ todo, className }) => {
  const [actions, setActions] = useState({
    updateTodo: {
      isLoading: false,
      isUpdated: false,
    },
  });

  const { updateTodo, deleteTodo } = useTodosContext();

  const updateToDoForm = useForm<UpdateToDoValidationType>({
    resolver: zodResolver(
      z.object({
        params: z.object({ id: z.string().uuid() }),
        body: z.object({
          title: z.string().min(1).max(255),
          description: z.string().min(1).max(255),
          dueDate: z.coerce.date(),
          priority: z.enum(["low", "medium", "high"]),
          completed: z.boolean(),
        }),
      }),
    ),
  });

  async function onSubmitUpdateToDo(body: UpdateToDoValidationType["body"]) {
    setActions((prev) => ({ ...prev, updateTodo: { isLoading: true, isUpdated: false } }));

    await updateTodo(body, { id: todo.id }, updateToDoForm);

    setTimeout(() => {
      setActions((prev) => ({ ...prev, updateTodo: { isLoading: false, isUpdated: true } }));

      setTimeout(() => {
        setActions((prev) => ({ ...prev, updateTodo: { isLoading: false, isUpdated: false } }));
      }, 1000);
    }, 1500);
  }

  function onClickDeleteToDo() {
    deleteTodo({ id: todo.id });
  }

  function handlePriorityUpdate() {
    const priorityStates = ["low", "medium", "high"];
    const currentStateIndex = priorityStates.indexOf(todo.priority);
    const nextPriorityState =
      currentStateIndex + 1 > priorityStates.length - 1 ? priorityStates[0] : priorityStates[currentStateIndex + 1];

    updateToDoForm.setValue("body.priority", nextPriorityState as "low" | "medium" | "high");

    onSubmitUpdateToDo(updateToDoForm.getValues().body);
  }

  function handleStatusUpdate() {
    updateToDoForm.setValue("body.completed", !todo.completed);

    onSubmitUpdateToDo(updateToDoForm.getValues().body);
  }

  function handleOnUpdateTodoDescriptionChange(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      onSubmitUpdateToDo(updateToDoForm.getValues().body);
    }
  }

  useEffect(() => {
    if (!updateToDoForm) return;

    updateToDoForm.setValue("body.dueDate", todo.dueDate);
    updateToDoForm.setValue("body.title", todo.title);
    updateToDoForm.setValue("body.completed", todo.completed);
    updateToDoForm.setValue("body.priority", todo.priority);
  }, [updateToDoForm]);

  return (
    <div className={clsx(className)}>
      <Card key={todo.id} className="mb-4">
        <CardContent>
          <div className="mb-2 flex flex-row justify-end">
            {actions.updateTodo.isLoading && (
              <span className="mr-4 text-xs text-green-500">
                <ReloadIcon className="mr-2 inline h-4 w-4 animate-spin" />
                Updating
              </span>
            )}
            {actions.updateTodo.isUpdated && (
              <span className="mr-4 text-xs text-green-500">
                <CheckCircledIcon className="mr-2 inline h-4 w-4" />
                Done!
              </span>
            )}
            <Button size="sm" variant="link" className="h-auto p-0 text-red-600" onClick={() => onClickDeleteToDo()}>
              Delete
            </Button>
          </div>
          <Form {...updateToDoForm}>
            <form className="mb-4 w-full space-y-6 sm:mb-0">
              <FormField
                control={updateToDoForm.control}
                name="body.description"
                defaultValue={todo.description}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        onKeyDown={(event) => {
                          handleOnUpdateTodoDescriptionChange(event);
                        }}
                      />
                    </FormControl>

                    <FormMessage className="mb-2" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-end [&>div]:ml-2">
          <div>
            <Button
              onClick={handlePriorityUpdate}
              variant="outline"
              className={clsx({
                ["text-yellow-400"]: todo.priority === "medium",
                ["text-green-500"]: todo.priority === "high",
              })}
            >
              {todo.priority.toLocaleUpperCase()}
            </Button>
          </div>
          <div>
            <Button variant="outline" onClick={handleStatusUpdate}>
              {todo.completed ? "Mark As Pending" : "Mark As Complete"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
