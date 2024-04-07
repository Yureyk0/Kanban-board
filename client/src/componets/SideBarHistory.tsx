import { useGetAllAuditQuery } from "../app/services/taskBoardApi";
import CloseIcon from "../assets/closeIcon.svg?react";
import { ActivityLog } from "./ActivityLog";

interface SidebarHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  listNames: {
    value: string;
    text: string;
  }[];
}

export const SideBarHistory = ({
  isOpen,
  onClose,
  listNames,
}: SidebarHistoryProps) => {
  const { data: audits, isLoading } = useGetAllAuditQuery();

  if (!audits || isLoading) return <div>Loading...</div>;
  const reversedAudits = [...audits].reverse();
  return (
    <div
      className={`fixed inset-0 overflow-hidden z-50 bg-gray-800 bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-xl overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">History</h2>
          <button
            className="text-gray-600 focus:outline-none"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="p-4">
          <ActivityLog audit={reversedAudits} listNames={listNames} />
        </div>
      </div>
    </div>
  );
};
