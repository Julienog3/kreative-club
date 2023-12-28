import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const primary: Story = {
  args: {
    disabled: false,
    children: "Click me !",
  },
  render: (args) => {
    const { children } = args;
    return <Button {...args}>{children}</Button>;
  },
};
