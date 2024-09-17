import Link from "next/link";
import { AppHeader } from "@/components/ui/app-header";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="h-full flex flex-col">
      <AppHeader />
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-4xl mb-4 text-center">Page Not Found 😅</h1>
        <Button asChild size="lg">
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  );
}
