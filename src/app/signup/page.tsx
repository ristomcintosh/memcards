"use client"
import { createAccount } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState, useFormStatus } from "react-dom"

export default function CreateUser() {
  const [state, action] = useFormState(createAccount, { message: "" })

  return (
    <main className="flex items-center justify-center h-full">
      <form
        action={action}
        className="w-full max-w-xs p-8 bg-zinc-50 dark:bg-zinc-600 shadow-lg rounded-xl"
      >
        <Label htmlFor="username">Username</Label>
        <Input id="username" type="text" name="username" required />
        <Label>Password</Label>
        <Input type="password" minLength={8} name="password" required />
        <p aria-live="polite" role="status">
          {state?.message}
        </p>
        <SubmitButton />
      </form>
    </main>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" aria-disabled={pending}>
      Submit
    </Button>
  )
}
