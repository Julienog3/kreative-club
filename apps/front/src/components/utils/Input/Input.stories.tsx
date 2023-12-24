import type { Meta, StoryObj } from "@storybook/react";
import Input, { InputProps } from "./Input";
import { FieldValues, useForm } from "react-hook-form";

const meta: Meta<typeof Input> = {
  component: Input,
};

const Template = ({ type, label, required }: InputProps) => {
  const { register, control } = useForm<FieldValues>();

  return (
    <Input
      type={type}
      label={label}
      required={required}
      register={register}
      control={control}
    />
  );
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    type: "text",
    label: "Input",
    required: false,
  },
  render: (args) => <Template {...args} />,
};
