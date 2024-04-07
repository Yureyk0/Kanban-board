import { useEffect } from "react";
import { Board } from "../types/Board";
import { NavBoardsItem } from "./NavBoardsItem";
import { useAddBoardMutation } from "../app/services/taskBoardApi";

interface NavBoardsProps {
  boards: Partial<Board>[];
  handleSetActiveBoards: (id: string) => void;
  activeBoard: string;
}
export const NavBoards = ({
  boards,
  handleSetActiveBoards,
  activeBoard,
}: NavBoardsProps) => {
  const [createBoard] = useAddBoardMutation();

  const handleCreteBoard = () =>
    createBoard({ nameBoard: `Bord ${boards.length}` });

  useEffect(() => {
    if (!activeBoard) {
      handleSetActiveBoards(boards[0].id!);
    }
  }, [activeBoard, boards, handleSetActiveBoards]);

  return (
    <div className="flex flex-col">
      <p className="uppercase font-medium text-gray-500 text-sm p-4">
        All boards {boards.length}
      </p>
      {boards.map((board) => (
        <NavBoardsItem
          board={board}
          activeBoard={activeBoard}
          handleSetActiveBoards={handleSetActiveBoards}
          key={board.id}
        />
      ))}

      <div
        className="font-medium text-gray-900 text-lg px-4 py-2 cursor-pointer"
        onClick={handleCreteBoard}
      >
        + Create new board
      </div>
    </div>
  );
};
