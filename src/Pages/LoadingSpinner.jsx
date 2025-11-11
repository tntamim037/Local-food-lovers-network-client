import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="bg-gray-300 h-48 w-full rounded-2xl"></div>

      <div className="h-6 w-3/4 bg-gray-300 rounded-md"></div>

      <div className="h-4 w-full bg-gray-300 rounded-md"></div>
      <div className="h-4 w-5/6 bg-gray-300 rounded-md"></div>
      <div className="h-4 w-2/3 bg-gray-300 rounded-md"></div>
    </div>
  );
};

export default LoadingSpinner;
