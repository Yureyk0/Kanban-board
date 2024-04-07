import { Task } from "./Task";

export type List = {
  id: string;
  nameList: string;
  boardId: string;
  tasks: Task[];
};
