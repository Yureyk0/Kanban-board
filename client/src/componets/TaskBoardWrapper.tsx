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

  return (
    <div className="w-3/4 h-screen">
      <Header
        nameBoard={nameBoard}
        activeBoard={activeBoard}
        listsLength={lists.length}
      />
      <TaskBoard lists={lists} />
    </div>
  );
};
