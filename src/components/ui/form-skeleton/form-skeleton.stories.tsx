import { Meta, StoryObj } from "@storybook/react";
import { FormSkeleton } from "./form-skeleton";

const meta = {
  title: "FormSkeleton",
  component: FormSkeleton,
  decorators: [
    (Story) => (
      <div className="bg-surface-light dark:bg-surface-dark p-10">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormSkeleton>;

export default meta;

type Story = StoryObj<typeof FormSkeleton>;

export const Default: Story = {};

export const WithThreeInputs: Story = {
  args: {
    numberOfInputs: 3,
  },
};
