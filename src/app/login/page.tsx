"use client"
import { login, LoginActionState } from "@/actions/auth"
import { loginSchema } from "@/actions/auth.schma"
import { SubmitButton } from "@/components/SubmitButton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CircleAlert } from "lucide-react"
import Link from "next/link"
import { FormEvent, useEffect, useRef, useState } from "react"
import { useFormState } from "react-dom"

export default function LoginPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, action] = useFormState<LoginActionState, FormData>(login, {
    message: "",
  })

  const [fieldErrors, setFieldErrors] = useState({
    username: Boolean(state.formErrors?.username),
    password: Boolean(state.formErrors?.password),
    message: state.message,
  })

  useEffect(() => {
    setFieldErrors({
      username: Boolean(state.formErrors?.username),
      password: Boolean(state.formErrors?.password),
      message: state.message,
    })
  }, [state])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const username = formData.get("username")
    const password = formData.get("password")
    const result = loginSchema.safeParse({
      username,
      password,
    })

    if (!result.success) {
      const formErrors = result.error.flatten()
      setFieldErrors({
        username: Boolean(formErrors.fieldErrors.username),
        password: Boolean(formErrors.fieldErrors.password),
        message: `Missing the following fields: ${Object.keys(
          formErrors.fieldErrors
        ).join(", ")}`,
      })
      return
    }
    formRef.current?.submit()
  }

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
        <div className="mb-4 bg-zinc-500 p-2 rounded flex gap-x-2 items-center">
          <CircleAlert />
          <p aria-live="assertive" className="sr-only">
            {fieldErrors?.message}
          </p>
          <p aria-hidden="true">{state.message ?? fieldErrors?.message}</p>
        </div>
        <form ref={formRef} action={action} onSubmit={handleSubmit}>
          <div className="field-wrapper">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              name="username"
              aria-required="true"
              aria-describedby="username-form-error"
            />
            {fieldErrors.username && (
              <p id="username-form-error" className="">
                Username is required
              </p>
            )}
          </div>
          <div className="field-wrapper">
            <Label>Password</Label>
            <Input
              type="password"
              minLength={8}
              name="password"
              aria-required="true"
              aria-describedby="password-form-error"
            />
            {fieldErrors.password && (
              <p id="password-form-error">Password is required</p>
            )}
          </div>
          <SubmitButton className="mt-7" size="lg" />
        </form>
      </div>
    </main>
  )
}
