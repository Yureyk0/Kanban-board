import { ChangeEvent, useState } from "react";
import { Task } from "../types/Task";
import { DropDown } from "./DropDown";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../app/services/taskBoardApi";
import { FormEditTask } from "./FormEditTask";
import dayjs from "dayjs";
import { Select } from "./Select";
import { TaskDetail } from "./TaskDetail";

interface TaskCardProps {
  task: Task;
  listNames: {
    value: string;
    text: string;
  }[];
  listId: string;
}
export const TaskCard = ({ task, listNames, listId }: TaskCardProps) => {
  const [isOpenDropDown, setisOpenDropDown] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState<boolean>(false);
  const [currentListId] = useState(listId);

  const { id: taskId, dueDate } = task;

  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleOpenDropDown = () => setisOpenDropDown(true);
  const handleCloseDropDown = () => setisOpenDropDown(false);

  const handleOpenModalEdit = () => setIsModalOpenEdit(true);
  const handleCloseModalEdit = () => setIsModalOpenEdit(false);

  const handleOpenModalDetail = () => setIsModalDetailOpen(true);
  const handleCloseModalDetail = () => setIsModalDetailOpen(false);

  const handleClickEdit = () => {
    handleOpenModalEdit();
    handleCloseDropDown();
  };

  const handleDeleteTask = () => {
    deleteTask(taskId);
    handleCloseDropDown();
  };

  const handleMoveTask = (
    event: ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    updateTask({ id: taskId, listId: event.target.value });
  };

  return (
    <div className="p-2 border rounded-md flex flex-col gap-2">
      <div className="flex justify-between items-center ">
        <p
          onClick={handleOpenModalDetail}
          className="cursor-pointer font-bold text-gray-900"
        >
          {task.nameTask}
        </p>
        <div className="relative">
          <button onClick={handleOpenDropDown} className="px-2">
            i
          </button>
          {isOpenDropDown && (
            <DropDown
              handleCloseDropDown={handleCloseDropDown}
              handleDelete={handleDeleteTask}
              handleEdit={handleClickEdit}
            />
          )}
        </div>
      </div>
      <div onClick={handleOpenModalDetail} className="cursor-pointer">
        <p className=" text-sm text-gray-500">{task.descriptionTask}</p>
        <p className="font-bold text-gray-600 text-sm">
          {dayjs(dueDate).format("ddd, DD MMMM")}
        </p>
        <div className="font-medium text-gray-500 text-sm bg-gray-200 rounded-2xl w-max px-2 flex items-center gap-1.5">
          <div className=" w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
          <p>{task.priority}</p>
        </div>
      </div>
      <div>Move to:</div>
      <Select
        setValue={handleMoveTask}
        value={currentListId}
        name={"moveTo"}
        data={listNames}
      />
      <FormEditTask
        isOpen={isModalOpenEdit}
        onClose={handleCloseModalEdit}
        task={task}
      />
      <TaskDetail
        task={task}
        isOpen={isModalDetailOpen}
        onClose={handleCloseModalDetail}
        listNames={listNames}
        listId={listId}
      />
    </div>
  );
};
