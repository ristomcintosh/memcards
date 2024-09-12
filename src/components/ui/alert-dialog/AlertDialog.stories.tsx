import { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { AlertDialog } from "./AlertDialog"

const meta: Meta = {
  title: "AlertDialog",
  component: AlertDialog,
}

export default meta

type Story = StoryObj<typeof AlertDialog>

export const Default: Story = {
  args: {
    title: "Are you absolutely sure?",
    onConfirm: fn(),
  },
}
