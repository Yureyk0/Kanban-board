export const Header = () => {
  return (
    <header className="bg-gray-100 flex justify-between  items-center  px-4 ">
      <p className="text-2xl font-bold py-4">Task board</p>

      <div className="flex gap-3">
        <button className="py-1 px-2 border border-solid rounded font-medium">
          History
        </button>
        <button className="py-1 px-2 border border-solid rounded bg-gray-600 text-white">
          + Create new list
        </button>
      </div>
    </header>
  );
};
