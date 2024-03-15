// ErrorMessagePopup.tsx
import React from "react";

interface ErrorMessagePopupProps {
  message: string;
  onClose: () => void;
}

const ErrorMessagePopup: React.FC<ErrorMessagePopupProps> = ({
  message,
  onClose,
}) => {
  return (
    <div className="fixed bottom-4 right-4 ml-4 bg-red-500 text-white p-4 rounded-md shadow-md flex items-center">
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

export default ErrorMessagePopup;
