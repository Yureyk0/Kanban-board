import { Modal } from "./Modal";
import { Task } from "../types/Task";
import dayjs from "dayjs";
import { ActivityLog } from "./ActivityLog";

interface TaskDetailkProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  listNames: {
    value: string;
    text: string;
  }[];
  listId: string;
}

export const TaskDetail = ({
  task,
  isOpen,
  onClose,
  listNames,
  listId,
}: TaskDetailkProps) => {
  const { nameTask, descriptionTask, dueDate, priority, audit } = task;

  const listName = listNames.find((list) => list.value === listId)?.text;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex max-h-[500px] min-h-[400px]">
        <div className="flex flex-col gap-4 p-5 w-7/12">
          <div className="flex justify-between">
            <p className="text-2xl font-bold">{nameTask}</p>
            <button className="py-1 px-2 border border-solid rounded font-medium">
              Edit Task
            </button>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-4">
              <span className="text-gray-500 mr-8">i Status</span>
              <span className="text-gray-500 mr-8">i Due date</span>
              <span className="text-gray-500 mr-8">i Due date</span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-medium">{listName}</span>
              <span className="font-medium">
                {dayjs(dueDate).format("ddd, DD MMMM")}
              </span>
              <span className="font-medium">{priority}</span>
            </div>
          </div>
          <p className="text-xl font-bold"> Description</p>
          <p className="text-gray-500">{descriptionTask}</p>
        </div>
        <div className="p-4 w-5/12 overflow-auto bg-gray-200">
          <p className="text-xl font-bold mb-4">Activity</p>
          <ActivityLog audit={audit} listNames={listNames} />
        </div>
      </div>
    </Modal>
  );
};
