import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "src/store/hooks";
import { authState } from "src/store/slices/auth/authSlice";

type user = {
  id: number;
  email: string;
  role: string;
};
export type verifyTokenType = {
  isAuthenticated: boolean;
  userInfo: user;
};

const ProtectedRoute = ({ roles }: any) => {
  const location = useLocation();
  const { isAuthenticated, userInfo } = useAppSelector(
    (state: { auth: authState }) => state.auth
  );

  return isAuthenticated && roles.includes(userInfo?.role) ? (
    <Outlet />
  ) : userInfo?.role ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/auth/sign-in" state={{ from: location }} replace />
  );
};

export const PublicRoute = () => {
  const location = useLocation();
  const { isAuthenticated } = useAppSelector(
    (state: { auth: authState }) => state.auth
  );

  return !isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
