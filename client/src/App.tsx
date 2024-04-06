import { useState } from "react";
import { SideBarBoards } from "./componets/SideBarBoards";
import { TaskBoardWrapper } from "./componets/TaskBoardWrapper";

export const App = () => {
  const [activeBoard, setActiveBoards] = useState("");

  const handleSetActiveBoards = (id: string) => setActiveBoards(id);
  return (
    <div className="flex">
      <SideBarBoards
        handleSetActiveBoards={handleSetActiveBoards}
        activeBoard={activeBoard}
      />
      {activeBoard && <TaskBoardWrapper activeBoard={activeBoard} />}
    </div>
  );
};
