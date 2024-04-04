import { ColumnTasks } from "./ColumnTasks";

export const TaskBoard = () => {
  return (
    <div className="flex gap-4 ml-2 mt-2 overflow-x-auto ">
      <ColumnTasks />
      <ColumnTasks />
      <ColumnTasks />
    </div>
  );
};
