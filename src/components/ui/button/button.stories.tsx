import { Meta, StoryObj } from "@storybook/react";
import { Edit } from "lucide-react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  args: {
    children: "Button",
    size: "default",
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "destructiveSecondary",
        "outline",
        "ghost",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    asChild: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-surface-light dark:bg-surface-dark p-10">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
};

export const DestructiveSecondary: Story = {
  args: {
    variant: "destructiveSecondary",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
  },
};

export const IconButton: Story = {
  args: {
    children: <Edit />,
    size: "icon",
    "aria-label": "Edit",
  },
};

export const Loading: Story = {
  args: {
    children: "Loading",
    isLoading: true,
  },
};
