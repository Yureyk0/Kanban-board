import { useRef } from "react";
import { useOutsideClickHandler } from "../hooks/useOutsideClickHandler";

interface DropDownProps {
  handleCloseDropDown: () => void;
  handleDelete: () => void;
  handleEdit: () => void;
  handleAddTask?: () => void;
}

export const DropDown = ({
  handleCloseDropDown,
  handleDelete,
  handleEdit,
  handleAddTask,
}: DropDownProps) => {
  const dropDownRef = useRef<HTMLDivElement>(null);

  useOutsideClickHandler(dropDownRef, handleCloseDropDown);
  return (
    <div
      className="absolute right-0 top-6 w-32 bg-white rounded-md shadow-lg z-10"
      ref={dropDownRef}
    >
      <ul className="py-1 font-medium">
        <li>
          <button
            onClick={handleEdit}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
          >
            Edit
          </button>
        </li>
        {handleAddTask && (
          <li>
            <button
              onClick={handleAddTask}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            >
              Add tsak
            </button>
          </li>
        )}
        <li>
          <button
            onClick={handleDelete}
            className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 w-full"
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
};
