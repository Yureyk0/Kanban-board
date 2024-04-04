import { Header } from "./Header";
import { TaskBoard } from "./TaskBoard";

export const TaskBoardWrapper = () => {
  return (
    <div className="w-3/4 h-screen">
      <Header />
      <TaskBoard />
    </div>
  );
};
