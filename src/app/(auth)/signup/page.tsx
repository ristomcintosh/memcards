import Link from "next/link";
import { createDemoAccount } from "@/actions/auth";
import { SignupForm } from "@/components/interfaces/auth";
import { GuestSignIn } from "@/components/interfaces/auth/GuestSignIn";

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
      <GuestSignIn handleGuestSignIn={createDemoAccount} />
    </>
  );
}
