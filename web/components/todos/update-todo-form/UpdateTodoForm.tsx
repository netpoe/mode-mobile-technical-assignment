import clsx from "clsx";
import { UpdateTodoFormProps } from "./UpdateTodoForm.types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useTodosContext } from "@/context/todos/useTodosContext";
import { KeyboardEvent, useEffect } from "react";
import { DeleteToDoValidationType, UpdateToDoValidationType } from "dummy-todo-api/v1/todo/validation";
import { Textarea } from "@/components/ui/textarea";
import { CustomLabel } from "@/components/custom-label/CustomLabel";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

export const UpdateTodoForm: React.FC<UpdateTodoFormProps> = ({ todo, className }) => {
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

  function onSubmitUpdateToDo(body: UpdateToDoValidationType["body"], params: UpdateToDoValidationType["params"]) {
    updateTodo(body, params, updateToDoForm);
  }

  function onClickDeleteToDo(params: DeleteToDoValidationType["params"]) {
    deleteTodo(params);
  }

  function handleOnUpdateTodoDescriptionChange(
    event: KeyboardEvent<HTMLTextAreaElement>,
    params: UpdateToDoValidationType["params"],
  ) {
    if (event.key === "Enter") {
      onSubmitUpdateToDo(updateToDoForm.getValues().body, params);
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
            <Button
              size="sm"
              variant="link"
              className="h-auto p-0 text-red-600"
              onClick={() => onClickDeleteToDo({ id: todo.id })}
            >
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
                          handleOnUpdateTodoDescriptionChange(event, { id: todo.id });
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
        <CardFooter className="p-0">
          <CustomLabel className="w-6/12">
            <CustomLabel.Head>Status</CustomLabel.Head>
            <CustomLabel.Description>
              {todo.completed ? <Badge variant="outline">Done</Badge> : <Badge variant="outline">Pending</Badge>}
            </CustomLabel.Description>
          </CustomLabel>
          <CustomLabel className="w-6/12">
            <CustomLabel.Head>Priority</CustomLabel.Head>
            <CustomLabel.Description>
              <Badge variant="outline">{todo.priority}</Badge>
            </CustomLabel.Description>
          </CustomLabel>
        </CardFooter>
      </Card>
    </div>
  );
};
