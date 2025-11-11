import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-[90vh] px-4 py-12 bg-linear-to-b from-orange-50 to-white">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="w-full md:w-1/2 flex justify-center order-2 md:order-1">
          <img
            // src="https://i.ibb.co/QvXk3qC/404-error-page.png"
            src={``}
            alt="404 Error "
            className="w-80 md:w-[420px] lg:w-[480px] drop-shadow-lg"
          />
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left order-1 md:order-2 space-y-5">
          <h1 className="text-8xl md:text-9xl font-extrabold text-orange-600">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Page Not Found 
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            The page you’re looking for might have been removed, had its name
            changed, or is temporarily unavailable. Click below to go back home.
          </p>

          <Link
            to="/"
            className="inline-block px-8 py-3 mt-4 text-white font-medium bg-orange-500 rounded-lg shadow-lg hover:bg-orange-600 transition duration-300 transform hover:scale-105"
          >
          Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
