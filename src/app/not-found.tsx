import { NavBar } from "@/components/NavBar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="h-full flex flex-col">
      <NavBar />
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-4xl mb-4">Page Not Found 😅</h1>
        <Button asChild size="lg">
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  )
}
