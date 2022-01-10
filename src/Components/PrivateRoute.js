import { Navigate, Outlet } from 'react-router-dom';
import {getCookie} from '../Services/cookie';

export default function PrivateRoute() {
    const isLogin = getCookie("jwt");
    if (!isLogin) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
}