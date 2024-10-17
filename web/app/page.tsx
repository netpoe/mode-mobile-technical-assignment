"use client";

import { useTodosContext } from "@/context/todos/useTodosContext";
import { CreateToDoValidationType } from "dummy-todo-api/v1/todo/validation";
import clsx from "clsx";
import { KeyboardEvent, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useEvmSignatureVerificationContext } from "@/context/evm/evm-signature-verification/useEvmSignatureVerificationContext";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Card, CardContent } from "@/components/ui/card";
import { UpdateTodoForm } from "@/components/todos/update-todo-form/UpdateTodoForm";
import { useErc20Context } from "@/context/evm/erc20/useErc20Context";
import { CustomLabel } from "@/components/custom-label/CustomLabel";
import { useErc721Context } from "@/context/evm/erc721/useErc721Context";
import { ERC721MintButton } from "@/components/evm/ERC721/mint/Mint";

export default function Home() {
  const { handleOnSignMessage, handleOnDisplayWidgetClick, ownershipVerification } =
    useEvmSignatureVerificationContext();

  const { createTodo, getTodos, todos, createToDoForm } = useTodosContext();

  const { contract: ERC20Contract } = useErc20Context();

  const { contract: ERC71Contract } = useErc721Context();

  const { isConnected } = useAccount();

  function onSubmitCreateToDo(data: CreateToDoValidationType) {
    createTodo(data.body);
  }

  function handleOnCreateTodoDescriptionChange(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      onSubmitCreateToDo(createToDoForm.getValues());
    }
  }

  const isMintingEnabled =
    isConnected && ownershipVerification.isSignatureVerified && todos.filter((todo) => todo.completed).length >= 2;

  useEffect(() => {
    getTodos({ page: 0, limit: 10 });
  }, []);

  return (
    <div className={clsx("min-h-screen px-1 py-[69px] sm:py-[96px]")}>
      <header className="mb-14 flex flex-col items-center justify-between py-10 sm:flex-row [&>div]:sm:px-4">
        <div className="w-full sm:w-6/12">
          <h1 className="text-2xl sm:text-4xl">Good Day!</h1>
          <p className="text-muted-foreground">Today Is {new Date().toDateString()} — What are you up to now?</p>
          <div className="flex flex-col sm:flex-row [&>button]:mr-4">
            <>
              <ERC721MintButton />

              {!isConnected && (
                <Button onClick={handleOnDisplayWidgetClick} size="lg">
                  Connect Your Wallet To Create ToDos
                </Button>
              )}

              {isConnected && !ownershipVerification.isSignatureVerified && (
                <Button onClick={handleOnSignMessage} size="lg">
                  {ownershipVerification.isVerifyingSignature && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                  Authenticate To See Your ToDos
                </Button>
              )}
            </>
          </div>
        </div>
        <div className="w-full sm:w-6/12">
          <div className="flex flex-col justify-end py-4 sm:mb-4 sm:flex-row sm:py-0 [&>div:not(:last-child)]:mb-2 [&>div:not(:last-child)]:sm:mb-0 [&>div:not(:last-child)]:sm:mr-2">
            {isConnected && (
              <>
                <CustomLabel className="text-right">
                  <CustomLabel.Head className="justify-between">
                    {/* <Button
                      className="mr-4"
                      size="sm"
                      variant="ghost"
                      onClick={onClickBurnNFT}
                      disabled={!isMintingEnabled}
                    >
                      Burn
                    </Button> */}
                    <h5 className="mb-0">{ERC71Contract?.name} Balance</h5>
                  </CustomLabel.Head>
                  <CustomLabel.Description className="justify-end">
                    <h4 className="mb-0">
                      {ERC71Contract?.symbol} {ERC71Contract?.balanceOf}
                    </h4>
                  </CustomLabel.Description>
                </CustomLabel>
                <CustomLabel className="text-right">
                  <CustomLabel.Head className="justify-end">
                    <h5 className="mb-0">ERC20 Balance</h5>
                  </CustomLabel.Head>
                  <CustomLabel.Description className="justify-end">
                    <h4 className="mb-0">
                      {ERC20Contract?.symbol} {ERC20Contract?.balanceOf}
                    </h4>
                  </CustomLabel.Description>
                </CustomLabel>
              </>
            )}
          </div>
          <div></div>
        </div>
      </header>

      {isConnected && ownershipVerification.isSignatureVerified && (
        <main className="">
          <section className="flex flex-col sm:flex-row">
            <div className="w-4/12 px-3">
              <Card className="mb-12">
                <CardContent>
                  <Form {...createToDoForm}>
                    <form
                      onSubmit={createToDoForm.handleSubmit(onSubmitCreateToDo)}
                      className="mb-4 w-full space-y-6 sm:mb-0"
                    >
                      <FormField
                        control={createToDoForm.control}
                        name="body.description"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Type in a new ToDo. Press enter to save."
                                {...field}
                                onKeyDown={(event) => {
                                  handleOnCreateTodoDescriptionChange(event);
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
              </Card>
            </div>
          </section>

          <section className="flex flex-col sm:flex-row">
            <div className="w-4/12 px-3">
              {todos.map((todo) => (
                <UpdateTodoForm todo={todo} key={todo.id} />
              ))}
            </div>
          </section>
        </main>
      )}
    </div>
  );
}
