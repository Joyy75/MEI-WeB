import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthGuard = () => {
  const token = Cookies.get('token');
  const location = useLocation();
  const isLoginPage = location.pathname === '/admin/login';
  const isRegisterPage = location.pathname === '/admin/register';

  if (!token && !isLoginPage && !isRegisterPage) {
    return <Navigate to="/admin/login" replace />;
  }

  if (token && (isLoginPage || isRegisterPage)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
