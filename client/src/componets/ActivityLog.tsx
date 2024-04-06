import { Audit } from "../types/Audit";
import {
  ChangeMessage,
  generateChangeMessages,
} from "../utils/generateChangeMessages";

interface ActivityLog {
  audit: Audit[];
  listNames: {
    value: string;
    text: string;
  }[];
}

const renderActionText = (action: ChangeMessage) => {
  const { action: actionType, oldValue, newValue, nameTask } = action;

  switch (actionType) {
    case "insert":
      return (
        <span>
          Added <b>{nameTask}</b>
        </span>
      );
    case "update":
      return (
        <span>
          Changed <b>{nameTask}</b> from <b>{oldValue as string}</b> to
          <b>{newValue as string}</b>
        </span>
      );
    case "delete":
      return (
        <span>
          Deleted <b>{nameTask}</b>
        </span>
      );
    default:
      return (
        <span>
          Unknown action for <b>{nameTask}</b>
        </span>
      );
  }
};
export const ActivityLog = ({ audit, listNames }: ActivityLog) => {
  const formatActivity = generateChangeMessages({
    audits: audit,
    listNames,
  });
  return (
    <div className="flex flex-col gap-3">
      {formatActivity.map((action, index) => (
        <div key={index} className="text-gray-500 flex justify-between text-sm">
          {renderActionText(action)}
          <p className=" whitespace-nowrap pl-2">{action.createdAt}</p>
        </div>
      ))}
    </div>
  );
};
