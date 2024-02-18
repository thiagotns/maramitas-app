import useAppAuth from "../../hooks/useAppAuth";
import { useLocation } from "react-router-dom";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {

    const [appAuth] = useAppAuth();
    const location = useLocation();

    if(!appAuth?.token){
        console.log("PrivateRoute: redirect to login");
        return <Navigate to="/login" state={{ from: location }} replace  />;
    }

    return <Outlet />;
}

export default PrivateRoute;