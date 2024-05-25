"use client"
import { MenuItems } from "@headlessui/react"
import { motion, HTMLMotionProps } from "framer-motion"
import { PropsWithChildren } from "react"

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
