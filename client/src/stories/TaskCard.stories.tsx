import { Meta } from "@storybook/react";
import { StoryFn } from "@storybook/react";
import { TaskCard, TaskCardProps } from "../componets/TaskCard";

const meta: Meta = {
  title: "Components/TaskCard",
  component: TaskCard,
  tags: ["autodocs"],
};

export default meta;

const Template: StoryFn<TaskCardProps> = (args) => <TaskCard {...args} />;

export const Default = Template.bind({});
Default.args = {
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
  listNames: [
    { value: "1", text: "List 1" },
    { value: "2", text: "List 2" },
    { value: "3", text: "List 3" },
  ],
  listId: "1",
};

export const AnotherVariant = Template.bind({});
AnotherVariant.args = {
  task: {
    id: "2",
    nameTask: "Task 2",
    descriptionTask: "This is Task 2 description",
    priority: "Medium",
    listId: "2",
    dueDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    audit: [],
  },
  listNames: [
    { value: "1", text: "List 1" },
    { value: "2", text: "List 2" },
    { value: "3", text: "List 3" },
  ],
  listId: "2",
};
