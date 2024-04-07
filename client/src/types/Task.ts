import { Audit } from "./Audit";

export type Task = {
  id: string;
  nameTask: string;
  descriptionTask: string;
  priority: string;
  listId: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  audit: Audit[];
};
