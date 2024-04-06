import { List } from "../types/List";
import { ColumnTasks } from "./ColumnTasks";

interface TaskBoardProps {
  lists: List[];
}

export const TaskBoard = ({ lists }: TaskBoardProps) => {
  if (!lists.length)
    return (
      <div className="flex justify-center items-center text-4xl w-full">
        <p>Create list!</p>
      </div>
    );

  const listNames = lists.map((list) => {
    return {
      value: list.id,
      text: list.nameList,
    };
  });

  return (
    <div className="flex gap-4 ml-2 mt-2 overflow-x-auto ">
      {lists.map((list) => (
        <ColumnTasks key={list.id} list={list} listNames={listNames} />
      ))}
    </div>
  );
};
