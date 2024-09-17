import Link from "next/link";
import { LoginForm } from "@/components/interfaces/auth";
import { GuestSignIn } from "@/components/interfaces/auth/GuestSignIn";

export default function LoginPage() {
  return (
    <>
      <header className="mb-8">
        <h1 className="mb-4">Log in</h1>
        <p className="flex flex-wrap gap-x-1">
          <span>Need a Memcards account?</span>
          <Link href="/signup">Create an account</Link>
        </p>
      </header>
      <LoginForm />
      <GuestSignIn />
    </>
  );
}
