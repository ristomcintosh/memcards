"use client"
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem as HUIMenuItem,
  MenuItemsProps,
} from "@headlessui/react"
import { motion, HTMLMotionProps } from "framer-motion"
import { HTMLAttributes, PropsWithChildren } from "react"
import { VerticalDots } from "./VerticalDots"
import Link, { LinkProps } from "next/link"
import { cn } from "@/utils/misc"

export type DropdownMenuItems = {
  name: string
  action: () => Promise<void> | void
}[]

type DropdownMenuProps = {
  items: DropdownMenuItems
  name: string
}

export const DropdownMenu = ({ items, name: menuName }: DropdownMenuProps) => (
  <Menu>
    <MenuButton aria-label={menuName} className="w-5">
      <VerticalDots />
    </MenuButton>
    <MenuItemsAnimated anchor="right">
      {items.map(({ name, action }) => (
        <MenuItem text={name} key={name} onClick={() => action()} />
      ))}
    </MenuItemsAnimated>
  </Menu>
)

type MenuItemProps = {
  text: string
} & HTMLAttributes<HTMLButtonElement>
export const MenuItem = ({ text, ...delegated }: MenuItemProps) => {
  return (
    <HUIMenuItem>
      <button
        className="w-full text-center data-[active]:bg-brand-500/20 text-base whitespace-nowrap p-2 border-b last:border-0 border-gray-900/50"
        {...delegated}
      >
        {text}
      </button>
    </HUIMenuItem>
  )
}

type MenuItemAsLinkProps = LinkProps
export const MenuItemAsLink = ({
  ...delegated
}: PropsWithChildren<MenuItemAsLinkProps>) => {
  return (
    <HUIMenuItem>
      <Link
        className="w-full text-center block data-[active]:bg-brand-500/20 text-base whitespace-nowrap p-2 border-b last:border-0 border-gray-900/50"
        {...delegated}
      />
    </HUIMenuItem>
  )
}

type Props = HTMLMotionProps<"div"> & MenuItemsProps

export const MenuItemsAnimated = ({
  children,
  className,
  ...delegated
}: PropsWithChildren<Props>) => {
  return (
    <MenuItems
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ bounce: 0, duration: 0.15 }}
      className={cn(
        "border rounded shadow focus:outline-none text-brand-900 border-gray-900/50 bg-gray-50",
        className
      )}
      {...delegated}
    >
      {children}
    </MenuItems>
  )
}
