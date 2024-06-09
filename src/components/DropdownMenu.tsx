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
        className="w-full text-center data-[active]:bg-brand-800 data-[active]:bg-opacity-60 text-base whitespace-nowrap p-2 border-b-2 last:border-0 border-brand-700 border-opacity-60"
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
        className="w-full text-center block data-[active]:bg-brand-800 data-[active]:bg-opacity-60 text-base whitespace-nowrap p-2 border-b-2 last:border-0 border-brand-700 border-opacity-60"
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
  const baseStyles =
    "border rounded shadow border-brand-700 bg-brand-500 focus:outline-none text-gray-100"
  return (
    <MenuItems
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ bounce: 0, duration: 0.15 }}
      className={`${baseStyles} ${className}`}
      {...delegated}
    >
      {children}
    </MenuItems>
  )
}
