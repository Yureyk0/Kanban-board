import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Task } from "../types/Task";
import { Modal } from "./Modal";

import "react-datepicker/dist/react-datepicker.css";
import { useUpdateTaskMutation } from "../app/services/taskBoardApi";
import { Select } from "./Select";

interface FormEditTaskProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

interface updeteTask {
  id: string;
  nameTask: string;
  descriptionTask: string;
  priority: string;
  dueDate: Date;
}
const dataPrioritySelect = [
  { value: "Low", text: "Low" },
  { value: "Medium", text: "Medium" },
  { value: "High", text: "High" },
];

export const FormEditTask = ({ isOpen, onClose, task }: FormEditTaskProps) => {
  const { nameTask, descriptionTask, priority, dueDate, id } = task;
  const [updateTask, setUpdateTask] = useState<updeteTask>({
    id: id,
    nameTask: nameTask,
    descriptionTask: descriptionTask,
    priority: priority,
    dueDate: dueDate,
  });

  const [updateTaskQuery] = useUpdateTaskMutation();

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setUpdateTask({ ...updateTask, [name]: value });
  };

  const handleDateChange = (date: Date) => {
    setUpdateTask({ ...updateTask, dueDate: date });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (updateTask.nameTask.trim() === "") {
      return;
    }
    updateTaskQuery(updateTask);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Create New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1" htmlFor="name">
              Task Name:
            </label>
            <input
              type="text"
              id="nameTask"
              name="nameTask"
              value={updateTask.nameTask}
              onChange={(event) => handleInputChange(event)}
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="description">
              Description:
            </label>
            <textarea
              id="descriptionTask"
              name="descriptionTask"
              value={updateTask.descriptionTask}
              onChange={(event) => handleInputChange(event)}
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
              rows={3}
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="priority">
              Priority:
            </label>
            <Select
              name={"priority"}
              value={updateTask.priority}
              setValue={handleInputChange}
              data={dataPrioritySelect}
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="dueDate">
              Due Date:
            </label>
            <ReactDatePicker
              id="dueDate"
              selected={updateTask.dueDate}
              onChange={handleDateChange}
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 "
              disabled={updateTask.nameTask.trim() === ""}
            >
              Edit Task
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
