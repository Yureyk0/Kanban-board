import { useState } from "react";
import { useAddListMutation } from "../app/services/taskBoardApi";
import { SideBarHistory } from "./SideBarHistory";

interface HeaderProps {
  nameBoard: string;
  activeBoard: string;
  listsLength: number;
  listNames: {
    value: string;
    text: string;
  }[];
}
export const Header = ({
  nameBoard,
  activeBoard,
  listsLength,
  listNames,
}: HeaderProps) => {
  const [addList] = useAddListMutation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAddList = () =>
    addList({ nameList: `New list ${listsLength}`, boardId: activeBoard });

  return (
    <header className="bg-gray-100 flex justify-between  items-center  px-4 ">
      <p className="text-2xl font-bold py-4">{nameBoard}</p>

      <div className="flex gap-3">
        <button
          onClick={toggleSidebar}
          className="py-1 px-2 border border-solid rounded font-medium"
        >
          History
        </button>
        <button
          className="py-1 px-2 border border-solid rounded bg-gray-600 text-white"
          onClick={handleAddList}
        >
          + Create new list
        </button>
        <SideBarHistory
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
          listNames={listNames}
        />
      </div>
    </header>
  );
};
