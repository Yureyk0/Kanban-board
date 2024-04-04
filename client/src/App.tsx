import { SideBarBoards } from "./componets/SideBarBoards";
import { TaskBoardWrapper } from "./componets/TaskBoardWrapper";

export const App = () => {
  return (
    <div className="flex">
      <SideBarBoards />
      <TaskBoardWrapper />
    </div>
  );
};
