"use client"
import { logout } from "@/actions/auth"
import { Button } from "@/components/ui/button"

export function Logout() {
  return (
    <Button size={"sm"} variant="ghost" onClick={() => logout()}>
      Logout
    </Button>
  )
}
