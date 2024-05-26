"use client"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { motion, HTMLMotionProps } from "framer-motion"
import { PropsWithChildren } from "react"
import { VerticalDots } from "./VerticalDots"

type DropdownMenuProps = {
  items: string[]
}

export const DropdownMenu = ({ items }: DropdownMenuProps) => (
  <Menu>
    <MenuButton aria-label="Deck menu" className="w-5">
      <VerticalDots />
    </MenuButton>
    <MenuItemsAnimate>
      {items.map((option) => (
        <MenuItem key={option}>
          <button className="w-full text-center data-[active]:bg-brand-800 data-[active]:bg-opacity-60 text-base whitespace-nowrap p-2 border-b-2 last:border-0 border-brand-700 border-opacity-60">
            {option}
          </button>
        </MenuItem>
      ))}
    </MenuItemsAnimate>
  </Menu>
)

type Props = HTMLMotionProps<"div">

export const MenuItemsAnimate = ({
  children,
  className,
  ...delegated
}: PropsWithChildren<Props>) => {
  const baseStyles =
    "border rounded shadow border-brand-700 bg-brand-500 focus:outline-none text-gray-100"
  return (
    <MenuItems
      as={motion.div}
      anchor="right"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ bounce: 0, duration: 0.15 }}
      className={`${baseStyles} ${className} overflow-clip`}
      {...delegated}
    >
      {children}
    </MenuItems>
  )
}
