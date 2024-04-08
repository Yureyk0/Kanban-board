import { Meta, StoryFn } from "@storybook/react";
import { DropDown, DropDownProps } from "../componets/DropDown";

const meta: Meta = {
  title: "Components/DropDown",
  component: DropDown,
  tags: ["autodocs"],
};

export default meta;

const Template: StoryFn<DropDownProps> = (args) => {
  return <DropDown {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  handleCloseDropDown: () => console.log("Closing dropdown"),
  handleDelete: () => console.log("Deleting item"),
  handleEdit: () => console.log("Editing item"),
  isOpen: true,
};

export const WithAddTask = Template.bind({});
WithAddTask.args = {
  handleCloseDropDown: () => console.log("Closing dropdown"),
  handleDelete: () => console.log("Deleting item"),
  handleEdit: () => console.log("Editing item"),
  handleAddTask: () => console.log("Adding task"),
  isOpen: true,
};
