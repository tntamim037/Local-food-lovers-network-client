import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh] text-center p-6">
      <img
        src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png"
        alt="404 Not Found"
        className="w-64 mb-6"
      />
      <h1 className="text-4xl font-bold text-amber-600 mb-2">404 - Page Not Found</h1>
      <p className="text-gray-500 mb-6">Oops! The page you’re looking for doesn’t exist 😢</p>
      <Link
        to="/"
        className="btn bg-amber-500 hover:bg-amber-600 text-white rounded-full px-6"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
