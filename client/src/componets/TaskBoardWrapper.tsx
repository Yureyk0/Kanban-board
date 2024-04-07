import { useGetOneBoardQuery } from "../app/services/taskBoardApi";
import { Header } from "./Header";
import { TaskBoard } from "./TaskBoard";

interface TaskBoardWrapperProps {
  activeBoard: string;
}

export const TaskBoardWrapper = ({ activeBoard }: TaskBoardWrapperProps) => {
  const { data: board, isLoading } = useGetOneBoardQuery(activeBoard);

  if (isLoading || !board)
    return (
      <div className="flex justify-center items-center text-4xl w-full">
        <p>Select or create a board!</p>
      </div>
    );

  const { nameBoard, lists } = board;

  const listNames = lists.map((list) => {
    return {
      value: list.id,
      text: list.nameList,
    };
  });

  return (
    <div className="w-3/4 h-screen">
      <Header
        nameBoard={nameBoard}
        activeBoard={activeBoard}
        listsLength={lists.length}
        listNames={listNames}
      />
      <TaskBoard lists={lists} listNames={listNames} />
    </div>
  );
};
