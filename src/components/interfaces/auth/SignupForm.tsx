"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LiveMessage } from "./LiveMessage";
import { CreateUserSchema } from "./utils/auth.schema";
import { CreateAccountResult, createAccount } from "./utils/signup";

export function SignupForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateUserSchema>({
    resolver: zodResolver(CreateUserSchema),
    reValidateMode: "onBlur",
    shouldFocusError: false,
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const [formMessage, setFormMessage] = useState<string>();

  const handleSubmit = async (event: CreateUserSchema) => {
    startTransition(() => {
      createAccount(event).then((result) => {
        if (result?.errors) {
          Object.entries(result.errors).forEach(([field, errors]) => {
            form.setError(field as keyof CreateAccountResult["errors"], {
              type: "custom",
              message: errors.join(" "),
            });
          });
        }

        if (result?.message) setFormMessage(result.message);
      });
    });
  };

  const handleInvalid: SubmitErrorHandler<CreateUserSchema> = (fieldErrors) => {
    const invalidFieldsCount = Object.keys(fieldErrors).length;
    setFormMessage(
      `Failed to save because of ${invalidFieldsCount} invalid field(s).`,
    );
  };
  return (
    <section>
      <LiveMessage message={formMessage} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit, handleInvalid)}>
          <FormField
            control={form.control}
            name="email"
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            rules={{ required: "Username is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-1">Password</FormLabel>
                <FormDescription className="mb-2" aria-hidden>
                  Must be at least 8 characters long, contain at least one
                  letter and one number
                </FormDescription>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="mt-7"
            size="lg"
            type="submit"
            disabled={isPending}
            isLoading={isPending}
          >
            Sign up
          </Button>
        </form>
      </Form>
    </section>
  );
}
