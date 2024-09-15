"use client"
import { SignupForm } from "@/components/interfaces/auth"
import Link from "next/link"

export default function Signup() {
  return (
    <>
      <header className="mb-8">
        <h1 className="mb-4">Sign up</h1>
        <p className="flex flex-wrap gap-x-1">
          <span>Have a Memcards account?</span>
          <Link href="/login">Log in</Link>
        </p>
      </header>
      <SignupForm />
    </>
  )
}
