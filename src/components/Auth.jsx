import { useLocation, Navigate, Outlet } from "react-router-dom";

import React from "react";

const Auth = ({ allowedRoles }) => {
  const location = useLocation();
  const loginRole = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  return allowedRoles.find((role) => loginRole.includes(role)) ? (
    <Outlet />
  ) : token ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

export default Auth;
