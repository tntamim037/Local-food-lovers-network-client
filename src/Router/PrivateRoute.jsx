import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Providers/AuthProvider";
import { RotatingLines } from "react-loader-spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RotatingLines
          strokeColor="orange"
          strokeWidth="4"
          animationDuration="0.75"
          width="60"
          visible={true}
        />
      </div>
    )
  }

  if (user) {
    return children
  }

  
  return <Navigate to="/login" state={{ from: location }} replace />
}

export default PrivateRoute;
