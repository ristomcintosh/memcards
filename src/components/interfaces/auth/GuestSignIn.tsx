"use client"
import { Button } from "@/components/ui/button"
import { LoaderCircle } from "lucide-react"
import { useTransition } from "react"

export function GuestSignIn({
  handleGuestSignIn,
}: {
  handleGuestSignIn: () => void
}) {
  const [isPending, startTransition] = useTransition()

  return (
    <div className="text-center mt-8 p-3 border-2 border-zinc-200 dark:border-zinc-500 rounded-md relative flex flex-col items-center">
      <span className="absolute flex h-4 w-4 -top-2 -left-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive-400 dark:bg-destructive-300 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-full w-full bg-destructive-500 dark:bg-destructive-400"></span>
      </span>
      <p>Just browsing? Continue as a guest.</p>
      <div>
        <Button
          variant="link"
          onClick={() => startTransition(() => handleGuestSignIn())}
        >
          {isPending && <LoaderCircle className="animate-spin" />}
          Explore Without Signing In!
        </Button>
      </div>
      <p className="text-xs mt-2">
        Note: Guest accounts are temporary and will be deleted after 24 hours.
      </p>
    </div>
  )
}
