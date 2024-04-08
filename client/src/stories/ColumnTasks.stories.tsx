import { Meta, StoryFn } from "@storybook/react";
import { ColumnTasks, ColumnTasksProps } from "../componets/ColumnTasks";

const meta: Meta = {
  title: "Components/ColumnTasks",
  component: ColumnTasks,
  tags: ["autodocs"],
};

export default meta;

const Template: StoryFn<ColumnTasksProps> = (args) => <ColumnTasks {...args} />;

export const Default = Template.bind({});

Default.args = {
  list: {
    id: "1",
    nameList: "Task List 1",
    boardId: "board-1",
    tasks: [
      {
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
      {
        id: "2",
        nameTask: "Task 2",
        descriptionTask: "This is Task 2 description",
        priority: "Medium",
        listId: "1",
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        audit: [],
      },
    ],
  },
  listNames: [
    { value: "1", text: "List 1" },
    { value: "2", text: "List 2" },
  ],
};
