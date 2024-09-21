"use client";

import { Button } from "@/components/ui/button";
import { logout } from "./LogoutButton.actions";

export function LogoutButton() {
  return (
    <Button size={"sm"} variant="secondary" onClick={() => logout()}>
      Logout
    </Button>
  );
}
