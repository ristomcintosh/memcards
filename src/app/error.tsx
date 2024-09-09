"use client"
import { NavBar } from "@/components/NavBar"
import { Button } from "@/components/ui"
import { useTransition } from "react"

export default function Error({ reset }: { reset: () => void }) {
  const [isPending, startTransition] = useTransition()

  return (
    <div className="h-full flex flex-col">
      <NavBar />
      <div className="flex flex-col items-center justify-center flex-1 p-8">
        <h1 className="text-4xl mb-4 text-center">
          Oops, something went wrong 😬
        </h1>
        <Button
          size="lg"
          onClick={() =>
            startTransition(() => {
              reset()
            })
          }
        >
          Try again
        </Button>
        {isPending && <p>Loading...</p>}
      </div>
    </div>
  )
}
