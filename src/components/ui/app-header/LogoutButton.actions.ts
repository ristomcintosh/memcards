"use server";

import { redirect } from "next/navigation";
import { deleteSession } from "@/service/session";

export const logout = async () => {
  await deleteSession();
  redirect("/login");
};
