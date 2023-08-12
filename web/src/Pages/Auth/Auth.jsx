import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const Auth = () => {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  if (auth) return <Outlet />;
  return <Navigate to="/signin" state={{ from: location }} />;
};
