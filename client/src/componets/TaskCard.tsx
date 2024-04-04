export const TaskCard = () => {
  return (
    <div className="p-2 border rounded-md flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="font-bold text-gray-900">Task name</p>
        <button className="px-2">i</button>
      </div>
      <p className=" text-sm text-gray-500">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </p>
      <p className="font-bold text-gray-600 text-sm">Wed, 19 Apr</p>
      <div className="font-medium text-gray-500 text-sm bg-gray-200 rounded-2xl w-max px-2 flex items-center gap-1.5">
        <div className=" w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
        <p>Medium</p>
      </div>
      <div>Move to:</div>
    </div>
  );
};
