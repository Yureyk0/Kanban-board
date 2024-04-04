import { NavBoards } from "./NavBoards";

export const SideBarBoards = () => {
  return (
    <div className="w-1/4 h-screen bg-gray-100 border-solid border border-gray-200">
      <p className="text-2xl font-bold p-4">Kanban</p>
      <NavBoards />
    </div>
  );
};
