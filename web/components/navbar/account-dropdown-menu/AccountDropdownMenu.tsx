import { AccountDropdownMenuProps } from "./AccountDropdownMenu.types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CircleUser } from "lucide-react";
import { useAuthorizationContext } from "@/context/authorization/useAuthorizationContext";
import { ReloadIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import Link from "next/link";
import { useRoutes } from "@/hooks/useRoutes/useRoutes";

export const AccountDropdownMenu: React.FC<AccountDropdownMenuProps> = () => {
  const {
    signUpForm,
    signUp,
    signIn,
    signInForm,
    signOut,
    currentUser,
    actions,
    isSignUpDialogOpen,
    setSignUpDialogOpen,
    isSignInDialogOpen,
    setSignInDialogOpen,
    resendSignUpEmail,
  } = useAuthorizationContext();

  const routes = useRoutes();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <CircleUser className={clsx("sm:mr-2", { "stroke-green-500": !!currentUser })} />{" "}
            <span className="hidden sm:block">Account</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                if (currentUser) return;

                setSignUpDialogOpen(true);
              }}
              disabled={!!currentUser}
            >
              Sign Up
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                if (currentUser) return;

                setSignInDialogOpen(true);
              }}
              disabled={!!currentUser}
            >
              Sign In
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href={routes.profile.credits()} className="no-underline">
                Credits
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={routes.profile.collections()} className="no-underline">
                My Collections
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={!currentUser}
            onClick={() => {
              signOut();
            }}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isSignInDialogOpen} onOpenChange={setSignInDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>Welcome back! Get the credits flowing (on your favor)!</DialogDescription>
          </DialogHeader>

          <div className="mb-4 flex w-full items-center space-x-2">
            <Form {...signInForm}>
              <form onSubmit={signInForm.handleSubmit(signIn)} className="w-full space-y-6">
                <FormField
                  control={signInForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signInForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={actions.signIn.isLoading}>
                  {actions.signIn.isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}Sign In
                </Button>
              </form>
            </Form>
          </div>

          <DialogFooter className="block text-center sm:justify-center">
            <p className="mb-2 text-xs text-background">Don't have an account?</p>
            <Button
              variant="ghost"
              onClick={() => {
                setSignInDialogOpen(false);
                setSignUpDialogOpen(true);
              }}
            >
              Sign Up
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isSignUpDialogOpen} onOpenChange={setSignUpDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign Up</DialogTitle>
            <DialogDescription>Create an account to play and get 3 free credits</DialogDescription>
          </DialogHeader>

          <div className="mb-4 flex w-full items-center space-x-2">
            <Form {...signUpForm}>
              <form onSubmit={signUpForm.handleSubmit(signUp)} className="w-full space-y-6">
                <FormField
                  control={signUpForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signUpForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <p className="mb-0 text-xs text-muted-foreground">
                  By signing up you accept our <Link href={routes.legal.termsAndConditions()}>Terms & Conditions</Link>.
                </p>
                <Button type="submit" disabled={actions.signUp.isLoading}>
                  {actions.signUp.isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}Sign Up
                </Button>

                {actions.resendSignUpEmail.isEmailConfirmationSent && (
                  <div className="mt-4">
                    <p className="mb-0 text-xs text-muted-foreground">
                      Didn't get the email?{" "}
                      <span onClick={() => resendSignUpEmail()} className="underline hover:cursor-pointer">
                        Resend Confirmation Email
                      </span>
                    </p>
                  </div>
                )}
              </form>
            </Form>
          </div>

          <DialogFooter className="block text-center sm:justify-center">
            <p className="mb-2 text-xs text-background">Already have an account?</p>
            <Button
              variant="ghost"
              onClick={() => {
                setSignInDialogOpen(true);
                setSignUpDialogOpen(false);
              }}
            >
              Sign In
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
