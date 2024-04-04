import { History } from "./History";

export type Task = {
  id: string;
  nameTask: string;
  descriptionTask: string;
  priority: string;
  listId: string;
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  history?: History[];
};
