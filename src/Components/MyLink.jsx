import React from "react";
import { NavLink } from "react-router";

const MyLink = ({ to, children, className = "" }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        ${className} 
        ${
          isActive
            ? "text-amber-600 font-semibold border-b-2 border-amber-600"
            : "text-gray-700 hover:text-amber-500"
        }
        `
      }
    >
      {children}
    </NavLink>
  );
};

export default MyLink;
