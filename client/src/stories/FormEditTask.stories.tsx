import { Meta, StoryFn } from "@storybook/react";
import { FormEditTask, FormEditTaskProps } from "../componets/FormEditTask";

const meta: Meta = {
  title: "Components/FormEditTask",
  component: FormEditTask,
};

export default meta;

const Template: StoryFn<FormEditTaskProps> = (args) => (
  <FormEditTask {...args} />
);

export const Default = Template.bind({});

Default.args = {
  isOpen: true,
  onClose: () => {},
  task: {
    id: "1",
    nameTask: "Task 1",
    descriptionTask: "This is Task 1 description",
    priority: "High",
    listId: "1",
    dueDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    audit: [],
  },
};
