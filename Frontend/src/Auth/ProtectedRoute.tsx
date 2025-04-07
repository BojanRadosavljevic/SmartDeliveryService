import { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element; allowedRoles?: string[] }) => {
  const role = useSelector((state: any) => state.auth.role);
  const token = useSelector((state: any) => state.auth.token);
  const location = useLocation();
  if(allowedRoles){
    if (!token || !role || !allowedRoles.includes(role)) {
      return <Navigate to="/login" />;
    }
  }

  const authRoutes = ['/login', '/register','/'];

  if(token && authRoutes.includes(location.pathname)){
    const korisnik = localStorage.getItem("korisnik");
    const dostavljac = localStorage.getItem("dostavljac");
    if(korisnik){
        return <Navigate to="/korisnik" replace/>;
    }
    if(dostavljac){
        return <Navigate to="/dostavljac" replace/>;
    }
    return <Navigate to="/404" replace />;
}
  return children;
};

export default ProtectedRoute;