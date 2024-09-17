"use client";

import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Delete, Rename } from "@/components/ui/menu-items";

type MenuProps = {
  handleRename: () => void;
  handleDelete: () => void;
};

export const DeckMenu = ({ handleRename, handleDelete }: MenuProps) => (
  <DropdownMenu modal={false}>
    <DropdownMenuTrigger
      aria-label="Deck Options"
      className="w-8 min-w-8 min-h-8 h-8 p-1 hover:bg-zinc-300 hover:rounded-full"
    >
      <EllipsisVertical />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem onSelect={() => handleRename()}>
        <Rename />
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={() => handleDelete()}>
        <Delete />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
