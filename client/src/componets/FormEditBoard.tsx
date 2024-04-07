import { useState } from "react";
import { Modal } from "./Modal";
import { Board } from "../types/Board";
import { useUpdateBoardMutation } from "../app/services/taskBoardApi";

interface FormEditBoardProps {
  isOpen: boolean;
  onClose: () => void;
  board: Partial<Board>;
}

export const FormEditBoard = ({
  isOpen,
  onClose,
  board,
}: FormEditBoardProps) => {
  const [boardName, setBoardName] = useState(board.nameBoard);
  const [error, setError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [updateBoard] = useUpdateBoardMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setBoardName(value);
    setIsButtonDisabled(value.trim() === "");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!boardName!.trim()) {
      setError("Board Name cannot be empty");
      return;
    }
    updateBoard({ id: board.id, nameBoard: boardName });
    setBoardName("");
    setError("");
    setIsButtonDisabled(true);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <div className="text-center p-4">
        <h2 className="text-xl mb-4">Edit Board</h2>
        <form onSubmit={handleSubmit} className="mx-auto max-w-md">
          <div className="flex items-center mb-4">
            <label htmlFor="boardName" className="mr-2">
              Board Name:
            </label>
            <input
              id="boardName"
              type="text"
              value={boardName}
              onChange={handleChange}
              className="flex-grow px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            type="submit"
            className={`px-4 py-2 rounded focus:outline-none ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            disabled={isButtonDisabled}
          >
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
};
