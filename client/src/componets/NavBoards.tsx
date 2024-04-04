export const NavBoards = () => {
  return (
    <div className="flex flex-col">
      <p className="uppercase font-medium text-gray-500 text-sm p-4">
        All boards N
      </p>
      <div className="font-medium text-white text-lg px-4 py-2 bg-slate-600 rounded-r-full cursor-pointer">
        Board 1
      </div>
      <div className="font-medium text-gray-500 text-lg px-4 py-2 cursor-pointer">
        Board 2
      </div>
      <div className="font-medium text-gray-500 text-lg px-4 py-2 cursor-pointer">
        Board 3
      </div>
      <div className="font-medium text-gray-900 text-lg px-4 py-2 cursor-pointer">
        + Create new board
      </div>
    </div>
  );
};
