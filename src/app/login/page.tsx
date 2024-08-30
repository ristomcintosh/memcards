"use client"
import { login } from "@/actions/auth"
import { SubmitButton } from "@/components/SubmitButton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useFormState } from "react-dom"

export default function LoginPage() {
  const [state, action] = useFormState(login, {
    message: "",
  })

  return (
    <main className="flex items-center justify-center h-full border-l-8 border-brand-500 border-t-8">
      <div className="w-full max-w-lg p-14 bg-zinc-50 dark:bg-zinc-600 shadow-lg rounded-xl">
        <div className="mb-8">
          <h1 className="text-4xl mb-4">Log in</h1>
          <p className="flex flex-wrap gap-x-1">
            <span>Need a Memcards account?</span>
            <Link href="/signup">Create an account</Link>
          </p>
        </div>
        <div className="mb-4 bg-zinc-500 p-2 rounded">
          <p aria-live="assertive" className="sr-only">
            {state?.message}
          </p>
          <p aria-hidden="true">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>
        </div>
        <form action={action}>
          <div className="field-wrapper">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              name="username"
              aria-required="true"
            />
            <p id="username-form-error" className="">
              Username is required
            </p>
          </div>
          <div className="field-wrapper">
            <Label>Password</Label>
            <Input
              type="password"
              minLength={8}
              name="password"
              aria-required="true"
            />
            <p id="password-form-error">Password is required</p>
          </div>
          <SubmitButton className="mt-7" size="lg" />
        </form>
      </div>
    </main>
  )
}
