import { Task } from "./Task";

export interface Audit {
  id: number;
  entityId: null | string;
  oldState: null | Task;
  newState: Task;
  action: "insert" | "update" | "delete";
  createdAt: string;
}
