"use client";

import { useState, useTransition } from "react";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LiveMessage } from "./LiveMessage";
import { LoginSchema } from "./utils/auth.schema";
import { login } from "./utils/login";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginSchema>({
    reValidateMode: "onBlur",
    shouldFocusError: false,
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [formMessage, setFormMessage] = useState<string>();

  const handleSubmit = async (event: LoginSchema) => {
    startTransition(() => {
      login(event).then((result) => {
        if (result?.message) {
          setFormMessage(result?.message);
          form.setError("password", { message: result?.message });
        }
      });
    });
  };

  const handleInvalid: SubmitErrorHandler<LoginSchema> = (fieldErrors) => {
    const invalidFields = Object.keys(fieldErrors).join(", ");
    setFormMessage(`Missing the following field(s): ${invalidFields}`);
  };

  return (
    <section>
      <LiveMessage message={formMessage} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit, handleInvalid)}>
          <FormField
            control={form.control}
            name="username"
            rules={{ required: "Username is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username or email</FormLabel>
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
                <FormLabel>Password</FormLabel>
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
            Log in
          </Button>
        </form>
      </Form>
    </section>
  );
}
