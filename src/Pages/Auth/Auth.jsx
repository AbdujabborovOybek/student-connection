import { useLocation, Navigate, Outlet } from "react-router-dom";

export const Auth = () => {
  const auth = true;
  const location = useLocation();
  if (auth) return <Outlet />;
  return <Navigate to="/signin" state={{ from: location }} />;
};
