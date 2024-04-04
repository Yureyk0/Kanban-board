import { TaskCard } from "./TaskCard";

export const ColumnTasks = () => {
  return (
    <div className="flex flex-col flex-shrink-0 w-64 gap-3 ">
      <div className="flex  justify-between items-center border-y-2 border-gray-300">
        <p className="py-1 font-medium">To do</p>
        <div className="flex gap-3">
          <span>45</span>
          <button className="px-1">I</button>
        </div>
      </div>
      <button className="w-full py-1 border-2 border-dotted rounded-lg font-medium">
        + Add new card
      </button>
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </div>
  );
};
