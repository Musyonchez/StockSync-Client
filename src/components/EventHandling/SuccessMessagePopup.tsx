// SuccessMessagePopup.tsx
import React from "react";

interface SuccessMessagePopupProps {
  message: string;
  onClose: () => void;
}

const SuccessMessagePopup: React.FC<SuccessMessagePopupProps> = ({
  message,
  onClose,
}) => {
  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-md">
      <p className="mr-2">{message}</p>
      <button onClick={onClose} className="text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default SuccessMessagePopup;
