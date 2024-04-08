import dayjs from "dayjs";
import { Task } from "../types/Task";
import { Audit } from "../types/Audit";

export interface ChangeMessage {
  action: "insert" | "update" | "delete";
  oldValue: unknown;
  newValue: unknown;
  createdAt: string;
  nameTask: string;
}

export function generateChangeMessages({
  audits,
  listNames,
}: {
  audits: Audit[];
  listNames: {
    value: string;
    text: string;
  }[];
}): ChangeMessage[] {
  const allMessages: ChangeMessage[] = [];

  audits.forEach((audit) => {
    const { action, entityId, createdAt, oldState, newState } = audit;

    if (action === "update") {
      if (oldState && newState) {
        Object.keys(oldState).forEach((key) => {
          if (
            key in oldState &&
            key in newState &&
            oldState[key as keyof Task] !== newState[key as keyof Task]
          ) {
            const oldValue = oldState[key as keyof Task];
            const newValue = newState[key as keyof Task];

            if (key === "dueDate") {
              allMessages.push({
                action,
                oldValue: dayjs(oldValue as Date).format("ddd, DD MMMM"),
                newValue: dayjs(newValue as Date).format("ddd, DD MMMM"),
                createdAt: dayjs(createdAt).format("ddd, DD MMMM"),
                nameTask: newState.nameTask,
              });
              return;
            }

            if (key === "listId") {
              allMessages.push({
                action,
                oldValue: listNames.find((list) => list.value === oldValue)
                  ?.text,
                newValue: listNames.find((list) => list.value === newValue)
                  ?.text,
                createdAt: dayjs(createdAt).format("ddd, DD MMMM"),
                nameTask: newState.nameTask,
              });
              return;
            }

            allMessages.push({
              action,
              oldValue,
              newValue,
              createdAt: dayjs(createdAt).format("ddd, DD MMMM"),
              nameTask: newState.nameTask,
            });
          }
        });
      }
    } else if (action === "delete") {
      allMessages.push({
        action,
        oldValue: entityId,
        newValue: null,
        createdAt: dayjs(createdAt).format("ddd, DD MMMM"),
        nameTask: newState.nameTask,
      });
    } else if (action === "insert") {
      if (newState) {
        allMessages.push({
          action,
          oldValue: null,
          newValue: newState.nameTask,
          createdAt: dayjs(createdAt).format("ddd, DD MMMM"),
          nameTask: newState.nameTask,
        });
      }
    }
  });

  return allMessages;
}
