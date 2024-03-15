// LoadingMessagePopup.tsx
import React from "react";

const LoadingMessagePopup = () => {
  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-900 text-white p-2 rounded-md shadow-md">
      <div className="loader"></div>
    </div>
  );
};

export default LoadingMessagePopup;
