import { useRef } from "react";
import { useOutsideClickHandler } from "../hooks/useOutsideClickHandler";
import DotsIcon from "../assets/dotsIcon.svg?react";
import PenIcon from "../assets/penIcon.svg?react";
import DeleteIcon from "../assets/trashIcon.svg?react";
import PlusIcon from "../assets/plusIcon.svg?react";

export interface DropDownProps {
  handleCloseDropDown: () => void;
  handleDelete: () => void;
  handleEdit: () => void;
  handleAddTask?: () => void;
  handleOpenDropDown: () => void;
  isOpen: boolean;
}

export const DropDown = ({
  handleCloseDropDown,
  handleDelete,
  handleEdit,
  handleAddTask,
  handleOpenDropDown,
  isOpen,
}: DropDownProps) => {
  const dropDownRef = useRef<HTMLDivElement>(null);

  useOutsideClickHandler(dropDownRef, handleCloseDropDown);
  return (
    <div className=" relative">
      <button className="px-1" onClick={handleOpenDropDown}>
        <DotsIcon />
      </button>
      {isOpen && (
        <div
          className="absolute right-0 top-6 w-32 bg-white rounded-md shadow-lg z-10"
          ref={dropDownRef}
        >
          <ul className="py-1 flex flex-col font-medium">
            <li>
              <button
                onClick={handleEdit}
                className="flex gap-2  px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
              >
                <PenIcon />
                Edit
              </button>
            </li>
            {handleAddTask && (
              <li>
                <button
                  onClick={handleAddTask}
                  className="flex gap-2  px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                >
                  <PlusIcon /> Add tsak
                </button>
              </li>
            )}
            <li>
              <button
                onClick={handleDelete}
                className="flex gap-2 px-2 py-2 text-sm text-red-500 hover:bg-gray-100 w-full"
              >
                <DeleteIcon /> Delete
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
