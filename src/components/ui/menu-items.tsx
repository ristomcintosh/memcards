"use client"
import { Trash2, PencilLine } from "lucide-react"

export const Rename = () => (
  <MenuItem Icon={<PencilLine className="w-5 h-5 mr-2" />} label="Rename" />
)

export const Edit = () => (
  <MenuItem Icon={<PencilLine className="w-5 h-5 mr-2" />} label="Edit" />
)

export const Delete = () => (
  <MenuItem Icon={<Trash2 className="w-5 h-5 mr-2" />} label="Delete" />
)

type MenuItemProps = {
  Icon: React.ReactElement
  label: string
}

const MenuItem = ({ Icon, label }: MenuItemProps) => (
  <>
    {Icon}
    <p>{label}</p>
  </>
)
