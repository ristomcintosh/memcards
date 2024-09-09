import { Meta, StoryObj } from "@storybook/react"

import { Button, ButtonProps } from "./button"

const meta = {
  title: "Button",
  component: Button,
  args: {
    children: "Button",
  },
} satisfies Meta<ButtonProps>

export default meta
type Story = StoryObj<ButtonProps>

export const Default: Story = {}
