"use client";

import { useTodosContext } from "@/context/todos/useTodosContext";
import { Table, TableBody, TableCell, TableRow, TableHeader } from "@/components/ui/table";
import { CreateToDoValidationType } from "dummy-todo-api/v1/todo/validation";
import clsx from "clsx";
import { KeyboardEvent, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useEvmSignatureVerificationContext } from "@/context/evm/evm-signature-verification/useEvmSignatureVerificationContext";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { createTodo, getTodos, todos, createToDoForm } = useTodosContext();
  const { handleOnSignMessage, handleOnDisplayWidgetClick, ownershipVerification } =
    useEvmSignatureVerificationContext();
  const { isConnected } = useAccount();

  function onSubmitCreateToDo(data: CreateToDoValidationType) {
    createTodo(data.body);
  }

  function handleOnTextareaDescriptionChange(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      onSubmitCreateToDo(createToDoForm.getValues());
    }
  }

  function getActionComponent() {
    if (!isConnected) {
      return <Button onClick={handleOnDisplayWidgetClick}>Connect Your Wallet To Create ToDos</Button>;
    }

    if (isConnected && !ownershipVerification.isSignatureVerified) {
      return <Button onClick={handleOnSignMessage}>Authenticate</Button>;
    }

    return (
      <Form {...createToDoForm}>
        <form onSubmit={createToDoForm.handleSubmit(onSubmitCreateToDo)} className="mb-4 w-full space-y-6 sm:mb-0">
          <FormField
            control={createToDoForm.control}
            name="body.description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Type in a new ToDo"
                    {...field}
                    onKeyDown={(event) => {
                      handleOnTextareaDescriptionChange(event);
                    }}
                  />
                </FormControl>

                <FormMessage className="mb-2" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  }

  useEffect(() => {
    getTodos({ page: 0, limit: 10 });
  }, []);

  return (
    <div className={clsx("min-h-screen px-1 py-[69px] sm:py-[96px]")}>
      <header className="mb-14 flex flex-col items-center justify-between py-10 sm:flex-row [&>div]:sm:px-4">
        <div className="w-full sm:w-6/12">
          <h1 className="text-2xl sm:text-4xl">Good Day!</h1>
          <p className="mb-0 text-muted-foreground">Today Is {new Date().toDateString()} — What are you up to now?</p>
        </div>
        <div className="w-full sm:w-6/12">
          <div className="flex flex-col py-4 sm:mb-4 sm:flex-row sm:py-0 [&>div:not(:last-child)]:mb-2 [&>div:not(:last-child)]:sm:mb-0 [&>div:not(:last-child)]:sm:mr-2"></div>
          <div></div>
        </div>
      </header>
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Priority</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>{getActionComponent()}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell></TableCell>
                <TableCell>{todo.description}</TableCell>
                <TableCell>
                  {todo.completed ? <Badge variant="outline">Done</Badge> : <Badge variant="outline">Pending</Badge>}
                </TableCell>
                <TableCell>{new Date(todo.dueDate).toDateString()}</TableCell>
                <TableCell>
                  <Badge variant="outline">{todo.priority}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
