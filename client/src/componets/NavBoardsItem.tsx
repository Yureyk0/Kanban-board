import { useState } from "react";
import { Board } from "../types/Board";
import { FormEditBoard } from "./FormEditBoard";
import { useDeleteBoardMutation } from "../app/services/taskBoardApi";

interface NavBoardsItemProps {
  board: Partial<Board>;
  activeBoard: string;
  handleSetActiveBoards: (id: string) => void;
}
export const NavBoardsItem = ({
  board,
  activeBoard,
  handleSetActiveBoards,
}: NavBoardsItemProps) => {
  const { id } = board;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [deleteBoard] = useDeleteBoardMutation();

  const handleDeleteBoard = () => {
    deleteBoard(id!);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <div>
      <div
        className={`flex justify-between font-medium text-lg px-4 py-2 rounded-r-full cursor-pointer ${
          activeBoard === board.id
            ? "text-white bg-slate-600"
            : "text-gray-500 "
        }`}
        key={board.id}
      >
        <div onClick={() => handleSetActiveBoards(board.id!)}>
          {board.nameBoard}
        </div>
        <div>
          <button onClick={handleDeleteBoard} className="px-2 text-red-600">
            D
          </button>
          <button onClick={handleOpenModal} className="px-2">
            I
          </button>
        </div>
      </div>
      <FormEditBoard
        onClose={handleCloseModal}
        isOpen={isModalOpen}
        board={board}
      />
    </div>
  );
};
