"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { createDemoAccount } from "./utils/createDemoAccount";

export function GuestSignIn() {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="relative mt-8 flex flex-col items-center rounded-md border-2 border-zinc-200 p-3 text-center dark:border-zinc-500">
      <span className="absolute -left-2 -top-2 flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive-400 opacity-75 dark:bg-destructive-300"></span>
        <span className="relative inline-flex h-full w-full rounded-full bg-destructive-500 dark:bg-destructive-400"></span>
      </span>
      <p>Just browsing? Continue as a guest.</p>
      <div>
        <Button
          variant="link"
          onClick={() => startTransition(() => createDemoAccount())}
          disabled={isPending}
          isLoading={isPending}
        >
          Explore Without Signing In!
        </Button>
      </div>
      <p className="mt-2 text-xs">
        Note: Guest accounts are temporary and will be deleted after 24 hours.
      </p>
    </div>
  );
}
