"use client"
import { login } from "@/actions/auth"
import { LoginSchema } from "@/actions/auth.schema"
import { LogoTextIcon } from "@/components/Logo"
import { Button } from "@/components/ui"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CircleAlert } from "lucide-react"
import Link from "next/link"
import { useState, useTransition } from "react"
import { SubmitErrorHandler, useForm } from "react-hook-form"

export default function LoginPage() {
  const [isPending, startTransition] = useTransition()
  const form = useForm<LoginSchema>({
    reValidateMode: "onBlur",
    shouldFocusError: false,
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const [formMessage, setFormMessage] = useState("")

  const handleSubmit = async (event: LoginSchema) => {
    startTransition(() => {
      login(event).then((result) => {
        if (result?.message) {
          setFormMessage(result?.message)
          form.setError("password", { message: result?.message })
        }
      })
    })
  }

  const handleInvalid: SubmitErrorHandler<LoginSchema> = (fieldErrors) => {
    const invalidFields = Object.keys(fieldErrors).join(", ")
    setFormMessage(`Missing the following field(s): ${invalidFields}`)
  }

  return (
    <main className="flex flex-col border-l-8 border-brand-500 dark:bg-zinc-600 sm:dark:bg-inherit border-t-8 py-4 min-h-full">
      <div className="w-40 sm:w-60 ml-8" aria-hidden="true">
        <LogoTextIcon />
      </div>
      <div className="flex sm:items-center justify-center flex-1">
        <div className="w-full sm:max-w-lg p-8 sm:p-14 sm:bg-zinc-50 dark:bg-zinc-600 sm:shadow-lg sm:rounded-xl">
          <div className="mb-8">
            <h1 className="mb-4">Log in</h1>
            <p className="flex flex-wrap gap-x-1">
              <span>Need a Memcards account?</span>
              <Link href="/signup">Create an account</Link>
            </p>
          </div>
          <p aria-live="assertive" className="sr-only">
            {formMessage}
          </p>
          {formMessage && (
            <div
              className="mb-4 dark:bg-zinc-500 bg-amber-200 p-2 rounded flex gap-x-2 items-center"
              data-testid="login-message"
            >
              <CircleAlert />
              <p aria-hidden="true">{formMessage}</p>
            </div>
          )}
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
              >
                {isPending ? "Logging in..." : "Log in"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  )
}
