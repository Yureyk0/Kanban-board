import { useGetAllBoardsQuery } from "../app/services/taskBoardApi";
import { NavBoards } from "./NavBoards";

interface SideBarBoardsProps {
  handleSetActiveBoards: (id: string) => void;
  activeBoard: string;
}

export const SideBarBoards = ({
  handleSetActiveBoards,
  activeBoard,
}: SideBarBoardsProps) => {
  const { data: boards } = useGetAllBoardsQuery();

  return (
    <div className="w-1/4 h-screen bg-gray-100 border-solid border border-gray-200">
      <p className="text-2xl font-bold p-4">Kanban</p>
      {boards && (
        <NavBoards
          boards={boards}
          handleSetActiveBoards={handleSetActiveBoards}
          activeBoard={activeBoard}
        />
      )}
    </div>
  );
};
