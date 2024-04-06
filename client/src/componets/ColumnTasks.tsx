import { useState } from "react";
import { DropDown } from "./DropDown";
import { TaskCard } from "./TaskCard";
import { List } from "../types/List";
import {
  useAddTaskMutation,
  useDeleteListMutation,
} from "../app/services/taskBoardApi";
import { FormEditList } from "./FormEditList";
import { Task } from "../types/Task";

interface ColumnTasksProps {
  list: List;
  listNames: {
    value: string;
    text: string;
  }[];
}

const initTask: Partial<Task> = {
  nameTask: "New task",
  descriptionTask: "Description task",
  priority: "Low",
};

export const ColumnTasks = ({ list, listNames }: ColumnTasksProps) => {
  const [isOpenDropDown, setisOpenDropDown] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);

  const [deleteList] = useDeleteListMutation();
  const [addTask] = useAddTaskMutation();

  const { tasks, id: listId, nameList } = list;

  const handleOpenDropDown = () => setisOpenDropDown(true);
  const handleCloseDropDown = () => setisOpenDropDown(false);

  const handleOpenModalEdit = () => setIsModalEditOpen(true);
  const handleCloseModalEdit = () => setIsModalEditOpen(false);

  const handleAddTask = () => {
    addTask({ ...initTask, listId });
    handleCloseDropDown();
  };

  const handleDeleteList = () => {
    deleteList(listId);
    handleCloseDropDown();
  };

  const handleEditList = () => {
    handleOpenModalEdit();
    handleCloseDropDown();
  };

  return (
    <div className="flex flex-col flex-shrink-0 w-64 gap-3 ">
      <div className="flex  justify-between items-center border-y-2 border-gray-300">
        <p className="py-1 font-medium">{nameList}</p>
        <div className="flex gap-3 relative">
          <span>{tasks.length}</span>
          <button className="px-1" onClick={handleOpenDropDown}>
            I
          </button>
          {isOpenDropDown && (
            <DropDown
              handleCloseDropDown={handleCloseDropDown}
              handleDelete={handleDeleteList}
              handleEdit={handleEditList}
              handleAddTask={handleAddTask}
            />
          )}
        </div>
      </div>
      <button
        onClick={handleAddTask}
        className="w-full py-1 border-2 border-dotted rounded-lg font-medium"
      >
        + Add new card
      </button>
      {tasks.length ? (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            listNames={listNames}
            listId={listId}
          />
        ))
      ) : (
        <div>Task list empty</div>
      )}
      <FormEditList
        isOpen={isModalEditOpen}
        onClose={handleCloseModalEdit}
        list={list}
      />
    </div>
  );
};
