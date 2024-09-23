"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateDeckForm } from "./CreateDeckForm";

export const CreationMenu = () => {
  const [isCreateDeckFormOpen, showCreateDeckFrom] = useState(false);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          className="w-12 h-12 transition-transform ease-in data-[state=open]:rotate-[225deg] text-zinc-900 rounded-full shadow-lg bg-brand-500"
          aria-label="Create"
        >
          <Plus className="w-full h-full" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="top" alignOffset={10}>
          <DropdownMenuItem onSelect={() => showCreateDeckFrom(true)}>
            Create Deck
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className="text-inherit hover:no-underline"
              href="/create-flashcard"
            >
              Create Flashcards
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isCreateDeckFormOpen && (
        <CreateDeckForm handleClose={() => showCreateDeckFrom(false)} />
      )}
    </>
  );
};
