import { Meta, StoryFn } from "@storybook/react";
import Button, { ButtonProps } from "../componets/Button";
import EditIcon from "../assets/editIcon.svg?react";

const meta: Meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClick: () => alert("Button clicked!"),
  children: <span>History</span>,
};

export const Disabled = Template.bind({});
Disabled.args = {
  onClick: () => alert("Button clicked!"),
  type: "submit",
  disabled: true,
  children: <span>Save</span>,
};

export const Outline = Template.bind({});
Outline.args = {
  onClick: () => alert("Button clicked!"),
  type: "outline",
  children: (
    <div className="flex gap-2 items-center">
      <EditIcon />
      Edit Task
    </div>
  ),
};
export const Submit = Template.bind({});
Submit.args = {
  onClick: () => alert("Button clicked!"),
  type: "submit",
  children: <div className="flex gap-2 items-center">Save</div>,
};
