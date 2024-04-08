import { useState } from "react";
import { Modal } from "./Modal";
import { useUpdateListMutation } from "../app/services/taskBoardApi";
import { List } from "../types/List";
import Button from "./Button";

interface FormEditListProps {
  isOpen: boolean;
  onClose: () => void;
  list: Partial<List>;
}

export const FormEditList = ({ isOpen, onClose, list }: FormEditListProps) => {
  const [listName, setListName] = useState(list.nameList);
  const [error, setError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [updateList] = useUpdateListMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setListName(value);
    setIsButtonDisabled(value.trim() === "");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!listName!.trim()) {
      setError("Board Name cannot be empty");
      return;
    }

    updateList({ id: list.id, nameList: listName });
    setListName(listName);
    setError("");
    setIsButtonDisabled(true);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <div className="text-center p-4">
        <h2 className="text-xl mb-4">Edit List</h2>
        <form onSubmit={handleSubmit} className="mx-auto max-w-md">
          <div className="flex items-center mb-4">
            <label htmlFor="listName" className="mr-2">
              List Name:
            </label>
            <input
              id="listName"
              type="text"
              value={listName}
              onChange={handleChange}
              className="flex-grow px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <Button disabled={isButtonDisabled} type="submit" onClick={() => {}}>
            <span>Save</span>
          </Button>
        </form>
      </div>
    </Modal>
  );
};
