interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const handleCloseModal = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="p-4 max-w-4xl w-full relative mx-auto my-6 z-50">
            {/* Content */}
            <div className="relative bg-white  rounded-lg shadow-lg">
              {/* Header */}
              <div className="flex items-center justify-end bg-gray-500 p-2 border-b border-gray-200 rounded-t-lg">
                <button
                  className="text-gray-100 hover:text-gray-200 focus:outline-none"
                  onClick={handleCloseModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {/* Body */}
              <div>{children}</div>
            </div>
          </div>
          <div className="fixed inset-0 bg-black opacity-25  z-40 " />
        </div>
      )}
    </>
  );
};
