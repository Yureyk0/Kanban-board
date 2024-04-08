import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { NavBoards, NavBoardsProps } from "../componets/NavBoards";

const meta: Meta = {
  title: "Components/NavBoards",
  component: NavBoards,
  tags: ["autodocs"],
};

const Template: StoryFn<NavBoardsProps> = (args) => {
  const [activeBoard, setActiveBoard] = useState(args.activeBoard);

  const handleSetActiveBoard = (id: string) => {
    setActiveBoard(id);
    console.log(`Setting active board: ${id}`);
  };

  return (
    <NavBoards
      {...args}
      activeBoard={activeBoard}
      handleSetActiveBoards={handleSetActiveBoard}
    />
  );
};

export default meta;

export const Default = Template.bind({});
Default.args = {
  boards: [
    { id: "1", nameBoard: "Board 1" },
    { id: "2", nameBoard: "Board 2" },
    { id: "3", nameBoard: "Board 3" },
  ],
  handleSetActiveBoards: (id: string) =>
    console.log(`Setting active board: ${id}`),
  activeBoard: "1",
};
