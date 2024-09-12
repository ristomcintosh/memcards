"use client"
import { logout } from "@/actions/auth"
import { Button } from "@/components/ui"

export function Logout() {
  return (
    <Button size={"sm"} variant="secondary" onClick={() => logout()}>
      Logout
    </Button>
  )
}
